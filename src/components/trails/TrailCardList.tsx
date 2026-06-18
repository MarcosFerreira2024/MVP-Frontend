import TrailCard from "./TrailCard";
import type { TrailListItem } from "../../hooks/useTrail";

export type TrailCardListProps = {
  data: TrailListItem[];
};

type TrailCardListActions = {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function TrailCardList({ data, onEdit, onDelete }: TrailCardListProps & TrailCardListActions) {
  return (
    <div className="grid gap-20 md:gap-30">
      {data.map((info, index) => {
        const isLeftSide = index % 2 === 0;

        return (
          <div
            key={info.id}
            className={`flex ${isLeftSide ? "justify-start" : "justify-end"}`}
          >
            <TrailCard
              id={info.id}
              data={info.data}
              image={info.image}
              side={isLeftSide ? "left" : "right"}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TrailCardList;
