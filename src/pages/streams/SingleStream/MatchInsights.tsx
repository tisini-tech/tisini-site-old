import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/spinner/Spinner";
import { getEvent } from "@/lib/data/calculations";
import tisiniLogo from "@/assets/img/tisini-logo.png";
import sportpesa7s from "@/assets/tournaments/Sportpesa7s.png";
import { EventStats } from "@/lib/types/scores";
import { fetchFixtureDetails } from "@/lib/data/FetchFootballFixtures";

const MatchInsights = () => {
  const { fixtureId } = useParams();

  const [isAttack, setIsAttack] = useState(true);

  const { data, isLoading } = useQuery(
    ["fixtureDetails", fixtureId],
    () => fetchFixtureDetails(fixtureId!),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAttack((prev) => !prev);
    }, 5000); // change every 5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (isLoading) return <Spinner />;

  const details = data?.fixture;
  const home = data?.stats.home as EventStats[];
  const away = data?.stats.away as EventStats[];

  const hErrors =
    getEvent(home, "149") +
    getEvent(home, "35") +
    getEvent(home, "36") +
    getEvent(home, "86");
  const aErrors =
    getEvent(away, "149") +
    getEvent(away, "35") +
    getEvent(away, "36") +
    getEvent(away, "86");
  console.log(data);

  return (
    <main className="p-10 relative h-screen">
      {details?.fixture_type === "rugby7" && (
        <section className="absolute bottom-24 left-20 mb-1">
          <div
            onClick={() => setIsAttack(!isAttack)}
            className="bg-blue-800 p-2 border border-black text-white flex gap-2 items-center cursor-pointer"
          >
            <img src={tisiniLogo} alt="tisini" className="w-13 h-7" />

            <h4 className="font-bold">Match Insights</h4>
          </div>

          <div className="w-60 grid grid-cols-12 gap-2 text-xs text-center font-semibold bg-slate-300">
            <div className="col-span-5 p-1 whitespace-nowrap overflow-hidden">
              {details?.team1_name}
            </div>
            <div className="col-span-2 p-1 flex items-center pl-4">
              <img src={sportpesa7s} alt="Sportpesa7s" className="h-5" />
            </div>
            <div className="col-span-5 p-1 whitespace-nowrap overflow-hidden">
              {details?.team2_name}
            </div>
          </div>

          {isAttack ? (
            <>
              <RowStat
                home={getEvent(home, "82")}
                stat={"passes"}
                away={getEvent(away, "82")}
              />

              <RowStat
                home={getEvent(home, "58")}
                stat={"carries"}
                away={getEvent(away, "58")}
              />

              <RowStat
                home={getEvent(home, "122")}
                stat={"visit into opp 22"}
                away={getEvent(away, "122")}
              />

              <RowStat
                home={getEvent(home, "37")}
                stat={"line breaks"}
                away={getEvent(away, "37")}
              />

              <RowStat
                home={getEvent(home, "83")}
                stat={"offloads"}
                away={getEvent(away, "83")}
              />
            </>
          ) : (
            <>
              <RowStat
                home={getEvent(home, "56")}
                stat={"tackles"}
                away={getEvent(away, "56")}
              />

              <RowStat
                home={getEvent(home, "57")}
                stat={"missed tackles"}
                away={getEvent(away, "57")}
              />

              <RowStat
                home={getEvent(home, "59")}
                stat={"turnovers won"}
                away={getEvent(away, "59")}
              />

              <RowStat home={hErrors} stat={"handling errors"} away={aErrors} />

              <RowStat
                home={getEvent(home, "60")}
                stat={"penalties"}
                away={getEvent(away, "60")}
              />
            </>
          )}
        </section>
      )}
    </main>
  );
};

const RowStat = ({
  home,
  away,
  stat,
}: {
  home: number;
  away: number;
  stat: string;
}) => {
  return (
    <div className="w-60 grid grid-cols-8 text-xs text-center font-semibold bg-slate-300 border-b-2 border-black">
      <div className="col-span-2 p-1 bg-christie">{home}</div>
      <div className="bg-[#4d3f59] col-span-4 capitalize p-1 text-white">
        {stat}
      </div>
      <div className="col-span-2 p-1 bg-christie">{away}</div>
    </div>
  );
};

export default MatchInsights;
