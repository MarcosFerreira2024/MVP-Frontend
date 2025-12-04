import Header from "../components/Header";
import { Galery } from "../components/Galery";
import Scrollable from "../components/Scrollable";
import SectionTitle from "../components/SectionTitle";
import Counts from "../components/rating/Counts";
import { Map } from "../components/Map";
import RatingList from "../components/rating/RatingList";
import Button from "../components/Button";
import useModal from "../hooks/useModal";
import { useParams } from "react-router-dom";
import { RatingForm } from "../components/rating/RatingForm";
import MoreInfoList from "../components/outing/MoreInfoList";
// import Loading from "../components/Loading"; // No longer needed here as global loading handles it
import useOuting from "../hooks/useOuting";
import type { Rating } from "../types/Outing";

function Outing() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { slug } = useParams<{ slug: string }>();

  // Now, 'loading' comes from the global context via useOuting
  const { outingData, loading, error, refetchOuting } = useOuting(slug || "");

  // Local checks for error or no data should remain
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loading && !outingData) {
    // Only show "no data" if not loading and still no data
    return <div>No outing data found.</div>;
  }

  // If loading is true, the global Loading component will be displayed.
  // The rest of the page content should not render until !loading && outingData

  if (loading || !outingData) {
    return null; // Don't render anything here, global loading handles it
  }

  const images = outingData.photos.map((photo) => photo.url);
  const description = outingData.content;
  const title = outingData.title;

  const ratingCount = outingData.ratings ? outingData.ratings.length : 0;
  const totalRating = outingData.ratings
    ? outingData.ratings.reduce(
        (sum: number, r: Rating) => sum + (Number(r.rating) || 0),
        0
      )
    : 0;
  const rating = ratingCount > 0 ? totalRating / ratingCount : 0;

  return (
    <article>
      <Header />
      {isModalOpen && <RatingForm close={closeModal} outingId={outingData.id} onRatingSuccess={refetchOuting} />}
      <div className="w-full grid grid-cols-2  py-20 flex-col space-x-2 space-y-10 max-w-[1120px] mx-auto pt-8">
        <div className="col-span-full">
          <Galery images={images} />
        </div>

        <div className="flex flex-col gap-2  font-semibold font-segoe  ">
          <h1 className="text-4xl text-green-900">{title}</h1>
          <Scrollable height={54}>
            <p className="text-gray-500 wrap-break-word ">{description}</p>
          </Scrollable>
          <MoreInfoList data={outingData} />
        </div>
        <Map
          latitude={outingData.location.latitude}
          longitude={outingData.location.longitude}
          name={outingData.location.city.name}
        />

        <div className="flex col-span-full  ">
          <div className="flex flex-col gap-2 w-full justify-between min-h-full  ">
            <SectionTitle
              title="Avaliações"
              description="veja as principais avaliações"
            >
              <Counts rating={rating} ratingCount={ratingCount} />
            </SectionTitle>
            <RatingList data={outingData.ratings} onDeleteSuccess={refetchOuting} outingId={outingData.id} />
            <Button onClick={openModal} variant="contrast">
              Deixe sua avaliação
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Outing;
