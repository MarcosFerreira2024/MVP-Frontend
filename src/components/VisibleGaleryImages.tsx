import React from "react";

function VisibleGaleryImages({
  visibleImages,
  setSelectedImage,
  handleCarouselOpen,
}: {
  handleCarouselOpen: () => void;
  setSelectedImage: React.Dispatch<string>;
  visibleImages: string[];
}) {
  const layout = [
    " max-h-[360px]  col-span-2 row-span-2",
    " max-h-[180px] ",
    " max-h-[180px] ",
    " max-h-[180px]  col-span-2",
    " max-h-[180px] ",
    " max-h-[180px]  col-span-2",
    " max-h-[180px] ",
  ];
  return (
    <div className="grid  grid-cols-4 gap-1">
      {visibleImages.map((item, index) => {
        const isLast = index === visibleImages.length - 1;

        const action = isLast
          ? handleCarouselOpen
          : () => setSelectedImage(item);

        return (
          <div
            key={index}
            onClick={action}
            className={`${layout[index]} ${
              isLast ? "cursor-pointer" : "cursor-zoom-in"
            } relative w-full h-full rounded-md overflow-hidden cursor-pointer hover:grayscale-50 group transition-opacity`}
          >
            <img
              src={item}
              className={`w-full h-full object-cover group-hover:scale-105 duration-200 ease-in-out
  
                `}
            />
            {isLast && (
              <>
                <div className="absolute inset-0 bg-black/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1 w-8 h-8">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-sm" />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default VisibleGaleryImages;
