import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FixtureStats from "./FixtureStats";
import FixtureHeader from "./FixtureHeader";
import FixtureLineups from "./FixtureLineups";
import FixStatsLoader from "../FixStatsLoader";
import FixtureOverview from "./FixtureOverview";
import { EventStats, Highlights, Match, MatchSquads } from "@/lib/types/scores";
import {
  fetchFixtureDetails,
  fetchFixtureLineups,
} from "@/lib/data/FetchFootballFixtures";

const SingleFixture = () => {
  const { fixtureId } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const { data, isLoading } = useQuery(["fixtureDetails", fixtureId], () =>
    fetchFixtureDetails(fixtureId!),
  );

  const { data: lineups, isLoading: lineupsLoading } = useQuery(
    ["fixtureLineups", fixtureId],
    () => fetchFixtureLineups(fixtureId!),
  );

  const tabs = ["Details", "Stats", "Line ups"];

  const details = data?.fixture;
  const home = data?.stats.home;
  const away = data?.stats.away;
  const highlights = data?.highlights;

  const fixType = details?.fixture_type;

  const tabContents = [
    <FixtureOverview
      teams={details as Match}
      highlights={highlights as Highlights[]}
    />,
    <FixtureStats
      home={home as EventStats[]}
      away={away as EventStats[]}
      fixType={fixType as string}
    />,

    <FixtureLineups
      squads={lineups as MatchSquads}
      fixType={fixType as string}
    />,
    // <FixtureH2H data={h2h as H2H} />,
  ];

  if (isLoading || lineupsLoading) {
    return <FixStatsLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-2 border-2 border-indigo-200 text-gray-500">
      <FixtureHeader teamDetails={details as Match} />

      <div className="flex overflow-x-auto gap-1 bg-white p-1 rounded-md">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`p-2 md:p-4 rounded-lg text-gray-700 text-base font-bold flex-grow w-80 hover:bg-gray-300 hover:bg-opacity-40 ${
              activeTab === idx ? "bg-indigo-200" : ""
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-2 text-gray-700 bg-white rounded-md">
        {tabContents[activeTab]}
      </div>
    </div>
  );
};

export default SingleFixture;
