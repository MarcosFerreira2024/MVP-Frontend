import { useState, useEffect } from "react";
import { sendRating } from "../actions/sendRating";
import { updateRating } from "../actions/updateRating";
import handleErrors from "../helpers/handleErrors";
import toast from "react-hot-toast";
import type { Rating } from "../types/Outing";

interface UseRatingFormParams {
  outingId: string;
  editingRating: Rating | null;
  onRatingSuccess?: () => void;
  close: () => void;
}

export function useRatingForm({
  outingId,
  editingRating,
  onRatingSuccess,
  close,
}: UseRatingFormParams) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!editingRating;
  const displayRating = hoverRating || rating;

  useEffect(() => {
    if (editingRating) {
      setRating(editingRating.rating);
      setContent(editingRating.comment || "");
    } else {
      setRating(0);
      setContent("");
    }
  }, [editingRating]);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação de 1 a 5 estrelas.");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && editingRating) {
        await toast.promise(updateRating(editingRating.id, { rating, content }), {
          loading: "Atualizando avaliação...",
          success: "Avaliação atualizada com sucesso!",
          error: (err) => handleErrors(err),
        });
      } else {
        await toast.promise(sendRating({ outingId, rating, content }), {
          loading: "Enviando avaliação...",
          success: "Avaliação enviada com sucesso!",
          error: (err) => handleErrors(err),
        });
      }
      onRatingSuccess?.();
      close();
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const setContentValue = (value: string) => {
    setContent(value);
  };

  return {
    rating,
    hoverRating,
    content,
    isLoading,
    isEditing,
    displayRating,
    handleStarClick,
    handleStarHover,
    handleMouseLeave,
    handleSubmit,
    setContent: setContentValue,
  };
}
