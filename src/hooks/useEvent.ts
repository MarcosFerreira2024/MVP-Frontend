import { useEffect, useState, useCallback, useMemo } from "react";
import type { OutingCarouselItem } from "../components/outing/TwoRowsCarousel";
import { useOutings } from "../hooks/useOutings";
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
    price: outing.price
      ? `R$ ${outing.price.toFixed(2).replace(".", ",")}`
      : "Grátis",
    to: `/outing/${outing.slug}`,
    images:
      outing.photos.length > 0
        ? outing.photos.map((p) => p.url)
        : ["/placeholder.jpg"],
  };
}

const useEventData = () => {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const loading = isLoading;
  const error = contextError;

  const eventsCarouselData = useMemo<OutingCarouselItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Event")
      .map(mapToCarouselItem);
  }, [rawOutings]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getOutings(50, 1, { category: "Event" });
        const allOutings: OutingResponse[] = response.outings || [];
        setRawOutings(allOutings);
      } catch (e: any) {
        console.error(e);
      }
    };

    fetchEvents();
  }, [getOutings]);

  const silentRefetch = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3333/outing?take=50&page=1&category=Event");
      const data = await res.json();
      const allOutings: OutingResponse[] = data.items || [];
      setRawOutings(allOutings);
    } catch {
      console.warn("silentRefetch events failed");
    }
  }, []);

  const patchItem = useCallback((updated: OutingResponse) => {
    setRawOutings((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
  }, []);

  return { eventsCarouselData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useEventData;
