import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Spinner from "@/components/spinner/Spinner";
import { footballStats, rugbyStats } from "./LowerThirdStats";

// import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini-logo.png";
import { fetchFixtureDetails } from "@/lib/data/FetchFootballFixtures";
// import league from "@/assets/img/nile-special.png";

interface Stat {
  stat: string;
  home: string | number;
  away: string | number;
}

type StatsArray = Stat[];

export const LowerThird = () => {
  const { fixtureId } = useParams();

  const { data, isLoading, refetch } = useQuery(
    ["fixtureDetails", fixtureId],
    () => fetchFixtureDetails(fixtureId!),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    if (
      data?.fixture.game_status === "ended" ||
      data?.fixture.game_status === "FT"
    ) {
      refetch({ cancelRefetch: true });
    }
  }, [data, refetch]);

  const fixType = data?.fixture.fixture_type;

  const [currentStats, setCurrentStats] = useState<StatsArray>([
    { stat: "Tries", home: "-", away: "-" },
  ]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (data?.fixture.game_status === "ended") {
      refetch({ cancelRefetch: true });
    }
  }, [data, refetch]);

  const stats = useMemo(() => {
    if (data) {
      const statsList =
        fixType === "football"
          ? footballStats(data.stats)
          : rugbyStats(data.stats);

      return statsList;
    }

    return [];
  }, [fixType, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out
      setTimeout(() => {
        const nextIndex = (index + 1) % stats.length;
        setCurrentStats([stats[nextIndex]]);
        setIndex(nextIndex);
        setFade(false); // Start fade-in
      }, 300); // Delay content change until fade-out is done
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [index, stats]);

  if (isLoading) return <Spinner />;

  const details = data?.fixture;
  // const scores = data?.scores;

  return (
    <main className="pt-10 relative h-screen">
      {/* {details?.game_status !== "notstarted" && (
        <div className="pl-10 font-bold ">
          <div className="flex gap-3 items-center bg-[#023270] w-fit rounded-md">
            <div className="bg-red-500 p-2 rounded-md">
              {details?.team1_id === "1956" ? "KCB" : "Home"}
            </div>
            <div className="font-catamaran text-2xl text-white">
              {scores?.Home} - {scores?.Away}
            </div>
            <div className="bg-yellow-500 p-2 rounded-md text-white">
              {details?.team2_id === "1954" ? "OIL" : "Away"}
            </div>
          </div>
        </div>
      )} */}

      <div className="absolute bottom-0 w-full mb-1">
        <div className="max-w-7xl h-12 mx-auto flex items-center bg-[#023270] ">
          {/* <div className="bg-black h-full w-12 flex items-center justify-center">
          <span className="text-white text-xl font-bold">HT</span>
        </div> */}
          <div className="flex gap-1 w-4/5 mx-auto">
            <div className="flex items-center w-1/4 justify-center rounded-sm text-white font-bold bg-red-500 text-ellipsis whitespace-nowrap">
              {details?.team1_name}
            </div>
            <div
              className={`flex h-8 w-2/3 mx-auto transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-1/4 border flex items-center justify-center font-semibold text-blue-800 bg-white rounded-sm">
                {`${currentStats[0].home}`}
              </div>
              <div className="w-1/2 mx-1 flex justify-center items-center text-nowrap text-xs text-white font-bold uppercase rounded-sm bg-primary">
                {`${currentStats[0].stat}`}
              </div>
              <div className="w-1/4 border flex items-center justify-center font-semibold text-blue-800 bg-white rounded-sm">
                {`${currentStats[0].away}`}
              </div>
            </div>
            <div className="flex items-center w-1/4 justify-center rounded-sm font-bold bg-yellow-500 text-ellipsis whitespace-nowrap">
              {details?.team2_name}
            </div>
          </div>

          <div className="w-20 h-10">
            <img src={tisini} alt="Tisini" className="w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
};
