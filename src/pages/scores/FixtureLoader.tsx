const FixtureLoader = () => {
  return (
    <div className="flex">
      <div className="w-full ">
        <div className="flex justify-evenly bg-gray-400 rounded-md h-12">
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="p-3 animate-pulse">
              <div className="h-6 w-14 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="mb-4 p-2 ">
            <div className="flex flex-col border rounded-xl">
              <div className="font-semibold text-sm bg-gray-400 rounded-md p-1 h-8 flex items-center">
                <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-28 ml-1" />
              </div>

              {Array.from({ length: 3 }, (_, key) => (
                <div
                  key={key}
                  className="text-black border-b grid grid-cols-12 gap-2 p-2"
                >
                  <div className="col-span-5 flex gap-2 items-center justify-end p-2">
                    <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-28" />
                    <div className="bg-gray-300 animate-pulse rounded-full h-8 w-8" />
                  </div>
                  <div className="col-span-2 flex gap-2 items-center justify-center">
                    <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-4" />
                    --
                    <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-4" />
                  </div>
                  <div className="col-span-5 flex gap-2 items-center justify-start">
                    <div className="bg-gray-300 animate-pulse rounded-full h-8 w-8" />
                    <div className="bg-gray-300 animate-pulse rounded-sm h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixtureLoader;
