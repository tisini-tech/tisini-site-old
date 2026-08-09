import { useQuery } from "@tanstack/react-query";

import FixtureCard from "./FixtureCard";
import Spinner from "@/components/spinner/Spinner";
import fetchSeasonFixtures from "@/lib/data/FetchLeagueFixtures";
import { NewFixture } from "@/lib/types/scores";

const ResultsTab = ({
  tournId,
  season,
}: {
  tournId: string;
  season: string;
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["season-fixtures", tournId, season],
    queryFn: () => fetchSeasonFixtures(tournId, season),
    enabled: !!season && !!tournId,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  const fixtures = data ?? [];
  const matches = groupFixturesByMatchday(fixtures);

  if (fixtures.length <= 0) {
    return (
      <div className="h-96 bg-slate-300 flex justify-center items-center font-noto-serif text-2xl">
        No fixture data yet!
      </div>
    );
  }

  return (
    <section>
      <div className="space-y-4">
        {Object.entries(matches).map(([round, roundFixtures]) => (
          <div className="border rounded-lg overflow-hidden" key={round}>
            <div className="bg-primary/10 px-4 py-2 border-b">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <span className="font-bold text-primary">{round}</span>
              </h3>
            </div>

            <div className="divide-y md:px-4 bg-gray-100">
              {roundFixtures.map((match) => (
                <FixtureCard key={match.id} fixture={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const groupFixturesByMatchday = (fixtures: NewFixture[]) => {
  const grouped: Record<string, NewFixture[]> = {};

  for (const fixture of fixtures) {
    const round = fixture.matchday?.trim() || "Fixtures";

    if (!grouped[round]) {
      grouped[round] = [];
    }

    grouped[round].push(fixture);
  }

  return grouped;
};

export default ResultsTab;
