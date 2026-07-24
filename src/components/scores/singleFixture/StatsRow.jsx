const StatsRow = ({
  homeStat,
  stat,
  awayStat,
  homeOnly,
  awayOnly,
  bothTeams,
}) => {
  const total = homeStat + awayStat;
  const homePercentage = total === 0 ? 0 : (homeStat / total) * 100;
  const awayPercentage = total === 0 ? 0 : (awayStat / total) * 100;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between text-xl font-bold px-1">
        <div>{bothTeams || homeOnly ? homeStat : "-"}</div>
        <div className="text-gray-600">{stat}</div>
        <div>{bothTeams || awayOnly ? awayStat : "-"}</div>
      </div>

      <div className="flex justify-evenly space-x-1 ">
        {/* home bar */}
        <div className="bg-red-300 flex-1 rounded">
          <div className="relative h-4 rounded bg-gray-300">
            <div className="absolute top-0 left-0 h-full w-full rounded bg-gray-300"></div>
            <div
              className="absolute top-0 bottom-0 bg-blue-500 rounded"
              style={{ left: `${100 - homePercentage}%`, right: 0 }}
            ></div>
          </div>
        </div>

        {/* away bar */}
        <div className="bg-red-300 flex-1 rounded">
          <div className="relative h-4 rounded bg-gray-300">
            <div className="absolute top-0 left-0 h-full w-full rounded bg-gray-300"></div>
            <div
              className="absolute top-0 bottom-0 bg-amber-500 rounded"
              style={{ right: `${100 - awayPercentage}%`, left: 0 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsRow;
