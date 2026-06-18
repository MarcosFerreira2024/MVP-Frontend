import { useEffect, useState, useCallback, useMemo } from "react";
import { useOutings } from "../hooks/useOutings";
import type { OutingResponse } from "../types/Outing";

export type TrailListItem = {
  id: string;
  data: {
    title: string;
    text: string;
    location: string;
    trailSize: string;
    openTime: string;
    closeTime: string;
    openHoursText: string;
    navigateTo: string;
  };
  image: string;
};

function mapToTrailItem(outing: OutingResponse): TrailListItem {
  return {
    id: outing.id,
    data: {
      title: outing.title,
      text: outing.content,
      location: outing.location?.city?.name || "Desconhecido",
      trailSize: outing.trail ? `${outing.trail.distance} km` : "N/A",
      openTime:
        outing.openHours.length > 0 ? outing.openHours[0].openTime : "N/A",
      closeTime:
        outing.openHours.length > 0 ? outing.openHours[0].closeTime : "N/A",
      openHoursText:
        outing.openHours.length > 0
          ? `${outing.openHours[0].openTime} às ${outing.openHours[0].closeTime}`
          : "N/A",
      navigateTo: `/outing/${outing.slug}`,
    },
    image:
      outing.photos.length > 0 ? outing.photos[0].url : "/placeholder.jpg",
  };
}

const useTrailData = () => {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const loading = isLoading;
  const error = contextError;

  const trailsData = useMemo<TrailListItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Trail" && outing.trail)
      .map(mapToTrailItem);
  }, [rawOutings]);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await getOutings(8, 1, { category: "Trail" });
        const allOutings: OutingResponse[] = response.outings || [];
        setRawOutings(allOutings);
      } catch (e: any) {
        console.error(e);
      }
    };

    fetchTrails();
  }, [getOutings]);

  const silentRefetch = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3333/outing?take=8&page=1&category=Trail");
      const data = await res.json();
      const allOutings: OutingResponse[] = data.items || [];
      setRawOutings(allOutings);
    } catch {
      console.warn("silentRefetch trails failed");
    }
  }, []);

  const patchItem = useCallback((updated: OutingResponse) => {
    setRawOutings((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
  }, []);

  return { trailsData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useTrailData;
