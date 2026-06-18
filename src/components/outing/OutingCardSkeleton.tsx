function OutingCardSkeleton() {
  return (
    <article className="relative flex flex-1 flex-col font-segoe font-semibold max-h-fit rounded-xl border border-gray-50 shadow-lg overflow-hidden bg-gray-50 h-full animate-pulse">
      <div className="relative w-full h-[200px] overflow-hidden bg-gray-300" />

      <div className="w-full bg-gray-50 flex-1 flex flex-col gap-3 p-3">
        <div className="flex justify-between items-start relative">
          <div className="flex flex-col grow gap-2">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-6 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full mt-1" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="flex absolute right-0 top-0 gap-2 items-center">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="h-5 w-20 bg-gray-300 rounded" />
          </div>
          <div className="h-9 w-28 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </article>
  );
}

export default OutingCardSkeleton;
