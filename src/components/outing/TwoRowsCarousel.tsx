import { OutingCard } from "./OutingCard";
import useTwoRowsCarousel from "../../hooks/useTwoRowsCarousel";

export type OutingCarouselItem = {
  rating: string;
  ratingCount: number;
  title: string;
  description: string;
  price: string;
  to: string;
  images: string[];
};

type TwoRowsCarouselProps = {
  items: OutingCarouselItem[];
};

export function TwoRowsCarousel({ items }: TwoRowsCarouselProps) {
  const {
    balancedBottomRowItems,
    canScrollLeft,
    canScrollRight,
    handleNext,
    handlePrevious,
    syncScroll,
    bottomRowRef,
    topRowItems,
    topRowRef,
  } = useTwoRowsCarousel(items);

  const renderRow = (rowItems: (OutingCarouselItem | null)[]) => {
    return (
      <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-0.5rem)] lg:auto-cols-[calc(33.333%-0.667rem)] 2xl:auto-cols-[calc(25%-0.75rem)] gap-4">
        {rowItems.map((item, idx) => (
          <div key={idx} className="carousel-item snap-start snap-always">
            {item ? (
              <OutingCard {...item} />
            ) : (
              <div
                className="w-full opacity-0 pointer-events-none"
                aria-hidden="true"
              >
                <OutingCard
                  rating="0"
                  ratingCount={0}
                  title="Placeholder"
                  description="Placeholder"
                  price="R$ 0"
                  to="/"
                  images={["/placeholder.svg?height=400&width=600"]}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full ">
      <div className="flex justify-end items-center ">
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!canScrollLeft}
            aria-label="Anterior"
          ></button>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!canScrollRight}
            aria-label="Próximo"
          ></button>
        </div>
      </div>

      <div
        ref={topRowRef}
        className="relative overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth p-4"
        onScroll={() => syncScroll("top")}
      >
        {renderRow(topRowItems)}
      </div>

      <div
        ref={bottomRowRef}
        className="relative overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth p-4"
        onScroll={() => syncScroll("bottom")}
      >
        {renderRow(balancedBottomRowItems)}
      </div>
    </div>
  );
}
