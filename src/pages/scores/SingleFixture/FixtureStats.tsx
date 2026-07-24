import BasketballStats from "@/components/scores/stats/BasketballStats";
import FootballStats from "@/components/scores/stats/FootballStats";
import RugbyStats from "@/components/scores/stats/RugbyStats";
import { EventStats } from "@/lib/types/scores";

type StatsProps = {
  home: EventStats[];
  away: EventStats[];
  fixType: string;
};

const FixtureStats = ({ home, away, fixType }: StatsProps) => {
  if (fixType === "football") {
    return (
      <FootballStats home={home as EventStats[]} away={away as EventStats[]} />
    );
  } else if (fixType === "basketball") {
    return (
      <BasketballStats
        home={home as EventStats[]}
        away={away as EventStats[]}
      />
    );
  }

  return <RugbyStats home={home as EventStats[]} away={away as EventStats[]} />;
};

export default FixtureStats;
