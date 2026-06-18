import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Galery } from "../components/Galery";
import Scrollable from "../components/Scrollable";
import SectionTitle from "../components/SectionTitle";
import Counts from "../components/rating/Counts";
import { Map } from "../components/Map";
import RatingList from "../components/rating/RatingList";
import Button from "../components/Button";
import useModal from "../hooks/useModal";
import { RatingForm } from "../components/rating/RatingForm";
import MoreInfoList from "../components/outing/MoreInfoList";
import OutingDetailSkeleton from "../components/outing/OutingDetailSkeleton";
import OutingEditModal from "../components/admin/outing/OutingEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { deleteOuting } from "../actions/deleteOuting";
import useOuting from "../hooks/useOuting";
import { useUser } from "../context/UserContext";
import { Pencil, Trash2 } from "lucide-react";
import type { Rating } from "../types/Outing";
import type { OutingResponse } from "../types/Outing";
import toast from "react-hot-toast";

function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

function Outing() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imagesReady, setImagesReady] = useState(false);
  const [editingRating, setEditingRating] = useState<Rating | null>(null);
  const outingIdRef = useRef<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingOutingId, setDeletingOutingId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const { outingData, loading, error, silentRefetch, removeRating, patchOuting } = useOuting(
    slug || "",
  );
  const { isAdmin } = useUser();

  useEffect(() => {
    if (!outingData || outingData.id === outingIdRef.current) return;
    outingIdRef.current = outingData.id;
    setImagesReady(false);
    preloadImages(outingData.photos.map((p) => p.url)).then(() =>
      setImagesReady(true),
    );
  }, [outingData]);

  const handleDeleteSuccess = (ratingId: string) => {
    removeRating(ratingId);
    silentRefetch();
  };

  const handleEditRating = (rating: Rating) => {
    setEditingRating(rating);
    openModal();
  };

  const handleCloseRatingForm = () => {
    setEditingRating(null);
    closeModal();
  };

  const handleOpenCreateRating = () => {
    setEditingRating(null);
    openModal();
  };

  const handleEditOuting = () => {
    if (outingData) {
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteOuting = () => {
    if (outingData) {
      setDeletingOutingId(outingData.id);
    }
  };

  const confirmDelete = async () => {
    if (!deletingOutingId) return;
    setDeletingLoading(true);
    try {
      await deleteOuting(deletingOutingId);
      toast.success("Passeio excluído com sucesso!");
      setDeletingOutingId(null);
      navigate("/");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir passeio.");
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleEditSuccess = (data?: Record<string, unknown>) => {
    if (data) {
      patchOuting(data as unknown as OutingResponse);
    } else {
      silentRefetch();
    }
  };

  const showSkeleton = loading || !outingData || !imagesReady;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loading && !outingData) {
    return <div>No outing data found.</div>;
  }

  if (showSkeleton) {
    return <OutingDetailSkeleton />;
  }

  const images = outingData.photos.map((photo) => photo.url);
  const description = outingData.content;
  const title = outingData.title;

  const ratingCount = outingData.ratings ? outingData.ratings.length : 0;
  const totalRating = outingData.ratings
    ? outingData.ratings.reduce(
        (sum: number, r: Rating) => sum + (Number(r.rating) || 0),
        0,
      )
    : 0;
  const rating = ratingCount > 0 ? totalRating / ratingCount : 0;

  return (
    <article>
      {isModalOpen && (
        <RatingForm
          close={handleCloseRatingForm}
          outingId={outingData.id}
          onRatingSuccess={() => silentRefetch()}
          editingRating={editingRating}
        />
      )}
      <div className="w-full grid grid-cols-2 px-4 py-20 flex-col space-x-2 space-y-10 max-w-[1120px] mx-auto pt-8">
        <div className="col-span-full w-full">
          <Galery images={images} />
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2  font-semibold font-segoe  ">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl text-green-900">{title}</h1>
            {isAdmin && (
              <div className="flex gap-2">
                <div
                  className="bg-green-950 text-white p-2 rounded-full cursor-pointer hover:bg-green-800 transition-colors"
                  onClick={handleEditOuting}
                  title="Editar passeio"
                >
                  <Pencil className="w-4 h-4" />
                </div>
                <div
                  className="bg-red-700 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                  onClick={handleDeleteOuting}
                  title="Excluir passeio"
                >
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
          <Scrollable height={54}>
            <p className="text-gray-500 wrap-break-word ">{description}</p>
          </Scrollable>
          <MoreInfoList data={outingData} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Map
            latitude={outingData.location.latitude}
            longitude={outingData.location.longitude}
            name={outingData.location.city.name}
          />
        </div>

        <div className="flex col-span-full  ">
          <div className="flex flex-col gap-2 w-full justify-between min-h-full  ">
            <SectionTitle
              title="Avaliações"
              description="veja as principais avaliações"
              noPadding
            >
              <Counts rating={rating} ratingCount={ratingCount} />
            </SectionTitle>
            <RatingList
              data={outingData.ratings}
              onDeleteSuccess={handleDeleteSuccess}
              onEdit={handleEditRating}
              outingId={outingData.id}
            />
            <Button onClick={handleOpenCreateRating} variant="contrast">
              Deixe sua avaliação
            </Button>
          </div>
        </div>
      </div>

      <OutingEditModal
        isOpen={isEditModalOpen}
        outing={outingData}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        isOpen={!!deletingOutingId}
        title="Excluir Passeio"
        message="Tem certeza que deseja excluir este passeio? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingOutingId(null)}
        loading={deletingLoading}
      />
    </article>
  );
}
export default Outing;
