import { useEffect, useState, useCallback, useMemo } from "react";
import { useOutings } from "../hooks/useOutings";
import type { OutingResponse } from "../types/Outing";

export type ParkDisplayItem = {
  id: string;
  src: string;
  to: string;
  name: string;
};

function mapToParkItem(outing: OutingResponse): ParkDisplayItem {
  return {
    id: outing.id,
    src: outing.photos.length > 0 ? outing.photos[0].url : "/placeholder.jpg",
    to: `/outing/${outing.slug}`,
    name: outing.title,
  };
}

const useParkData = () => {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const loading = isLoading;
  const error = contextError;

  const parksData = useMemo<ParkDisplayItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Park")
      .map(mapToParkItem);
  }, [rawOutings]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await getOutings(50, 1, { category: "Park" });
        const allOutings: OutingResponse[] = response.outings || [];
        setRawOutings(allOutings);
      } catch (e: any) {
        console.error(e);
      }
    };

    fetchParks();
  }, [getOutings]);

  const silentRefetch = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3333/outing?take=50&page=1&category=Park");
      const data = await res.json();
      const allOutings: OutingResponse[] = data.items || [];
      setRawOutings(allOutings);
    } catch {
      console.warn("silentRefetch parks failed");
    }
  }, []);

  const patchItem = useCallback((updated: OutingResponse) => {
    setRawOutings((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
  }, []);

  return { parksData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useParkData;
