import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchFixtureDetails,
  fetchLeagueFixtures,
} from "@/lib/data/FetchFootballFixtures";
import Spinner from "@/components/spinner/Spinner";
import { MatchDetails, NewFixture } from "@/lib/types/scores";
import { AllMatchStats } from "./MatchStats";
import { useSearchParams } from "react-router-dom";
import { LowerThird } from "./LowerThird";

const isLive = (status: string) =>
  status === "started" || status === "HT" || status === "secondhalf";
const isFinished = (status: string) => status === "ended" || status === "FT";
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
  const [searchParams] = useSearchParams();

  const lowerThird = searchParams.get("lowerThird");

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

  return lowerThird ? (
    <LowerThird data={fixtureDetails as MatchDetails} />
  ) : (
    <AllMatchStats data={fixtureDetails as MatchDetails} />
  );
};

export default LeagueStream;
