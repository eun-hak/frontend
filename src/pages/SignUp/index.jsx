import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkemailApi, checkidApi, registerApi } from '../../api/Api';
import { CssTextField } from '../../components/CssTextField';
import * as Styled from './styled';

const SignUp = () => {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const [idcheck, setIdcheck] = useState(false);
  const [emailcheck, setEmailcheck] = useState(false);

  const [db, setData] = useState({
    data: '',
  });

  const onChangeName = useCallback((e) => {
    const nameRegex = /^[a-z|0-9|]+$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);
    if (!nameRegex.test(nameCurrent)) {
      setNameMessage('아이디는 영소문자 및 숫자로 입력해주세요');
      setIsName(false);
    } else if (e.target.value.length < 6) {
      setNameMessage('아이디는 6자리 이상 입력해주세요.');
      setIsName(false);
    } else if (e.target.value.length > 20) {
      setNameMessage('아이디는 20자리 이하로 입력해주세요.');
      setIsName(false);
    } else if (e.target.value.length > 6 || e.target.value.length < 20) {
      setNameMessage('아이디 중복확인해주세요.');
      setIsName(true);
      setIdcheck(false);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;

    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent) || !emailCurrent.endsWith('@suwon.ac.kr')) {
      setEmailMessage('이메일 형식이 틀렸습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일입니다.');
      setIsEmail(true);
      setEmailcheck(false);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자(!@#$%^+=-) 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('사용 가능한 비밀번호입니다.');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호가 일치합니다.');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  //체크박스
  const [checkList, setCheckList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 체크박스 전체선택시 모두선택 체크박스 활성화시키기
  const handleCheck = (e) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((el) => el !== e.target.name));
  };

  // 전체체크 선택시 전체 선택 or 전체해제
  const checkAll = (e) => {
    e.target.checked ? setCheckList(['terms', 'privacy']) : setCheckList([]);
  };

  const onClick = () => {
    registerApi(setData, setLoading, name, password, email);
    navigate('/emailsignup', { state: email });
  };

  const onCheck = () => {
    checkidApi(setIdcheck, name);
  };

  const onEmail = () => {
    checkemailApi(setEmailcheck, email);
  };

  useEffect(() => {
    if (idcheck) return setNameMessage('아이디 중복확인 완료');
  }, [idcheck]);

  useEffect(() => {
    if (emailcheck) return setEmailMessage('이메일 중복확인 완료');
  }, [emailcheck]);

  useEffect(() => {
    if (loading) {
      if (db.data !== null) {
        alert('회원가입 성공');
        navigate('/');
      } else {
        alert('회원가입 실패');
      }
    }
  });

  return (
    <Styled.Container>
      <Styled.Img loading="lazy" src="img/signup.svg" width={450} />
      <Styled.SignUpWrapper>
        <Styled.Title>회원가입</Styled.Title>
        <Styled.InputWrapper id="top">
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
            onChange={onChangeName}
          />
          <Styled.Button
            disabled={!isName || idcheck}
            id="check"
            onClick={onCheck}
            background="#336af8"
          >
            중복확인
          </Styled.Button>
        </Styled.InputWrapper>
        {name.length > 0 && (
          <Styled.Checking className={`message ${isName ? 'success' : 'error'}`}>
            {nameMessage}
          </Styled.Checking>
        )}

        <CssTextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        {password.length > 0 && (
          <Styled.Checking className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </Styled.Checking>
        )}
        <CssTextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          id="passwordConfirm"
          autoComplete="current-password"
          onChange={onChangePasswordConfirm}
        />
        {passwordConfirm.length > 0 && (
          <Styled.Checking className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>
            {passwordConfirmMessage}
          </Styled.Checking>
        )}
        <Styled.InputWrapper id="top">
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="학교 이메일(@suwon.ac.kr)"
            type="email"
            id="email"
            autoComplete="current-email"
            onChange={onChangeEmail}
          />
          <Styled.Button
            disabled={!isEmail || emailcheck}
            id="check"
            onClick={onEmail}
            background="#336af8"
          >
            중복확인
          </Styled.Button>
        </Styled.InputWrapper>
        {email.length > 0 && (
          <Styled.Checking className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </Styled.Checking>
        )}

        <Styled.EmailWrapper>
          * 수원대 이메일 인증 후 서비스 이용이 가능합니다.
          <br />
          <br />* 이메일 인증 시 주의 사항
          <br />- 웹메일이 휴면 상태인지 확인해주세요.
          <br />- 웹메일 계정은 포털 계정과 다르니 이 부분 주의 바랍니다.
        </Styled.EmailWrapper>

        <Styled.Label>
          <Styled.InputWrapper>
            <input
              type="checkbox"
              name="checkAll"
              onChange={checkAll}
              checked={checkList.length === 2 ? true : false}
            />
            아래 내용에 모두 동의합니다.
          </Styled.InputWrapper>
        </Styled.Label>
        <Styled.Label>
          <Styled.InputWrapper>
            <input
              type="checkbox"
              name="terms"
              onChange={handleCheck}
              checked={checkList.includes('terms') ? true : false}
            />
            이용약관 동의(필수)
          </Styled.InputWrapper>
          <Styled.AgreeButton
            className="showMore"
            onClick={() => window.open('https://sites.google.com/view/suwiki-policy-terms')}
          >
            상세보기
          </Styled.AgreeButton>
        </Styled.Label>
        <Styled.Label id="last">
          <Styled.InputWrapper>
            <input
              type="checkbox"
              name="privacy"
              onChange={handleCheck}
              checked={checkList.includes('privacy') ? true : false}
            />
            개인정보처리방침 동의(필수)
          </Styled.InputWrapper>
          <Styled.AgreeButton
            className="showMore"
            onClick={() => window.open('https://sites.google.com/view/suwiki-policy-privacy')}
          >
            상세보기
          </Styled.AgreeButton>
        </Styled.Label>
        <Styled.Button
          disabled={
            !(
              isName &&
              isEmail &&
              isPassword &&
              isPasswordConfirm &&
              checkList.length === 2 &&
              idcheck &&
              emailcheck
            )
          }
          background="#336af8"
          onClick={onClick}
        >
          회원가입
        </Styled.Button>
      </Styled.SignUpWrapper>
    </Styled.Container>
  );
};

export default SignUp;
