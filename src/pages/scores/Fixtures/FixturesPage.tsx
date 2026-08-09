import { useParams } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/cn";
import { Fixture, NewFixture } from "@/lib/types/scores";
import FixtureLoader from "../FixtureLoader";
import SingleResult from "./SingleResult";
import {
  fetchNewFootballFixtures,
  matchDayFixtures,
} from "@/lib/data/FetchFootballFixtures";
import { mapFixtureToNewFixture } from "@/lib/data/mapNewFixtureToFixture";

const FixturesPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [index, setIndex] = useState<number>(5);

  //   get previous 7 days
  const previousDays = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    return date.toISOString().split("T")[0];
  }).reverse();

  //   get next 7 days
  const nextDays = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  }).slice(1, 4);

  const allDates = [...previousDays, ...nextDays];

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

  const selectedDate = allDates[index];

  const { fixtureType } = useParams();

  console.log(fixtureType);

  const { data, isLoading } = useQuery<Fixture[]>(
    ["matchDayFixtures", fixtureType, selectedDate],
    async () => {
      // If fixtureType is "rugby", fetch both rugby7s and rugby15s
      if (fixtureType === "rugby") {
        const [rugby7sData, rugby15sData] = await Promise.all([
          matchDayFixtures("rugby7", selectedDate),
          matchDayFixtures("rugby15", selectedDate),
        ]);
        // Combine both arrays
        return [...rugby7sData, ...rugby15sData];
      }
      // Otherwise, fetch normally
      return matchDayFixtures(fixtureType as string, selectedDate);
    },
  );

  const { data: newData, isLoading: newFixturesLoading } = useQuery<
    NewFixture[]
  >(["newFixtures", fixtureType, today], async () => {
    return fetchNewFootballFixtures(fixtureType as string, today);
  });

  /** Empty string = no branch; render skips the branch heading for that bucket. */
  const branchedFixtures = useMemo(() => {
    const grouped: Record<string, Record<string, NewFixture[]>> = {};

    for (const fixture of newData || []) {
      const league = fixture.league_name || fixture.league;
      const branchLabel = (fixture.branch_name || fixture.branch || "").trim();
      const branchKey = branchLabel || "";

      if (!grouped[league]) {
        grouped[league] = {};
      }
      if (!grouped[league][branchKey]) {
        grouped[league][branchKey] = [];
      }
      grouped[league][branchKey].push(fixture);
    }

    return grouped;
  }, [newData]);

  const fixtures = useMemo<Record<string, Fixture[]>>(() => {
    const grouped: Record<string, Fixture[]> = {};

    for (const fixture of data || []) {
      let league = fixture.league;

      if (
        fixture.fixture_type === "rugby7" ||
        fixture.fixture_type === "rugby15"
      ) {
        league = `${fixture.league} - ${fixture.matchday}`;
      }

      if (!grouped[league]) {
        grouped[league] = [];
      }

      grouped[league].push(fixture);
    }

    return grouped;
  }, [data]);

  const diamondFixtures = useMemo(() => {
    const dFixtures: Record<string, Fixture[]> = {};

    for (const fixture of fixtures["Diamond League"] || []) {
      const cat = fixture.team1_name.split(" ").at(-1) || "U";

      if (!dFixtures[cat]) {
        dFixtures[cat] = [];
      }
      dFixtures[cat].push(fixture);
    }

    return dFixtures;
  }, [fixtures]);

  if (isLoading || newFixturesLoading) return <FixtureLoader />;

  return (
    <section className="flex">
      <div className="w-full">
        <div className="bg-black-lighter rounded-md p-2 flex justify-evenly gap-2 overflow-x-auto">
          {allDates.map((date, key) => {
            const input = new Date(date);
            const monthIdx = input.getMonth();
            const month = months[monthIdx];
            const myArray = date.split("-");

            return (
              <div
                key={key}
                onClick={() => setIndex(key)}
                className={cn(
                  "cursor-pointer",
                  index === key ? "font-bold bg-slate-500 rounded-md" : "",
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

        {data?.length === 0 && newData?.length === 0 ? (
          <div className="h-96 bg-slate-400 flex items-center justify-center text-3xl mt-2 rounded-md">
            No data!
          </div>
        ) : (
          Object.entries(fixtures).map(([league, fixtures]) => {
            console.log(league);

            if (league === "Diamond League") {
              return (
                <div key={league} className="mb-4 p-2">
                  <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
                    {league}
                  </div>

                  {Object.entries(diamondFixtures).map(
                    ([category, fixtures]) => (
                      <div key={category} className="mb-4 p-2">
                        <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
                          {category}
                        </div>

                        {fixtures.map((fixture) => (
                          <div key={fixture.id}>
                            <SingleResult
                              fixture={mapFixtureToNewFixture(fixture)}
                              newFixture={false}
                            />
                          </div>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              );
            }

            return (
              <div key={league} className="mb-4 p-2">
                <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
                  {league}
                </div>

                {fixtures.map((fixture) => (
                  <div key={fixture.id}>
                    <SingleResult
                      fixture={mapFixtureToNewFixture(fixture)}
                      newFixture={false}
                    />
                  </div>
                ))}
              </div>
            );
          })
        )}

        {Object.entries(branchedFixtures).map(([league, branches]) => (
          <div key={league} className="mb-4 p-2">
            <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
              {league}
            </div>

            {Object.entries(branches).map(([branchKey, fixtures]) => (
              <div key={branchKey || `${league}-fixtures`} className="mb-4 p-2">
                {branchKey ? (
                  <div className="font-semibold text-sm bg-black-lighter rounded-md p-1">
                    {branchKey}
                  </div>
                ) : null}

                {fixtures.map((fixture) => (
                  <div key={fixture.id}>
                    <SingleResult fixture={fixture} newFixture={true} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FixturesPage;
