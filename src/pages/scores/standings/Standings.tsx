import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import homeImg from "@/assets/homeLogo.png";
import { Standing } from "@/lib/types/scores";
import Spinner from "@/components/spinner/Spinner";
import FetchStandings from "@/lib/data/FetchStandings";

export const Standings = () => {
  const { leagueId } = useParams();

  const tournId = leagueId?.split("-").pop() || "";

  const { data, isLoading } = useQuery(["standings", tournId], () =>
    FetchStandings(tournId),
  );

  if (isLoading) {
    return <Spinner />;
  }

  const standings = data?.series[0].standings;

  if (!standings) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        No standings yet!
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
        <div className="col-span-6 flex items-center">
          <span className="w-6 text-center">#</span>
          <span>Team</span>
        </div>
        <div className="col-span-1 text-center">MP</div>
        <div className="col-span-1 text-center">W</div>
        <div className="col-span-1 text-center">D</div>
        <div className="col-span-1 text-center">L</div>
        <div className="col-span-1 text-center">GD</div>
        <div className="col-span-1 text-center font-medium text-blue-600">
          PTS
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {standings?.map((item, idx) => (
          <StandingsRow key={idx} item={item} idx={idx} leagueId={tournId} />
        ))}
      </div>

      {/* Legend Section */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-green-600 text-white text-xs flex items-center justify-center rounded font-medium">
              1
            </span>
            <span className="text-sm text-gray-700">Champions</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center rounded font-medium">
              16
            </span>
            <span className="text-sm text-gray-700">Relegation Play-offs</span>
          </div> */}
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded font-medium">
              {tournId === "26" ? 10 : tournId === "202" ? 17 : 16}
            </span>
            <span className="text-sm text-gray-700">Relegation</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 italic pt-2 border-t border-gray-200">
          If teams finish on equal points at the end of the season, goal
          difference will be the tie-breaker.
        </div>
      </div>
    </div>
  );
};

type RowProps = { item: Standing; idx: number; leagueId: string };

const StandingsRow = ({ item, idx, leagueId }: RowProps) => {
  // Determine row styling based on position for visual hierarchy
  const getRowStyle = (position: number) => {
    if (position === 0) {
      return "border-l-4 bg-green-200 border-l-green-500";
    } else if (
      (leagueId === "202" && idx >= 16) ||
      (leagueId === "205" && idx >= 15) ||
      (leagueId === "26" && idx >= 9)
    ) {
      return "bg-red-100 border-l-4 border-l-red-500";
    }
    // if (position >= 13) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    return "hover:bg-gray-50 transition-colors duration-150";
  };

  const isHomeWinOrDraw = (score: string) => {
    const scores = score.split("-");
    return scores[0] > scores[1] || scores[0] === scores[1];
  };

  return (
    <div
      className={`grid grid-cols-12 px-4 py-3 items-center ${getRowStyle(idx)}`}
    >
      <div className="col-span-6 flex items-center space-x-3">
        <span
          className={`w-6 h-6 flex items-center justify-center text-sm font-medium rounded-full ${
            idx === 0
              ? "bg-green-600 text-white"
              : (leagueId === "202" && idx >= 16) ||
                  (leagueId === "205" && idx >= 15) ||
                  (leagueId === "26" && idx >= 9)
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
          }`}
        >
          {idx + 1}
        </span>
        <img src={homeImg} alt={item.team} className="w-6 h-6 rounded-full" />
        <span className="font-medium text-gray-900 truncate flex-1">
          {item.team}
        </span>

        {item?.live && (
          <div className="flex items-center space-x-2">
            <span
              className="bg-green-800 w-3 h-3 animate-pulse rounded-full"
              aria-label="Live match in progress"
            ></span>
            <span
              className={
                isHomeWinOrDraw(item.live.score)
                  ? "text-green-800 font-medium text-sm"
                  : "text-red-800 font-medium text-sm"
              }
            >
              {item.live.score}
            </span>
          </div>
        )}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.P}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.W}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.D}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.L}
      </div>
      <div className="col-span-1 text-center text-sm font-medium text-gray-700">
        {item.GD}
      </div>
      <div className="col-span-1 text-center text-sm font-bold text-blue-700">
        {item.Pts}
      </div>
    </div>
  );
};
