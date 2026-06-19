import { useState } from "react";
import { deleteRating } from "../actions/deleteRating";
import handleErrors from "../helpers/handleErrors";
import toast from "react-hot-toast";

interface UseRatingDeleteParams {
  outingId: string;
  onDeleteSuccess?: (ratingId: string) => void;
}

export function useRatingDelete({ outingId, onDeleteSuccess }: UseRatingDeleteParams) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (ratingId: string) => {
    setIsDeleting(true);
    try {
      await toast.promise(deleteRating(outingId, ratingId), {
        loading: "Apagando avaliação...",
        success: "Avaliação apagada com sucesso!",
        error: (err) => handleErrors(err),
      });
      onDeleteSuccess?.(ratingId);
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
