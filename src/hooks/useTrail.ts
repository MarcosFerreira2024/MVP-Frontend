import { useMemo } from "react";
import { useOutingsByCategory } from "../hooks/useOutingsByCategory";
import { getFirstPhotoUrl } from "../helpers/getFirstPhoto";
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
    image: getFirstPhotoUrl(outing.photos),
  };
}

const useTrailData = () => {
  const { rawOutings, loading, error, silentRefetch, patchItem } =
    useOutingsByCategory("Trail", 8);

  const trailsData = useMemo<TrailListItem[] | null>(() => {
    if (rawOutings.length === 0) return null;
    return rawOutings
      .filter((outing) => outing.category.name === "Trail" && outing.trail)
      .map(mapToTrailItem);
  }, [rawOutings]);

  return { trailsData, rawOutings, loading, error, silentRefetch, patchItem };
};

export default useTrailData;
