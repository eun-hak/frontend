import { User } from 'api';
import useSlider from 'components/Etc/RangeInput';
import { useState } from 'react';

const useWriteEvaluation = ({ setModalIsOpen, row, type }) => {
  const { updateEvaluation, writeEvaluation } = User();
  const [content, setContent] = useState(row.content);
  const [selectedSemester, setSelectedSemester] = useState(row.selectedSemester); //학기
  const SliderOptions = {
    honey: useSlider(row.honey),
    learning: useSlider(row.learning),
    satisfaction: useSlider(row.satisfaction),
  }; //강의옵션
  const [lectureOptions, setLectureOptions] = useState({
    team: row.team,
    homework: row.homework,
    difficulty: row.difficulty,
  }); //강의옵션

  const data = {
    lectureName: row.lectureName,
    professor: row.professor,
    selectedSemester,
    satisfaction: SliderOptions.satisfaction.state,
    learning: SliderOptions.learning.state,
    honey: SliderOptions.honey.state,
    team: lectureOptions.team,
    difficulty: lectureOptions.difficulty,
    homework: lectureOptions.homework,
    content,
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeLectureOptions = (e) => {
    setLectureOptions({ ...lectureOptions, [e.target.name]: e.target.value });
  };

  const onEvaluate = () => {
    if (selectedSemester === '' || selectedSemester === '선택') return alert('학기를 선택해주세요');
    if (SliderOptions.honey[0] < 0.5 || SliderOptions.honey[0] === undefined)
      return alert('꿀강지수는 0.5점부터 선택 가능합니다');
    if (SliderOptions.learning[0] < 0.5 || SliderOptions.learning[0] === undefined)
      return alert('배움지수는 0.5점부터 선택 가능합니다');
    if (SliderOptions.satisfaction[0] < 0.5 || SliderOptions.satisfaction[0] === undefined)
      return alert('만족도는 0.5점부터 선택 가능합니다');
    if (lectureOptions.team === '') return alert('조모임(란)을 선택해주세요');
    if (lectureOptions.homework === '') return alert('과제(란)을 선택해주세요');
    if (lectureOptions.difficulty === '') return alert('학점(란)을 선택해주세요');
    if (content.length < 30 || content.length > 1000)
      return alert('최소 30자 이상 최대 1000자 이내로 입력해주세요');
    type === 'update' ? updateEvaluation(row.id, data) : writeEvaluation(row.id, data);
    setModalIsOpen(false);
  };
  return {
    SliderOptions,
    lectureOptions,
    content,
    selectedSemester,
    onChangeContent,
    onChangeLectureOptions,
    onEvaluate,
    setSelectedSemester,
  };
};

export default useWriteEvaluation;
