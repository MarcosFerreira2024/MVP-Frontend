function TrailCardSkeleton({ side }: { side: "left" | "right" }) {
  const isLeftSide = side === "left";
  const rotateClass = isLeftSide ? "-rotate-[8deg] origin-top-right" : "rotate-[8deg] origin-top-left";

  return (
    <>
      <div className="md:flex hidden gap-10 h-full animate-pulse">
        {isLeftSide && (
          <div className={`relative z-10 h-[500px] w-[500px] bg-gray-300 rounded-lg ${rotateClass}`} />
        )}
        <div className="font-segoe font-semibold flex flex-col flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-w-[400px]">
              <div className="h-9 bg-gray-300 rounded w-3/4" />
              <div className="space-y-2 mt-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
            <div className="flex flex-wrap max-w-[300px] gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
            <div className="flex self-end">
              <div className="h-10 w-32 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
        {!isLeftSide && (
          <div className={`relative z-10 h-[500px] w-[500px] bg-gray-300 rounded-lg ${rotateClass}`} />
        )}
      </div>

      <div className="flex md:hidden flex-col items-center gap-6 pb-20 w-full h-full animate-pulse">
        <div className="relative z-10 h-[300px] w-full max-w-[500px] bg-gray-300 rounded-lg" />
        <div className="font-segoe font-semibold flex flex-col w-full max-w-[500px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-8 bg-gray-300 rounded w-3/4" />
              <div className="space-y-2 mt-1">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
            <div className="flex self-end">
              <div className="h-10 w-32 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TrailCardListSkeleton() {
  const SKELETON_COUNT = 8;

  return (
    <div className="grid gap-20 md:gap-30">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => {
        const isLeftSide = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex ${isLeftSide ? "justify-start" : "justify-end"}`}
          >
            <TrailCardSkeleton side={isLeftSide ? "left" : "right"} />
          </div>
        );
      })}
    </div>
  );
}

export default TrailCardListSkeleton;
