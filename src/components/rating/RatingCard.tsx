import React, { useState } from "react";
import UserCard from "./UserCard";
import type { Rating } from "../../types/Outing";
import { Trash } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { deleteRating } from "../../actions/deleteRating";
import handleErrors from "../../helpers/handleErrors";
import toast from "react-hot-toast";
import Button from "../Button";

interface RatingCardProps {
  ratingData: Rating;
  onDeleteSuccess?: () => void;
  outingId: string; // Add outingId to props
}

function RatingCard({ ratingData, onDeleteSuccess, outingId }: RatingCardProps) {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await toast.promise(deleteRating(outingId, ratingData.id), { // Pass both outingId and ratingId
        loading: "Apagando avaliação...",
        success: "Avaliação apagada com sucesso!",
        error: (err) => handleErrors(err),
      });
      onDeleteSuccess?.(); // Call the refresh function
    } catch (error) {
      // Errors handled by toast.promise
    } finally {
      setIsDeleting(false);
    }
  };

  const isMyRating = user && user.email === ratingData.user.email; // Compare emails for now

  return (
    <div className="flex flex-col gap-3 h-full max-h-[150px] w-full py-3 border-b border-gray-200 relative">
      {isMyRating && (
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-0 right-0 w-8 h-8 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
          size="icon"
          aria-label="Apagar avaliação"
        >
          <Trash size={16} />
        </Button>
      )}
      <UserCard
        data={ratingData.createdAt}
        ratingValue={ratingData.rating}
        userName={ratingData.user.name}
        userPhoto={ratingData.avatarUrl || undefined}
      />
      {ratingData.comment && (
        <p className="font-segoe text-sm font-semibold text-gray-500 h-full line-clamp-3">
          {ratingData.comment}
        </p>
      )}
    </div>
  );
}

export default RatingCard;
