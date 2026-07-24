import React, { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import tisiniLogo from "@/assets/img/tisini-logo.png";
import { fetchScorers } from "@/lib/data/FetchLeagueScorers";

const TopStats = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const queries = useQueries({
    queries: [
      {
        queryKey: ["rugbyScorers", "103"],
        queryFn: () => fetchScorers("103"),
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["rugbyScorers", "104"],
        queryFn: () => fetchScorers("104"),
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["rugbyScorers", "111"],
        queryFn: () => fetchScorers("111"),
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
      },
    ],
  });

  const isLoading = queries.some((query) => query.isLoading);

  const driftWood = queries[0].data?.sort(
    (a, b) => parseInt(b.totalpoints) - parseInt(a.totalpoints)
  );
  const prinsloo = queries[1].data?.sort(
    (a, b) => parseInt(b.totalpoints) - parseInt(a.totalpoints)
  );
  const christie = queries[2].data?.sort(
    (a, b) => parseInt(b.totalpoints) - parseInt(a.totalpoints)
  );

  const data = [
    { name: "driftwood", players: driftWood },
    { name: "prinsloo", players: prinsloo },
    { name: "christie", players: christie },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <Spinner />;

  const currentData = data[currentIdx];

  return (
    <main className="p-10 relative h-screen">
      <section className="absolute bottom-24 left-20 mb-1">
        <div className="bg-blue-800 p-2 border border-black text-white flex gap-2 items-center ">
          <img src={tisiniLogo} alt="tisini" className="w-13 h-7" />

          <div className="font-bold capitalize">
            <h3>{currentData.name}</h3>
            <h4 className="text-xs">Top point scorers</h4>
          </div>
        </div>

        {currentData.players?.slice(0, 7).map((player, idx) => (
          <div
            key={player.playerid}
            className="grid grid-cols-12 border-b-2 border-black bg-gray-100 font-semibold text-xs p-1"
          >
            <div className="col-span-1">{idx + 1}</div>
            <div className="col-span-9 capitalize">{player.playername}</div>
            <div className="col-span-2 text-end">{player.totalpoints}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default TopStats;
