import { useState } from "react";

function useModal() {
  const [isModalOpen, setModalVisibility] = useState(false);

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "esc") {
        setModalVisibility(false);
      }
    });
    setModalVisibility(false);
  };

  const toggleModal = () => {
    setModalVisibility(!isModalOpen);
  };

  return { openModal, closeModal, toggleModal, isModalOpen };
}

export default useModal;
