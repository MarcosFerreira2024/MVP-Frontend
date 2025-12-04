import { useEffect, useState } from "react";
import type { OutingCarouselItem } from "../components/outing/TwoRowsCarousel";
import { useOutings } from "../hooks/useOutings";
import type { OutingResponse, Rating } from "../types/Outing";

const useEventData = () => {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [eventsCarouselData, setEventsCarouselData] = useState<
    OutingCarouselItem[] | null
  >(null);
  const loading = isLoading;
  const error = contextError;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getOutings(50, 1, { category: "Event" });
        const allOutings: OutingResponse[] = response.outings || [];

        const mappedEvents: OutingCarouselItem[] = allOutings
          .filter((outing) => outing.category.name === "Event")
          .map((outing) => {
            const ratingCount = outing.ratings ? outing.ratings.length : 0;
            const totalRating = outing.ratings
              ? outing.ratings.reduce(
                  (sum: number, r: Rating) => sum + (Number(r.rating) || 0),
                  0
                )
              : 0;
            const avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;

            return {
              rating: avgRating.toFixed(1),
              ratingCount: ratingCount,
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
          });
        setEventsCarouselData(mappedEvents);
      } catch (e: any) {
        console.error(e);
        setEventsCarouselData([]);
      }
    };

    fetchEvents();
  }, [getOutings]);

  return { eventsCarouselData, loading, error };
};

export default useEventData;
