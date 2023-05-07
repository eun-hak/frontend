import JwtInterceptors from './ApiController';
import { NoticeItem, NoticeDetail } from '../types/notice';
import { AxiosError } from 'axios';

const Notices = () => {
  const instance = JwtInterceptors().instance;
  //공지사항 조회 api
  const list = async (pageParam = 1) => {
    try {
      const res = await instance.get<NoticeItem[]>(`/notice/all?page=${pageParam}`);
      return {
        data: res,
        nextPage: pageParam + 1,
        isLast: res.data.length < 10,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(axiosError.message);
    }
  };

  //공지사항 자세히보기 api
  const detail = async (notice: string) => {
    try {
      const res = await instance.get<NoticeDetail>(`/notice/?noticeId=${notice}`);
      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(axiosError.message);
    }
  };
  return { list, detail };
};

export default Notices;
