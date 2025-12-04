import TrailCard from "./TrailCard";

export type TrailCardListProps = {
  data: {
    data: {
      closeTime: string;
      location: string;
      openHoursText: string;
      openTime: string;
      text: string;
      title: string;
      trailSize: string;
      navigateTo: string;
    };
    image: string;
  }[];
};

function TrailCardList({ data }: TrailCardListProps) {
  return (
    <div className="grid gap-20 md:gap-30">
      {data.map((info, index) => {
        const isLeftSide = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex ${isLeftSide ? "justify-start" : "justify-end"}`}
          >
            <TrailCard
              data={info.data}
              image={info.image}
              side={isLeftSide ? "left" : "right"}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TrailCardList;
