import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import homeImg from "@/assets/homeLogo.png";
import awayImg from "@/assets/awayLogo.png";
import { H2H, H2HFixture } from "@/lib/types/scores";
import { teamImages } from "@/lib/constants/site_images";

export const FixtureH2H = ({ data }: { data: H2H }) => {
  if (!data) {
    return (
      <div className="text-xl h-96 flex items-center justify-center">
        Ooops! No Head to Head Fixtures yet!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FixturesSection
        title={`Recent Fixtures: ${data.home[0].team1_name}`}
        data={data.home}
      />

      <FixturesSection
        title={`Recent Fixtures: ${data.home[0].team2_name}`}
        data={data.away}
      />

      <FixturesSection title="Head to Head" data={data.h2h} />
    </div>
  );
};

const FixturesSection = ({
  title,
  data,
}: {
  title: string;
  data: H2HFixture[];
}) => {
  const [fixtures, setFixtures] = useState<H2HFixture[]>([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (data.length > 5) {
      setFixtures(data.slice(0, 5));
      setShowMore(true);
    } else {
      setFixtures(data);
      setShowMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (fixtures.length === data.length) {
      setShowMore(false);
    }
  }, [data, fixtures]);

  const loadMore = () => {
    setFixtures(data.slice(0, fixtures.length + 5));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-gray-300 p-2">
        <h1 className="text-black text-sm font-semibold">{title}</h1>
      </div>

      <div className="px-3">
        {fixtures.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>

      {showMore && (
        <button
          onClick={loadMore}
          type="button"
          className="text-primary text-sm text-center mt-2 flex justify-center items-center hover:underline"
        >
          load more fixtures{" "}
          <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
        </button>
      )}
    </div>
  );
};

const FixtureCard = ({ fixture }: { fixture: H2HFixture }) => {
  const navigate = useNavigate();

  const homeLogo = teamImages[fixture.team1_id] ?? homeImg;
  const awayLogo = teamImages[fixture.team2_id] ?? awayImg;

  return (
    <div
      className={`grid grid-cols-12 border-b py-3 px-2 font-mono text-xs items-center hover:bg-blue-200 transition-colors cursor-pointer`}
      onClick={() =>
        navigate(
          `/scores/${fixture.fixture_type}/${fixture.league}-${fixture.series}-${fixture.id}`,
        )
      }
    >
      {/* Date and Time - New left column */}
      <div className="col-span-2 flex flex-col items-start justify-center text-black-lighter">
        <div className="text-xs">
          {new Date(fixture.game_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>

        {fixture.game_status === "FT" ? (
          <div className="text-xs text-muted-foreground capitalize">
            {"ended"}
          </div>
        ) : (
          <div className="text-xs text-green-600 capitalize">
            <span className="animate-caret-blink">live</span>
          </div>
        )}
      </div>

      {/* Team 1 - Reduced column span */}
      <div className="col-span-3 flex items-center justify-end gap-2 text-primary">
        <div className="text-end text-xs">{fixture.team1_name}</div>
        <div className="w-8 h-8 relative shrink-0">
          <img
            src={homeLogo}
            alt={fixture.team1_name}
            height={32}
            width={32}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Match status */}
      <div className="col-span-2 flex flex-col items-center justify-center pt-5 text-black-lighter">
        {fixture.game_status === "3" ? (
          <p className="text-sm font-semibold text-muted-foreground">
            Postponed
          </p>
        ) : fixture.game_status === "1" ? (
          <>
            <p className="text-xs font-semibold">
              {fixture.home_score} - {fixture.away_score}
            </p>
            <p className="text-xs text-muted-foreground">Abandoned</p>
          </>
        ) : fixture.game_status === "notstarted" ? (
          <p className="text-xs text-muted-foreground capitalize">vs</p>
        ) : (
          <>
            <p className="text-xs font-semibold">
              {fixture.home_score} - {fixture.away_score}
            </p>
          </>
        )}
      </div>

      {/* Team 2 - Reduced column span */}
      <div className="col-span-4 flex items-center gap-2 text-primary">
        <div className="w-8 h-8 relative shrink-0">
          <img
            src={awayLogo}
            alt={fixture.team2_name}
            height={32}
            width={32}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="text-xs">{fixture.team2_name}</div>
      </div>

      <div className="col-span-1 flex justify-center mt-2 font-bold">
        {fixture.home_score > fixture.away_score ? (
          <span className="p-2 rounded-full bg-green-400">W</span>
        ) : fixture.away_score > fixture.home_score ? (
          <span className="p-2 rounded-full bg-red-400">L</span>
        ) : (
          <span className="p-2 rounded-full bg-amber-400">D</span>
        )}
      </div>
    </div>
  );
};
