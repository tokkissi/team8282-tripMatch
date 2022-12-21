import React from "react";
import Modal from "./../../styles/Modal";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./../../store/hooks";
import { closeModal } from "../../slice/modal";

interface DeleteModalProps {
  callBackFn?: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ callBackFn }) => {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.modal.element);

  const onCancle = () => dispatch(closeModal());

  const onExcute = () => {
    callBackFn();
    dispatch(closeModal());
  };

  return (
    <ModalCard>
      <div className="modalCard">
        <ModalTitle>{text && text[0]}</ModalTitle>
        <p>{text && text[1]}</p>
        <ButtonContainer>
          <button onClick={onCancle}>
            {text && text[3] ? text[3] : "취소"}
          </button>
          <button onClick={onExcute}>{text && text[2]}</button>
        </ButtonContainer>
      </div>
    </ModalCard>
  );
};

export default DeleteModal;

const ModalCard = styled(Modal)`
  .modalCard {
    justify-content: space-between;
  }
`;

const ModalTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
  align-self: start;
  padding: 10px 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 50px;

  button {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:nth-child(2) {
      background-color: ${(props) => props.theme.color.pink};
    }

    + button {
      margin-left: 20px;
    }
  }
`;
