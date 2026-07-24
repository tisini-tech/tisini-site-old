import { BallScorer } from "@/lib/types/leagues";
import React from "react";

const FootballScorers = ({ players }: { players: BallScorer[] }) => {
  const scorers = players.filter((p) => p.playername !== "Own Goal ");

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/30 font-bold">
              <tr>
                <th className="px-6 py-3 text-left text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Player
                </th>
                {/* <th className="px-3 py-3 text-right text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Tries
                </th>
                <th className="px-3 py-3 text-right text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Conversions
                </th>
                <th className="hidden sm:table-cell px-3 py-3 text-right text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Penalties
                </th>
                <th className="hidden sm:table-cell px-3 py-3 text-right text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Drop Goals
                </th> */}
                <th className="px-6 py-3 text-right text-xs bg-primary/30 text-primary uppercase tracking-wider">
                  Goals
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {scorers?.map((player) => (
                <tr
                  key={player.playerid}
                  className="hover:bg-primary/10 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                        {player.playername[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground capitalize text-primary">
                          {player.playername}
                        </div>
                        <div className="text-sm text-gray-500">
                          {player.teamname}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-3 py-4 whitespace-nowrap text-center font-bold">
                    {player.trys ?? "-"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-center text-secondary-foreground font-bold">
                    {player.conversion === 0 ? "-" : player.conversion}
                  </td>
                  <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-center font-bold">
                    {player.penalty === 0 ? "-" : player.penalty}
                  </td>
                  <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-center font-bold">
                    {player.dropgoal ?? "-"}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-primary font-bold">
                    {player.goal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FootballScorers;
