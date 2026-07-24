import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ResultsTab from "./ResultsTab";
import ScorersTab from "./ScorersTab";
import { Standings } from "../standings/Standings";
import { leagues, SeriesMenu } from "@/components/scores/LeaguesMenu";

const LeaguesPage = () => {
  const { leagueId } = useParams<{ leagueId: string }>();

  const [series, setSeries] = useState<SeriesMenu[]>([]);
  const [season, setSeason] = useState<string>("");
  const [activeTab, setActiveTab] = useState("1");

  const id = leagueId?.split("-").pop();
  const sport = leagueId?.split("-")[0] || "";
  const league = leagues[sport]?.find((l) => l.id === id);

  const tabs = [
    { id: "1", tab: "results" },
    { id: "2", tab: "top scorers" },
    { id: "3", tab: "standings" },
  ];

  useEffect(() => {
    if (league?.series === true) {
      setSeries(league.seasons[0].series);
      setSeason(league.seasons[0].series[0].id);
    } else {
      setSeason(league?.seasons[0]?.id as string);
    }
  }, [league]);

  if (league === undefined) {
    return (
      <div className="h-96 bg-slate-300 flex justify-center items-center font-noto-serif text-2xl">
        No fixture data yet!
      </div>
    );
  }

  return (
    <main className="">
      <nav className="sticky top-0 z-10">
        <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg">
          <div className="container mx-auto">
            {/* Main header section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Logo/League name section */}
                <div
                  // onClick={() => navigate("/scores/leagues/sportpesa-7s")}
                  className="cursor-pointer transition-transform hover:scale-105 flex flex-col items-center md:items-start"
                >
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {league.name}
                  </h1>
                </div>

                {/* Season selector */}
                {league.seasons.length > 1 && (
                  <div className="relative mt-2 md:mt-0">
                    <select
                      className="bg-blue-600 border border-blue-500 text-white text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 p-2 pr-8 shadow-inner cursor-pointer"
                      onChange={(e) =>
                        console.log("Season changed:", e.target.value)
                      }
                    >
                      {league.seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                          {season.season}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Series navigation (if applicable) */}
            {league.series === true && (
              <div className="px-4 pb-3">
                <div className="flex gap-2 p-2 rounded-md bg-blue-800/60 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-700">
                  {series.map((leagueItem) => (
                    <div
                      key={leagueItem.id}
                      onClick={() => setSeason(leagueItem.id)}
                      className={`transition-all duration-200 p-2 px-4 rounded-md whitespace-nowrap text-sm font-medium cursor-pointer shadow-sm ${
                        season === leagueItem.id
                          ? "bg-blue-900 text-yellow-300 font-bold ring-2 ring-yellow-400"
                          : "bg-blue-700 hover:bg-blue-600 text-blue-100"
                      }`}
                    >
                      {leagueItem.serie}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs navigation */}
            <div className="flex border-t border-blue-500/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-center font-medium transition-colors capitalize ${
                    activeTab === tab.id
                      ? "text-white bg-blue-900 border-b-2 border-yellow-400"
                      : "text-blue-100 hover:bg-blue-700"
                  }`}
                >
                  {tab.tab}
                </button>
              ))}
            </div>
          </div>
        </header>
      </nav>

      <section className="p-2">
        {activeTab === "1" && <ResultsTab season={season} />}

        {activeTab === "2" && <ScorersTab season={season} type={league.type} />}

        {activeTab === "3" && <Standings />}
      </section>
    </main>
  );
};

export default LeaguesPage;
