import OutingCardSkeleton from "./OutingCardSkeleton";

function TwoRowsCarouselSkeleton() {
  const skeletons = Array.from({ length: 4 }, (_, i) => (
    <div key={i} className="carousel-item snap-start snap-always">
      <OutingCardSkeleton />
    </div>
  ));

  return (
    <div className="w-full animate-pulse">
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <div className="rounded-full w-8 h-8 bg-gray-300" />
          <div className="rounded-full w-8 h-8 bg-gray-300" />
        </div>
      </div>

      <div className="relative overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth p-4">
        <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-0.5rem)] lg:auto-cols-[calc(33.333%-0.667rem)] 2xl:auto-cols-[calc(25%-0.75rem)] gap-4">
          {skeletons}
        </div>
      </div>

      <div className="relative overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth p-4">
        <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-0.5rem)] lg:auto-cols-[calc(33.333%-0.667rem)] 2xl:auto-cols-[calc(25%-0.75rem)] gap-4">
          {skeletons}
        </div>
      </div>
    </div>
  );
}

export default TwoRowsCarouselSkeleton;
