import { useEffect, useState } from "react";
import { useOutings } from "../hooks/useOutings";
import type { TrailCardListProps } from "../components/trails/TrailCardList";
import type { OutingResponse } from "../types/Outing";

const useTrailData = () => {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [trailsData, setTrailsData] = useState<
    TrailCardListProps["data"] | null
  >(null);
  const loading = isLoading;
  const error = contextError;

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await getOutings(8, 1, { category: "Trail" }); // Use getOutings from context, filter by category
        const allOutings: OutingResponse[] = response.outings || []; // Ensure it's an array

        const filteredTrails: TrailCardListProps["data"] = allOutings
          .filter((outing) => outing.category.name === "Trail" && outing.trail)
          .map((outing) => ({
            data: {
              title: outing.title,
              text: outing.content,
              location: outing.location?.city?.name || "Desconhecido",
              trailSize: outing.trail ? `${outing.trail.distance} km` : "N/A",
              openTime:
                outing.openHours.length > 0
                  ? outing.openHours[0].openTime
                  : "N/A",
              closeTime:
                outing.openHours.length > 0
                  ? outing.openHours[0].closeTime
                  : "N/A",
              openHoursText:
                outing.openHours.length > 0
                  ? `${outing.openHours[0].openTime} às ${outing.openHours[0].closeTime}`
                  : "N/A",
              navigateTo: `/outing/${outing.slug}`,
            },
            image:
              outing.photos.length > 0
                ? outing.photos[0].url
                : "/placeholder.jpg",
          }));

        setTrailsData(filteredTrails);
      } catch (e: any) {
        console.error(e);
        setTrailsData([]); // Set to empty array on error
      }
    };

    fetchTrails();
  }, [getOutings]);

  return { trailsData, loading, error };
};

export default useTrailData;
