import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MajorSearch, Modal } from 'components';
import { subStr } from 'utils/subString';
import { Arrows, OptionBox, SelectedOption, SelectedOption_M } from 'styles/common';

const MajorSelect = () => {
  const [searchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const majorType = searchParams.get('majorType') || '전체';

  const handleOptionBoxClick = () => setModalIsOpen(true);
  const handleModalRequestClose = () => setModalIsOpen(false);

  return (
    <>
      <OptionBox id="major" onClick={handleOptionBoxClick}>
        <SelectedOption id="major">{majorType}</SelectedOption>
        <SelectedOption_M>{subStr(majorType, 3)}</SelectedOption_M>
        <Arrows
          id="major"
          alt="arrow"
          src={`/images/icon_${modalIsOpen ? 'up' : 'down'}_arrow_solid_24.svg`}
        />
      </OptionBox>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalRequestClose}>
        <MajorSearch setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
};

export default MajorSelect;
