import React from "react";
import RatingCard from "./RatingCard";
import Scrollable from "../Scrollable";
import type { Rating } from "../../types/Outing"; // Import from central types

export type RatingListProps = {
  data?: Rating[];
  onDeleteSuccess?: () => void; // Add onDeleteSuccess to props
  outingId: string; // Add outingId to props
};

function RatingList({ data, onDeleteSuccess, outingId }: RatingListProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <Scrollable className="flex flex-col gap-3" height={150 * 2.2}>
          {data.map((item) => (
            <RatingCard key={item.id} ratingData={item} onDeleteSuccess={onDeleteSuccess} outingId={outingId} />
          ))}
        </Scrollable>
      ) : (
        <p className="text-xl text-main">Ninguém avaliou esse passeio ainda</p>
      )}
    </>
  );
}

export default RatingList;
