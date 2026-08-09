import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";

import { cn } from "@/lib/cn";
import SingleResult from "./SingleResult";
import FixtureLoader from "../FixtureLoader";
import { FixtureDate, NewFixture } from "@/lib/types/scores";
import {
  fetchFixtureDates,
  fetchNewFootballFixtures,
} from "@/lib/data/FetchFootballFixtures";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const FixturesPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const { fixtureType } = useParams();

  const { data: allDates, isLoading } = useQuery<FixtureDate[]>(
    ["matchDayFixtures", fixtureType],
    async () => {
      return await fetchFixtureDates(fixtureType as string);
    },
  );

  const { data: fixtures, isLoading: fixturesLoading } = useQuery(
    ["matchDayFixtures", fixtureType, selectedDate],
    async () => {
      if (selectedDate) {
        return await fetchNewFootballFixtures(
          fixtureType as string,
          selectedDate,
        );
      }
      return [];
    },
    {
      enabled: !!selectedDate,
    },
  );

  const groupedFixtures = useMemo(() => {
    return groupNewFixtures(fixtures as NewFixture[]);
  }, [fixtures]);

  useEffect(() => {
    if (allDates && allDates.length > 0) {
      setSelectedDate(allDates[0]);
    }
  }, [allDates]);

  if (isLoading || fixturesLoading) {
    return <FixtureLoader />;
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="bg-black-lighter rounded-md p-2 flex gap-2 overflow-x-auto no-scrollbar">
        {allDates?.map((date, key) => {
          const input = new Date(date);
          const monthIdx = input.getMonth();
          const month = months[monthIdx];
          const myArray = date.split("-");

          return (
            <div
              key={key}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "cursor-pointer shrink-0",
                selectedDate === date && "font-bold bg-slate-500 rounded-md",
              )}
            >
              <div className="flex whitespace-nowrap m-2">
                <div className="py-1">
                  {myArray[2]} {month}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {Object.entries(groupedFixtures).map(([league, divisions]) => (
        <div key={league} className="mb-4 p-2">
          <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
            {league}
          </div>

          {Object.entries(divisions).map(([category, fixtures]) => (
            <div key={category} className="mb-4 p-2">
              {category && (
                <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
                  {category}
                </div>
              )}

              {fixtures.map((fixture) => (
                <div key={fixture.id}>
                  <SingleResult fixture={fixture} newFixture={false} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export const groupNewFixtures = (fixtures: NewFixture[]) => {
  const grouped: Record<string, Record<string, NewFixture[]>> = {};

  for (const fixture of fixtures ?? []) {
    const leagueKey = fixture.league_name || fixture.league || "Unknown League";

    const division = (fixture.division_name || fixture.division || "").trim();
    const stage = (fixture.stage_name || fixture.stage || "").trim();

    let groupKey = "";

    if (division && stage) {
      groupKey = `${division} - ${stage}`;
    } else if (division) {
      groupKey = division;
    } else if (stage) {
      groupKey = stage;
    } else {
      groupKey = "";
    }

    grouped[leagueKey] ??= {};
    grouped[leagueKey][groupKey] ??= [];

    grouped[leagueKey][groupKey].push(fixture);
  }

  return grouped;
};
