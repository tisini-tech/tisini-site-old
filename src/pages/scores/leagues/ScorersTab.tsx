import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import { TopPlayer } from "@/lib/types/leagues";
import { fetchSeasonScorers } from "@/lib/data/FetchLeagueScorers";
import FootballScorers from "@/components/scores/FootballScorers";

const ScorersTab = ({
  tournId,
  season,
  type,
}: {
  tournId: string;
  season: string;
  type: string;
}) => {
  const eventId = type === "football" ? "19" : "253";

  const { data, isError, isLoading } = useQuery({
    queryKey: ["season-scorers", tournId, season, eventId],
    queryFn: () => fetchSeasonScorers(tournId, season, eventId),
    enabled: !!tournId && !!season && !!eventId,
  });

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

  if (data?.items.length <= 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No scorers available
      </div>
    );
  }

  if (type === "football")
    return <FootballScorers players={data.items as TopPlayer[]} />;

  // return <RugbyScorers data={data.items as TopPlayer[]} />;
  return null;
};

export default ScorersTab;
