import { Link, useParams } from "react-router-dom";

import homeImg from "@/assets/homeLogo.png";
import awayImg from "@/assets/awayLogo.png";
import { NewFixture } from "@/lib/types/scores";
import { teamImages } from "@/lib/constants/site_images";

const StreamFixture = ({ fixture }: { fixture: NewFixture }) => {
  const { fixtureType } = useParams();

  const homeWin = fixture.home_score > fixture.away_score;
  const awayWin = fixture.away_score > fixture.home_score;
  const isDraw = fixture.home_score === fixture.away_score;

  const homeLogo = teamImages[fixture.team1_id] ?? homeImg;
  const awayLogo = teamImages[fixture.team2_id] ?? awayImg;

  const gameStatus =
    fixture.game_status === "ended" || fixture.game_status === "FT"
      ? "FT"
      : (fixture?.minute === 45 || fixture?.minute === 7) &&
          fixture.game_moment === "secondhalf"
        ? "HT"
        : fixture.minute;

  return (
    <div className="m-1 bg-slate-100 border-b border-gray-300 rounded-md py-3 hover:bg-gray-200 cursor-pointer text-primary flex justify-center items-center transition-colors duration-200">
      <div className="grid grid-cols-12 gap-2 text-sm font-semibold w-4/5">
        <div className="col-span-5 flex gap-2 lg:flex-col flex-row-reverse lg:justify-center items-center">
          <img
            className="w-10 h-10 object-contain"
            src={homeLogo}
            alt={fixture.team1_name}
          />
          <div className="text-gray-600 text-right pr-1 truncate">
            {fixture.team1_name}
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-center">
          {fixture.game_status === "notstarted" ? (
            fixture.matchtime === "" ? (
              <div className="animate-pulse text-gray-500">⌛</div>
            ) : (
              <div className="font-medium text-gray-700">
                {fixture.matchtime}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center font-bold lg:text-3xl text-base">
              <div className="flex items-center">
                <div
                  className={
                    homeWin
                      ? "text-gray-900"
                      : isDraw
                        ? "text-gray-700"
                        : "text-gray-400"
                  }
                >
                  {fixture.home_score}
                </div>
                <div className="mx-1 md:mx-2 text-gray-600">&ndash;</div>
                <div
                  className={
                    awayWin
                      ? "text-gray-900"
                      : isDraw
                        ? "text-gray-700"
                        : "text-gray-400"
                  }
                >
                  {fixture.away_score}
                </div>
              </div>
              {gameStatus && (
                <div className="text-xs font-medium text-gray-500 mt-1">
                  {gameStatus}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="col-span-5 flex gap-2 lg:flex-col flex-row lg:justify-center items-center">
          <img
            className="w-10 h-10 object-contain"
            src={awayLogo}
            alt={fixture.team2_name}
          />
          <div className="text-gray-600 pl-1 truncate">
            {fixture.team2_name}
          </div>
        </div>
      </div>

      <div className="flex flex-col text-xs justify-center items-center gap-2 ml-auto px-2 h-10">
        <div className="flex gap-2">
          <Link
            to={`/streams/${fixtureType}/stats/${fixture.id}`}
            className="text-sm px-3 text-center bg-red-500/90 hover:bg-red-600 text-white py-2 rounded-md transition-colors duration-200"
          >
            Stats
          </Link>
          <Link
            to={`/streams/${fixtureType}/lowerthird/${fixture.id}`}
            className="text-sm px-3 text-center bg-red-500/90 hover:bg-red-600 text-white py-2 rounded-md transition-colors duration-200"
          >
            Lower 3rd
          </Link>
        </div>

        {/* <div className="flex gap-2">
          <Link
            to={`/streams/${fixtureType}/insights/${fixture.id}`}
            className="text-sm px-3 text-center bg-red-500/90 hover:bg-red-500 text-white py-2 rounded-md transition-colors duration-200"
          >
            Insights
          </Link>

          <Link
            to={`/streams/${fixtureType}/history/${fixture.id}`}
            className="text-sm px-3 text-center bg-red-500/90 hover:bg-red-500 text-white py-2 rounded-md transition-colors duration-200"
          >
            History
          </Link>

          <Link
            to={`/streams/${fixtureType}/top-stats/${fixture.id}`}
            className="text-sm px-3 text-center bg-red-500/90 hover:bg-red-500 text-white py-2 rounded-md transition-colors duration-200"
          >
            Top
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default StreamFixture;
