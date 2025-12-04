import TrailCardInfo, { type TrailCardInfoProps } from "./TrailCardInfo";
import TrailImage from "./TrailImage";

export type TrailCardProps = {
  image: string;
  side: "left" | "right";
  data: TrailCardInfoProps;
};

function TrailCard({ image, side, data }: TrailCardProps) {
  return (
    <>
      <div className="md:flex hidden gap-10 h-full">
        {side === "left" && <TrailImage image={image} side={side} />}
        <TrailCardInfo {...data} />
        {side === "right" && <TrailImage image={image} side={side} />}
      </div>

      <div className="flex md:hidden flex-col md:items-start items-center gap-30 pb-20 md:flex-row w-full h-full">
        <TrailImage image={image} side={side} />
        <TrailCardInfo {...data} />
      </div>
    </>
  );
}

export default TrailCard;
