import RatingCard from "./RatingCard";
import Scrollable from "../Scrollable";
import type { Rating } from "../../types/Outing";

export type RatingListProps = {
  data?: Rating[];
  onDeleteSuccess?: (ratingId: string) => void;
  onEdit?: (rating: Rating) => void;
  outingId: string;
};

function RatingList({ data, onDeleteSuccess, onEdit, outingId }: RatingListProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <Scrollable className="flex flex-col gap-3" height={150 * 2.2}>
          {data.map((item) => (
            <RatingCard key={item.id} ratingData={item} onDeleteSuccess={onDeleteSuccess} onEdit={onEdit} outingId={outingId} />
          ))}
        </Scrollable>
      ) : (
        <p className="text-xl text-main">Ninguém avaliou esse passeio ainda</p>
      )}
    </>
  );
}

export default RatingList;
