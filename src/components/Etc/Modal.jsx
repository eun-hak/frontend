import styled from '@emotion/styled';
import { useEffect } from 'react';

const Modal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    const onKeyPress = (e) => e.key === 'Escape' && onRequestClose();
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [onRequestClose]);

  return (
    isOpen && (
      <ModalContainer tabIndex={0} onClick={onRequestClose}>
        <ModalBody onClick={(e) => e.stopPropagation()}>{children}</ModalBody>
      </ModalContainer>
    )
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBody = styled.div`
  display: flex;
  position: absolute;
  padding: 10px;
  min-width: 700px;
  max-height: 95vh;
  text-align: left;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  @media only screen and (max-width: 550px) {
    min-width: 90%;
  }
`;
