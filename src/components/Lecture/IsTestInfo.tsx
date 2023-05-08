import styled from '@emotion/styled';
import { Button, Spinner, SearchTestInfoList } from 'components';
import { fakeEvaluationList } from 'constants/placeholderData';
import { isLoginStorage } from 'utils/loginStorage';
import useLectureQuery from 'hooks/useLectureQuery';
import { User } from 'api';

interface IsTestInfoProps {
  selectId: string;
  setWritten: (value: boolean) => void;
}

const IsTestInfo = ({ selectId, setWritten }: IsTestInfoProps) => {
  const { TestInfo } = useLectureQuery();
  const isLogin = isLoginStorage();
  const { data, isLoading, isFetchingNextPage, ref } = TestInfo(selectId, setWritten);

  if (!isLogin) {
    return <SearchTestInfoList page={fakeEvaluationList} isLogin={false} />;
  }

  if (isLoading || !data || !data.pages[0]) return <Spinner />;

  const listLength = data.pages[0].data.data.length;
  const isExamDataExists = data?.pages[0].data.isExamDataExists;

  if (listLength === 0) {
    return isExamDataExists ? <NotUsePoint selectId={selectId} /> : <NoTestInfo />;
  }

  return (
    <>
      {data.pages.map((page) => {
        if (page) {
          return <SearchTestInfoList isLogin={isLogin} key={page.nextPage} page={page.data.data} />;
        }
      })}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage && <Spinner id="nextPage" />}
      </div>
    </>
  );
};

export default IsTestInfo;

const NotUsePoint = ({ selectId }: { selectId: string }) => {
  const { buyTestInfo } = User();
  const unlock = () => window.confirm('시험정보를 열람하시겠습니까?') && buyTestInfo(selectId);

  return (
    <Wrapper>
      <Content>
        시험 정보 열람시
        <br />
        <Color> 20 포인트</Color>가 차감됩니다.
      </Content>
      <BtWidth>
        <Button color="#336af8" onClick={unlock}>
          포인트 사용하기 (-20P)
        </Button>
      </BtWidth>
    </Wrapper>
  );
};

const NoTestInfo = () => (
  <Wrapper>
    <Content>등록된 시험정보가 없어요</Content>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
`;

const Color = styled.span`
  color: #336af8;
`;

const Content = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;

  font-weight: 600;
  text-align: center;
  margin-top: 10rem;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const BtWidth = styled.div`
  margin: 0 auto;
  width: 30%;

  @media only screen and (max-width: 550px) {
    width: 70%;
  }
`;
