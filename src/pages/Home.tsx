import { useEffect } from "react";
import toast from "react-hot-toast";
import Section from "../components/home/Section";
import { TwoRowsCarousel } from "../components/outing/TwoRowsCarousel";
import ParkCards from "../components/outing/parks/ParkCards";
import RevealingImage from "../components/RevealingImage";
import TrailCardList from "../components/trails/TrailCardList";
import TrailCardListSkeleton from "../components/trails/TrailCardListSkeleton";
import TwoRowsCarouselSkeleton from "../components/outing/TwoRowsCarouselSkeleton";
import OutingEditModal from "../components/admin/outing/OutingEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import useTrailData from "../hooks/useTrail";
import useEventData from "../hooks/useEvent";
import useParkData from "../hooks/usePark";
import { useOutingCrud } from "../hooks/useOutingCrud";
import type { OutingResponse } from "../types/Outing";

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

  const allRawOutings = [...(eventsRawOutings || []), ...(trailsRawOutings || []), ...(parksRawOutings || [])];

  const {
    editingOuting,
    isEditModalOpen,
    deletingOutingId,
    deletingLoading,
    handleEditOuting,
    handleDeleteOuting,
    confirmDelete,
    closeEditModal,
    cancelDelete,
  } = useOutingCrud(allRawOutings);

  const handleConfirmDelete = () => confirmDelete(() => {
    silentRefetchEvents();
    silentRefetchTrails();
    silentRefetchParks();
  });

  const handleEditSuccess = (data?: Record<string, unknown>) => {
    if (data) {
      const updated = data as unknown as OutingResponse;
      patchEventItem(updated);
      patchTrailItem(updated);
      patchParkItem(updated);
    }
  };

  useEffect(() => {
    if (error) toast.error(error, { id: "home-fetch-error" });
  }, [error]);

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
        onClose={closeEditModal}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        isOpen={!!deletingOutingId}
        title="Excluir Passeio"
        message="Tem certeza que deseja excluir este passeio? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
        loading={deletingLoading}
      />
    </>
  );
}

export default Home;
