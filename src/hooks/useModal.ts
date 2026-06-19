import { useState, useEffect } from "react";

function useModal() {
  const [isModalOpen, setModalVisibility] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalVisibility(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const toggleModal = () => {
    setModalVisibility(!isModalOpen);
  };

  return { openModal, closeModal, toggleModal, isModalOpen };
}

export default useModal;
