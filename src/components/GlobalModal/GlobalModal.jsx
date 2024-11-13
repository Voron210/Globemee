import React from "react";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../context/ModalContext/ModalContext";

const GlobalModal = () => {
  const { modalContent, isModalOpen, closeModal, closable } = useModal();

  return (
    <Modal active={isModalOpen} setActive={closeModal} closable={closable}>
      {modalContent}
    </Modal>
  );
};

export default GlobalModal;
