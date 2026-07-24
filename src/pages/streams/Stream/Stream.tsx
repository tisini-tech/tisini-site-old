import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import StreamFixture from "./StreamFixture";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { FixtureDate } from "@/lib/types/scores";
import Spinner from "@/components/spinner/Spinner";
import {
  fetchFixtureDates,
  fetchNewFootballFixtures,
} from "@/lib/data/FetchFootballFixtures";

export const StreamPage = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const { fixtureType } = useParams();

  const { data, isLoading } = useQuery<FixtureDate[]>(
    ["matchDayFixtures", fixtureType],
    async () => {
      return await fetchFixtureDates(fixtureType as string);
    },
  );

  const { data: fixtures, isLoading: fixLoading } = useQuery(
    ["matchDayFixtures", fixtureType, selectedDate],
    async () => {
      return await fetchNewFootballFixtures(
        fixtureType as string,
        selectedDate,
      );
    },
    {
      enabled: !!selectedDate,
    },
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedDate(data[0]);
    }
  }, [data]);

  if (isLoading || fixLoading) return <Spinner />;

  return (
    <main>
      <MainHeader />

      <section className="max-w-5xl mx-auto min-h-screen">
        {fixtures?.length === 0 ? (
          <div className="h-screen flex items-center justify-center text-3xl">
            No data!
          </div>
        ) : (
          fixtures!.map((fixture) => (
            <div key={fixture.id}>
              <StreamFixture fixture={fixture} />
            </div>
          ))
        )}
      </section>

      <MainFooter />
    </main>
  );
};
