import { MatchSquads } from "@/lib/types/scores";
import AwayPlayer from "@/components/scores/lineups/AwayPlayer";
import HomePlayer from "@/components/scores/lineups/HomePlayer";

type LineUpsProps = {
  squads: MatchSquads;
};

const RugbyLineups = ({ squads }: LineUpsProps) => {
  const homePlayers = squads?.home || [];
  const awayPlayers = squads?.away || [];

  return (
    // first 11
    <div className="flex flex-col space-y-2 p-2">
      {/* header */}
      <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
        {"Starting Players"}
      </div>

      {/* home players */}
      <div className="flex justify-between p-2">
        <div>
          {homePlayers.map((player) => (
            <div key={player.player}>
              {player.player_type === "first11" && (
                <HomePlayer
                  name={player.pname}
                  jersey={player.jersey_no.toString()}
                />
              )}
            </div>
          ))}
        </div>

        {/* away players */}
        <div>
          {awayPlayers.map((player) => (
            <div key={player.player}>
              {player.player_type === "first11" && (
                <AwayPlayer
                  name={player.pname}
                  jersey={player.jersey_no.toString()}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* subs section */}
      <div>
        <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
          {"Substitutes"}
        </div>

        <div className="flex justify-between p-2">
          <div>
            {homePlayers.map((player) => (
              <div key={player.player}>
                {player.player_type === "sub" && (
                  <HomePlayer
                    name={player.pname}
                    jersey={player.jersey_no.toString()}
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            {awayPlayers.map((player) => (
              <div key={player.player}>
                {player.player_type === "sub" && (
                  <AwayPlayer
                    name={player.pname}
                    jersey={player.jersey_no.toString()}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RugbyLineups;
