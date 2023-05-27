import styled from '@emotion/styled';
import { Notice } from 'api';
import { Spinner } from 'components';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const NoticeBox = () => {
  const notice = Notice();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') as string;
  const { data, isLoading } = useQuery(['notice_detail', id], () => notice.detail(id), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
  if (isLoading) return <Spinner id="notice" />;
  const contents = data?.data.content.split('\n');

  return (
    <Content>
      <Title>{data?.data.title}</Title>
      {contents?.map((content) => (
        <div key={content}>
          {content}
          <br />
        </div>
      ))}
    </Content>
  );
};

const NoticeDetail = () => {
  const navigate = useNavigate();
  const toNotice = () => navigate('/notice');

  return (
    <AppContainer>
      <AppTitle>공지사항</AppTitle>
      <NoticeBox />
      <BackWrapper onClick={toNotice}>
        <Back>
          <Img alt="list_icon" width="22" src="/images/icon_list_line_24.svg" />
          목록
        </Back>
      </BackWrapper>
    </AppContainer>
  );
};

export default NoticeDetail;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;

  @media screen and (max-width: 550px) {
    width: 90%;
  }
`;

const AppTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;

  font-weight: 600;
  padding-top: 5rem;
  padding-bottom: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  font-weight: 400;
  width: 100%;
  border: 1.5px solid #f1f1f1;
  border-radius: 15px;
  padding: 1.5rem 1.5rem;
  margin-top: 2vh;
`;

const Img = styled.img`
  margin-right: 6px;
`;

const Title = styled.div`
  display: flex;
  font-size: 1.7rem;
  padding-bottom: 0.7rem;
`;

const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const Back = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;
