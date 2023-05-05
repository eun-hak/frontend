import styled from '@emotion/styled';
import Major from 'api/Major';
import { versionCheck } from 'app/versionCheck';
import { LectureSearch, MainBanner, MainList, MajorSelect, OptionSelect } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sortOptions } from '../constants/placeholderData';

const Main = () => {
  const navigate = useNavigate();
  const [select, onSelect] = useState(false);
  const { version } = Major();

  useEffect(() => {
    version().then((ver) => versionCheck(ver));
  }, [version]);

  return (
    <div>
      <MainBanner />
      <Container>
        <LectureSearch />
        <SearchWrapper>
          <HeadSelection>
            <FlexWrapper>
              <MajorSelect />
            </FlexWrapper>
            <OptionSelect
              list={sortOptions}
              state={select}
              controller={onSelect}
              icon={true}
              itemTitle="name"
              location="main"
            />
          </HeadSelection>
          <HeadSelection>
            <MainList />
          </HeadSelection>
        </SearchWrapper>
        <Button
          onClick={() => {
            navigate(`/search?q=&option=lectureTotalAvg&majorType=전체`);
          }}
        >
          더 보러 가기 →
        </Button>
      </Container>
    </div>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

const HeadSelection = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 10px;
  width: 100%;
  justify-content: flex-start;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 40%;
  height: 50px;
  border: none;
  background: #336af8;
  color: white;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 550px) {
    width: 50%;
  }
`;
