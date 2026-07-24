import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import RugbyScorers from "@/components/scores/RugbyScorers";
import { BallScorer, TopScorer } from "@/lib/types/leagues";
import fetchSeasonScorers from "@/lib/data/FetchLeagueScorers";
import FootballScorers from "@/components/scores/FootballScorers";

const ScorersTab = ({ season, type }: { season: string; type: string }) => {
  const { data, isError, isLoading } = useQuery(
    ["season-scorers", season],
    () => fetchSeasonScorers(season, type)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-destructive">
        Failed to load player data. Please try again later.
      </div>
    );
  }

  if (data?.length <= 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No scorers available
      </div>
    );
  }

  if (type === "football")
    return <FootballScorers players={data as BallScorer[]} />;

  return <RugbyScorers data={data as TopScorer[]} />;
};

export default ScorersTab;
