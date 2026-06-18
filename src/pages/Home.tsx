import { useState } from "react";
import Section from "../components/home/Section";
import { TwoRowsCarousel } from "../components/outing/TwoRowsCarousel";
import ParkCards from "../components/outing/parks/ParkCards";
import RevealingImage from "../components/RevealingImage";
import TrailCardList from "../components/trails/TrailCardList";
import TrailCardListSkeleton from "../components/trails/TrailCardListSkeleton";
import TwoRowsCarouselSkeleton from "../components/outing/TwoRowsCarouselSkeleton";
import OutingEditModal from "../components/admin/outing/OutingEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { deleteOuting } from "../actions/deleteOuting";
import useTrailData from "../hooks/useTrail";
import useEventData from "../hooks/useEvent";
import useParkData from "../hooks/usePark";
import type { OutingResponse } from "../types/Outing";
import toast from "react-hot-toast";

function Home() {
  const {
    trailsData,
    rawOutings: trailsRawOutings,
    loading: loadingTrails,
    error: errorTrails,
    silentRefetch: silentRefetchTrails,
    patchItem: patchTrailItem,
  } = useTrailData();
  const {
    eventsCarouselData,
    rawOutings: eventsRawOutings,
    loading: loadingEvents,
    error: errorEvents,
    silentRefetch: silentRefetchEvents,
    patchItem: patchEventItem,
  } = useEventData();
  const {
    rawOutings: parksRawOutings,
    loading: loadingParks,
    silentRefetch: silentRefetchParks,
    patchItem: patchParkItem,
  } = useParkData();

  const isLoading = loadingTrails || loadingEvents || loadingParks;
  const error = errorTrails || errorEvents;

  const [editingOuting, setEditingOuting] = useState<OutingResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingOutingId, setDeletingOutingId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const allRawOutings = [...(eventsRawOutings || []), ...(trailsRawOutings || []), ...(parksRawOutings || [])];

  const handleEditOuting = (id: string) => {
    const outing = allRawOutings.find((o) => o.id === id);
    if (outing) {
      setEditingOuting(outing);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteOuting = (id: string) => {
    setDeletingOutingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingOutingId) return;
    setDeletingLoading(true);
    try {
      await deleteOuting(deletingOutingId);
      toast.success("Passeio excluído com sucesso!");
      setDeletingOutingId(null);
      silentRefetchEvents();
      silentRefetchTrails();
      silentRefetchParks();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir passeio.");
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleEditSuccess = (data?: Record<string, unknown>) => {
    if (data) {
      const updated = data as unknown as OutingResponse;
      patchEventItem(updated);
      patchTrailItem(updated);
      patchParkItem(updated);
    }
  };

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <>
      <video
        loop
        autoPlay
        className="w-screen h-[600px] object-cover mt-8 grayscale-25 group-hover:grayscale-0"
        muted
        src="chuva.mp4"
      />
      <Section
        description="veja nossos principais parques"
        title="Parques"
        isOnLightBg
      >
        <ParkCards />
      </Section>
      <div>
        <RevealingImage image="/trilha.jpg" />
        <Section
          title="Trilhas"
          description="veja nossas principais trilhas"
          isOnLightBg={false}
        >
          {isLoading ? (
            <TrailCardListSkeleton />
          ) : (
            trailsData && (
              <TrailCardList
                data={trailsData}
                onEdit={handleEditOuting}
                onDelete={handleDeleteOuting}
              />
            )
          )}
        </Section>
      </div>
      <div>
        <Section
          title="Eventos"
          description="veja nossos principais eventos"
          isOnLightBg
        >
          {isLoading ? (
            <TwoRowsCarouselSkeleton />
          ) : (
            eventsCarouselData && (
              <TwoRowsCarousel
                items={eventsCarouselData}
                onEdit={handleEditOuting}
                onDelete={handleDeleteOuting}
              />
            )
          )}
        </Section>
      </div>

      <OutingEditModal
        isOpen={isEditModalOpen}
        outing={editingOuting}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingOuting(null);
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
    </>
  );
}

export default Home;
