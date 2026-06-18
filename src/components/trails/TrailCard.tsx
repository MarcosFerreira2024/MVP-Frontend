import TrailCardInfo, { type TrailCardInfoProps } from "./TrailCardInfo";
import TrailImage from "./TrailImage";

export type TrailCardProps = {
  id: string;
  image: string;
  side: "left" | "right";
  data: TrailCardInfoProps;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function TrailCard({ id, image, side, data, onEdit, onDelete }: TrailCardProps) {
  return (
    <>
      <div className="md:flex hidden gap-10 h-full">
        {side === "left" && <TrailImage id={id} image={image} side={side} onEdit={onEdit} onDelete={onDelete} />}
        <TrailCardInfo {...data} />
        {side === "right" && <TrailImage id={id} image={image} side={side} onEdit={onEdit} onDelete={onDelete} />}
      </div>

      <div className="flex md:hidden flex-col md:items-start items-center gap-6 pb-20 md:flex-row w-full h-full">
        <TrailImage id={id} image={image} side={side} onEdit={onEdit} onDelete={onDelete} />
        <TrailCardInfo {...data} />
      </div>
    </>
  );
}

export default TrailCard;
