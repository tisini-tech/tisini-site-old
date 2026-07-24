import { MatchSquads } from "@/lib/types/scores";
import RugbyLineups from "@/components/scores/lineups/RugbyLineups";
import FootballLineups from "@/components/scores/lineups/FootballLineups";

type LineupsProps = {
  squads: MatchSquads;
  fixType: string;
};

const FixtureLineups = ({ squads, fixType }: LineupsProps) => {
  if (fixType === "football") {
    return <FootballLineups squads={squads} />;
  }

  return <RugbyLineups squads={squads} />;
};

export default FixtureLineups;
