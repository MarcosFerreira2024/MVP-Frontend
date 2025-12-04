import { useState } from "react";
import useModal from "./useModal";
import { useSearchParams } from "react-router-dom";

function useSelect(initialValue: string, key: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyValue = searchParams.get(key);

  const { isModalOpen, closeModal, toggleModal } = useModal();

  const [selectedValue, setSelectedValue] = useState(keyValue ?? initialValue);

  function handleSelection(value: string) {
    if (value !== selectedValue) {
      setSelectedValue(value);

      searchParams.set(key, value);
      setSearchParams(searchParams);

      closeModal();
    }
  }

  return {
    handleSelection,
    selectedValue,
    isModalOpen,
    closeModal,
    toggleModal,
  };
}

export default useSelect;
