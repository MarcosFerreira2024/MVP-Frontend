import UserCard from "./UserCard";
import type { Rating } from "../../types/Outing";
import { Pencil, Trash } from "lucide-react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useRatingDelete } from "../../hooks/useRatingDelete";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import ConfirmDialog from "../ConfirmDialog";
import Button from "../Button";

interface RatingCardProps {
  ratingData: Rating;
  onDeleteSuccess?: (ratingId: string) => void;
  onEdit?: (rating: Rating) => void;
  outingId: string;
}

function RatingCard({ ratingData, onDeleteSuccess, onEdit, outingId }: RatingCardProps) {
  const { loading, canDeleteRating, isOwner } = useAuthorization();
  const { isDeleting, handleDelete } = useRatingDelete({ outingId, onDeleteSuccess });
  const { confirmDeleteId, requestDelete, cancelDelete } = useConfirmDelete();

  const canDelete = canDeleteRating(ratingData.userId);
  const isOwnerRating = isOwner(ratingData.userId);

  return (
    <div className="flex flex-col gap-3 h-full max-h-[150px] w-full py-3 border-b border-gray-200 relative">
      {!loading && canDelete && !isDeleting && (
        <div className="absolute top-0 right-0 flex gap-1">
          {isOwnerRating && (
            <Button
              onClick={() => onEdit?.(ratingData)}
              className="w-8 h-8 p-1 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors"
              size="icon"
              aria-label="Editar avaliação"
            >
              <Pencil size={16} />
            </Button>
          )}
          <Button
            onClick={() => requestDelete(ratingData.id)}
            disabled={isDeleting}
            className="w-8 h-8 p-1 bg-red-700 hover:bg-red-800 text-white rounded-full flex items-center justify-center transition-colors"
            size="icon"
            aria-label="Apagar avaliação"
          >
            <Trash size={16} />
          </Button>
        </div>
      )}
      <UserCard
        data={ratingData.createdAt}
        ratingValue={ratingData.rating}
        userName={ratingData.user.name}
        userPhoto={ratingData.user.avatarUrl || undefined}
      />
      {ratingData.comment && (
        <p className="font-segoe text-sm font-semibold text-gray-500 h-full line-clamp-3">
          {ratingData.comment}
        </p>
      )}

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        title="Excluir Avaliação"
        message="Tem certeza que deseja excluir esta avaliação? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={() => {
          if (confirmDeleteId) {
            handleDelete(confirmDeleteId);
            cancelDelete();
          }
        }}
        onCancel={cancelDelete}
        loading={isDeleting}
      />
    </div>
  );
}

export default RatingCard;
