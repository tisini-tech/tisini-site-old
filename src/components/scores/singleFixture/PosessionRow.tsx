type PosessionProps = {
  homeStat: string;
  stat: string;
  awayStat: string;
};

const PosessionRow = ({ homeStat, stat, awayStat }: PosessionProps) => {
  const total = parseInt(homeStat) + parseInt(awayStat);
  const homePercentage = total === 0 ? 0 : (parseInt(homeStat) / total) * 100;
  const awayPercentage = total === 0 ? 0 : (parseInt(awayStat) / total) * 100;

  return (
    <div className="flex flex-col p-2 ">
      <div className="flex justify-between text-xl font-bold px-1">
        <div>{`${homeStat}%`}</div>
        <div className="text-gray-600">{stat}</div>
        <div>{`${awayStat}%`}</div>
      </div>

      <div className="">
        {/* home bar */}
        <div className="bg-red-300 flex-1 rounded">
          <div className="relative h-10 rounded bg-gray-300">
            <div className="absolute top-0 left-0 h-full w-full rounded-md bg-gray-300"></div>
            <div
              className="absolute top-0 bottom-0 bg-amber-500 "
              style={{ left: `${100 - awayPercentage}%`, right: 0 }}
            ></div>
            <div
              className="absolute top-0 bottom-0 bg-blue-500 "
              style={{ right: `${100 - homePercentage}%`, left: 0 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosessionRow;
