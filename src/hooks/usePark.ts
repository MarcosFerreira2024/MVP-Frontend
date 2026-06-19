import { useMemo } from "react";
import { useOutingsByCategory } from "../hooks/useOutingsByCategory";
import { getFirstPhotoUrl } from "../helpers/getFirstPhoto";
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
    src: getFirstPhotoUrl(outing.photos),
    to: `/outing/${outing.slug}`,
    name: outing.title,
  };
}

const useParkData = () => {
  const { rawOutings, loading, error, silentRefetch, patchItem } =
    useOutingsByCategory("Park", 50);

  const parksData = useMemo<ParkDisplayItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Park")
      .map(mapToParkItem);
  }, [rawOutings]);

  return { parksData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useParkData;
