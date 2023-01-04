import { useEffect, useState } from 'react';
import Auth from '../../api/Auth';
import { CssTextField } from '../../components/CssTextField';
import Meta from '../../components/Meta';
import * as Styled from './styled';

const IdSearch = () => {
  const auth = Auth();
  const [email, setEmail] = useState();
  const [db, setData] = useState({
    data: [],
  });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const emailSubmit = () => {
    auth.findId(setData, email);
  };

  useEffect(() => {}, [db.data]);
  return (
    <Styled.Container>
      <Meta title="SUWIKI : 아이디 찾기" />
      <Styled.Img src="images/signup.svg" width={400} />
      <Styled.LoginWrapper>
        <Styled.Title>아이디 찾기</Styled.Title>
        <Styled.Sub>학교 계정을 입력하세요</Styled.Sub>
        <CssTextField
          margin="normal"
          required
          id="outlined-basic"
          label="학교 이메일 입력(@suwon.ac.kr)"
          name="email"
          autoComplete="email"
          onChange={onChangeEmail}
        />
        <Styled.Button
          background="#336af8"
          type="submit"
          fullWidth
          variant="contained"
          onClick={emailSubmit}
        >
          전송
        </Styled.Button>
      </Styled.LoginWrapper>
    </Styled.Container>
  );
};

export default IdSearch;
