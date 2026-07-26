import React, { useEffect, useMemo, useState } from "react";
import { footballStats, rugbyStats } from "../SingleStream/LowerThirdStats";
import { MatchDetails } from "@/lib/types/scores";
import tisini from "@/assets/img/tisini-logo.png";

interface Stat {
  stat: string;
  home: string | number;
  away: string | number;
}

type StatsArray = Stat[];

export const LowerThird = ({ data }: { data: MatchDetails }) => {
  const fixType = data?.fixture.fixture_type;

  const [currentStats, setCurrentStats] = useState<StatsArray>([
    { stat: "Tries", home: "-", away: "-" },
  ]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const stats = useMemo(() => {
    if (!data) return [];

    return fixType === "football"
      ? footballStats(data.stats)
      : rugbyStats(data.stats);
  }, [fixType, data]);

  useEffect(() => {
    if (!stats.length) return;
    const safeIndex = index % stats.length;
    setCurrentStats([stats[safeIndex]]);
    if (safeIndex !== index) setIndex(safeIndex);
  }, [stats, index]);

  useEffect(() => {
    if (!stats.length) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        const nextIndex = (index + 1) % stats.length;
        setCurrentStats([stats[nextIndex]]);
        setIndex(nextIndex);
        setFade(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, stats]);

  const details = data?.fixture;
  const active = currentStats[0] ?? { stat: "-", home: "-", away: "-" };

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Raised for broadcast safe area; side padding matches original framing */}
      <div className="absolute inset-x-0 bottom-[6vh] w-full px-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center bg-[#023270] px-2">
          <div className="mx-auto flex w-4/5 min-w-0 items-center gap-1">
            <div className="flex h-11 min-w-0 flex-[1] items-center justify-center truncate rounded-sm bg-red-500 px-3 text-base font-bold leading-none text-white">
              <span className="truncate">{details?.team1_name}</span>
            </div>

            <div
              className={`mx-auto flex h-11 min-w-0 flex-[1.6] items-stretch gap-1 transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex w-16 shrink-0 items-center justify-center rounded-sm border bg-white text-base font-semibold leading-none text-blue-800">
                {active.home}
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center truncate rounded-sm bg-primary px-3 text-sm font-bold uppercase leading-none text-white">
                <span className="truncate">{active.stat}</span>
              </div>
              <div className="flex w-16 shrink-0 items-center justify-center rounded-sm border bg-white text-base font-semibold leading-none text-blue-800">
                {active.away}
              </div>
            </div>

            <div className="flex h-11 min-w-0 flex-[1] items-center justify-center truncate rounded-sm bg-yellow-500 px-3 text-base font-bold leading-none text-black">
              <span className="truncate">{details?.team2_name}</span>
            </div>
          </div>

          <div className="ml-2 h-12 w-24 shrink-0">
            <img
              src={tisini}
              alt="Tisini"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
