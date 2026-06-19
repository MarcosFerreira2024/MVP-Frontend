import { useState } from "react";
import useModal from "./useModal";
import type { Rating } from "../types/Outing";

export function useRatingFormDialog() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [editingRating, setEditingRating] = useState<Rating | null>(null);

  const handleOpenCreateRating = () => {
    setEditingRating(null);
    openModal();
  };

  const handleEditRating = (rating: Rating) => {
    setEditingRating(rating);
    openModal();
  };

  const handleCloseRatingForm = () => {
    setEditingRating(null);
    closeModal();
  };

  return {
    isModalOpen,
    editingRating,
    handleOpenCreateRating,
    handleEditRating,
    handleCloseRatingForm,
  };
}
