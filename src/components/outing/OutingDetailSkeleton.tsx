function OutingDetailSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="w-full grid grid-cols-2 px-4 py-20 gap-10 max-w-[1120px] mx-auto pt-8">
        <div className="col-span-full">
          <div className="grid grid-cols-4 gap-1">
            <div className="h-[360px] col-span-2 row-span-2 bg-gray-300 rounded-md" />
            <div className="h-[180px] bg-gray-300 rounded-md" />
            <div className="h-[180px] bg-gray-300 rounded-md" />
            <div className="h-[180px] col-span-2 bg-gray-300 rounded-md" />
            <div className="h-[180px] bg-gray-300 rounded-md" />
            <div className="h-[180px] col-span-2 bg-gray-300 rounded-md" />
            <div className="h-[180px] bg-gray-300 rounded-md" />
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2 font-semibold font-segoe">
          <div className="h-9 bg-gray-300 rounded w-3/4" />
          <div className="space-y-2 max-w-[500px]">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="flex flex-wrap max-w-[250px] gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col min-w-[100px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <div className="bg-gray-300 rounded-md min-h-[300px] w-full" />
        </div>

        <div className="flex col-span-full">
          <div className="flex flex-col gap-2 w-full justify-between min-h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="h-5 w-32 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-3 h-full max-h-[150px] w-full py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="ml-auto h-4 w-12 bg-gray-300 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 w-48 bg-gray-300 rounded-lg mt-2" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default OutingDetailSkeleton;
