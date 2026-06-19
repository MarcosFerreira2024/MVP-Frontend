import { useMemo } from "react";
import type { OutingCarouselItem } from "../components/outing/TwoRowsCarousel";
import { useOutingsByCategory } from "../hooks/useOutingsByCategory";
import { formatPrice } from "../helpers/formatPrice";
import { getFirstPhotoUrl } from "../helpers/getFirstPhoto";
import type { OutingResponse, Rating } from "../types/Outing";

function mapToCarouselItem(outing: OutingResponse): OutingCarouselItem {
  const ratingCount = outing.ratings ? outing.ratings.length : 0;
  const totalRating = outing.ratings
    ? outing.ratings.reduce(
        (sum: number, r: Rating) => sum + (Number(r.rating) || 0),
        0
      )
    : 0;
  const avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;

  return {
    id: outing.id,
    rating: avgRating.toFixed(1),
    ratingCount,
    title: outing.title,
    description: outing.content,
    price: outing.price ? formatPrice(outing.price, true) : "Grátis",
    to: `/outing/${outing.slug}`,
    images:
      outing.photos.length > 0
        ? outing.photos.map((p) => p.url)
        : [getFirstPhotoUrl(outing.photos)],
  };
}

const useEventData = () => {
  const { rawOutings, loading, error, silentRefetch, patchItem } =
    useOutingsByCategory("Event", 50);

  const eventsCarouselData = useMemo<OutingCarouselItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Event")
      .map(mapToCarouselItem);
  }, [rawOutings]);

  return { eventsCarouselData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useEventData;
