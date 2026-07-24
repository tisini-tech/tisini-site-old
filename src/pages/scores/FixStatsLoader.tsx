const FixStatsLoader = () => {
  return (
    <div className=" bg-gray-100 rounded-lg p-2 border-2 border-indigo-200 text-gray-500">
      <div className="space-y-1">
        <div className="flex items-center justify-between h-12 border-b border-black">
          <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-24" />
          <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-40" />
          <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-24" />
        </div>

        <div className="h-20 grid grid-cols-12">
          <div className="col-span-5 flex flex-col gap-2 justify-center items-center">
            <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10" />
            <div className="bg-gray-300 animate-pulse rounded-sm h-3 w-28" />
          </div>
          <div className="col-span-2 flex gap-2 items-center justify-center">
            <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-4" />
            --
            <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-4" />
          </div>
          <div className="col-span-5 flex flex-col gap-2 justify-center items-center">
            <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10" />
            <div className="bg-gray-300 animate-pulse rounded-sm h-3 w-28" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-between p-1 px-2 h-12 bg-white rounded-md">
        <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-1/3" />
        <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-1/3" />
        <div className="bg-gray-300 animate-pulse rounded-sm h-8 w-1/3" />
      </div>

      <div className="mt-2 bg-white rounded-md pt-1">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center m-2 rounded-md p-2"
          >
            <div className="bg-gray-300 animate-pulse rounded-sm h-5 w-1/3" />
            <div className="flex gap-1 w-full">
              <div className="border bg-gray-300 animate-pulse w-1/2 h-5 rounded-sm"></div>
              <div className="border bg-gray-300 animate-pulse w-1/2 h-5 rounded-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixStatsLoader;
