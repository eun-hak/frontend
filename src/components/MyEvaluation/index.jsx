import React, { useState } from 'react';
import {
  BoxString1,
  BoxString2,
  BoxString3,
  BoxString4,
  BoxString5,
  ModalString1,
  ModalString2,
} from './styled';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import Modal from 'react-modal';
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import ModalStyle from '../../components/ModalStyle';

const Myevaluation = () => {
  let [subjectName, setSubjectName] = useState(['학문과 사고', '네트워크 개론', '졸업프로젝트']);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {subjectName.map((name, index) => (
        <Subject subjectName={subjectName} setSubjectName={setSubjectName} index={index} />
      ))}
    </Container>
  );
};

export const Modal1 = () => {
  return (
    <div style={{ paddingBottom: '10px', paddingTop: '5px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ModalString1>만족도 ⭐⭐⭐⭐</ModalString1>
          <ModalString2>조모임</ModalString2>
          <ModalString2 style={{ color: 'rgb(190, 190, 190)' }}>없음</ModalString2>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ModalString1>꿀강 지수 ⭐⭐⭐⭐</ModalString1>
          <ModalString2>과제</ModalString2>
          <ModalString2 style={{ color: 'rgb(231, 76, 60)' }}>많음</ModalString2>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ModalString1>배움 지수 ⭐⭐⭐⭐</ModalString1>
          <ModalString2>학점</ModalString2>
          <ModalString2 style={{ color: 'rgb(231, 76, 60)' }}>까다로움</ModalString2>
        </Grid>
      </Grid>
    </div>
  );
};

export const Subject = (props) => {
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/lectureinfo');
  };

  // const Delete = () => {
  //   if(window.confirm("강의평가를 삭제하시겠습니까?")===true){
  //     let arrayCopy = [...props.subjectName];
  //     arrayCopy.shift();
  //     props.setSubjectName(arrayCopy)
  //   }else{ return }
  // }

  return (
    <div
      style={{
        margin: '10px 0',
        borderBottom: '2px solid rgba(158,158,158,.5)',
        padding: '15px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div style={{ marginBottom: '15px' }}>
        <BoxString1>2020-1</BoxString1>
        {/* <BoxButton2 onClick={()=> {Delete()}} style={{ float: "right" }}>삭제</BoxButton2>
        <BoxButton1 onClick={()=> setModalIsOpen(true)} style={{ float: "right" }}>수정</BoxButton1> */}
      </div>
      <BoxString2>{props.subjectName[props.index]}</BoxString2>
      <BoxString4>이다미 교수님</BoxString4>
      <Styled.TempMargin>
        <BoxString3>평균 지수</BoxString3>
        <BoxString3 style={{ padding: '0 10px', letterSpacing: '-2px' }}>⭐⭐⭐⭐⭐</BoxString3>
        <span style={{ color: '#2f2f2f' }}>5.0</span>
        <BoxString5
          onClick={() => {
            setModal(!modal);
          }}
        >
          {modal === true ? '간략하게 보기 >' : '자세히 보기 >'}
        </BoxString5>
      </Styled.TempMargin>
      {modal === true ? <Modal1 /> : null}
      {/* <BoxString6>가나다라마바사아자차카타파하가나다라마바사아자차카타파하
        가나다라마바사아자차카타파하
        가나다라마바사아자차카타파하
      </BoxString6> */}
      <Modal
        isOpen={modalIsOpen}
        style={ModalStyle}
        // 오버레이나 esc를 누르면 핸들러 동작
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      ></Modal>
    </div>
  );
};

export default Myevaluation;
