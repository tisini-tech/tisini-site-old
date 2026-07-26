import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchFixtureDetails,
  fetchLeagueFixtures,
} from "@/lib/data/FetchFootballFixtures";
import { leagues } from "@/lib/constants/site_images";
import Spinner from "@/components/spinner/Spinner";
import { MatchStats, NewFixture } from "@/lib/types/scores";
import FootballStats from "../SingleStream/FootballStats";
import RugbyStats from "../SingleStream/RugbyStats";

const isLive = (status: string) => status === "started";
const isFinished = (status: string) =>
  status === "ended" || status === "FT";
const isUpcoming = (status: string) => status === "notstarted";

const byMatchTime = (a: NewFixture, b: NewFixture) => {
  const aKey = `${a.game_date} ${a.matchtime}`;
  const bKey = `${b.game_date} ${b.matchtime}`;
  return aKey.localeCompare(bKey);
};

/** Prefer live match, else hold last finished until the next kickoff starts. */
const pickActiveFixtureId = (fixtures: NewFixture[]): string | null => {
  const sorted = [...fixtures].sort(byMatchTime);

  const live = sorted.filter((f) => isLive(f.game_status));
  if (live.length) return live[0].id.toString();

  const finished = sorted.filter((f) => isFinished(f.game_status));
  const upcoming = sorted.filter((f) => isUpcoming(f.game_status));

  // Between matches: keep FT on screen until the next fixture goes live
  if (finished.length) return finished[finished.length - 1].id.toString();

  if (upcoming.length) return upcoming[0].id.toString();

  return sorted[0]?.id.toString() ?? null;
};

const LeagueStream = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leagueFixtures"],
    queryFn: fetchLeagueFixtures,
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
  });

  const activeFixture = useMemo(() => {
    if (!data?.length) return null;
    return pickActiveFixtureId(data);
  }, [data]);

  const { data: fixtureDetails, isLoading: fixtureDetailsLoading } = useQuery({
    queryKey: ["fixtureDetails", activeFixture],
    queryFn: () => fetchFixtureDetails(activeFixture!),
    enabled: !!activeFixture,
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const details = fixtureDetails?.fixture;
  const fixType = fixtureDetails?.fixture.fixture_type;

  const defaultLogo = leagues[details?.league as string];

  if (isLoading && !data) {
    return <Spinner />;
  }

  if (!activeFixture) {
    return (
      <main className="pt-16">
        <div className="h-40 flex items-center justify-center text-xl font-bold uppercase">
          Waiting for next match
        </div>
      </main>
    );
  }

  if (fixtureDetailsLoading && !fixtureDetails) {
    return <Spinner />;
  }

  return (
    <main className="pt-16 relative">
      <div className="absolute right-8 top-8">
        {/* <img src={kawowo} alt="kawowo" height={150} width={150} /> */}
      </div>

      <div className="w-[650px] mx-auto relative">
        <h1 className="text-sm font-extrabold text-center uppercase mb-14">
          {details?.game_status === "ended" || details?.game_status === "FT"
            ? "Full Time"
            : (details?.minute == 45 || details?.minute == 7) &&
                details?.game_moment == "secondhalf"
              ? "Half Time"
              : details?.game_status === "notstarted"
                ? details?.matchtime
                : details?.minute}
        </h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-20 p-1 flex justify-center items-center border rounded-lg bg-white">
          <img
            src={defaultLogo}
            alt="league"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex border rounded-full bg-red-500">
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {details?.home_score}
          </div>
          <div className="bg-white w-[600px] p-2 flex font-bold text-blue-800 text-lg uppercase">
            <div className="w-1/2  text-ellipsis whitespace-nowrap">
              {details?.team1_name}
            </div>
            <div className="w-1/4"></div>
            <div className="w-1/2 text-right text-ellipsis whitespace-nowrap">
              {details?.team2_name}
            </div>
          </div>
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {details?.away_score}
          </div>
        </div>
      </div>

      <section className="w-[480px] mx-auto">
        <h1 className="bg-white w-[250px] mx-auto rounded-full text-xl font-bold text-center uppercase m-3">
          Match Statistics
        </h1>

        {fixType === "football" ? (
          <FootballStats data={fixtureDetails?.stats as MatchStats} />
        ) : fixType === "rugby7" ||
          fixType === "rugby15" ||
          fixType === "rugby10" ? (
          <RugbyStats data={fixtureDetails?.stats as MatchStats} />
        ) : (
          <div className="h-20 flex items-center justify-center text-xl">
            Data is coming soon!
          </div>
        )}
      </section>
    </main>
  );
};

export default LeagueStream;
