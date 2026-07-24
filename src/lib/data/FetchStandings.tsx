import axios from "axios";
import { TournamentStanding } from "../types/scores";

const FetchStandings = async (tournId: string) => {
  const token = import.meta.env.VITE_TOURN_TOKEN;

  const res = await axios.get<TournamentStanding>(
    `https://backend.tisini.co.ke/api/tournament-standings/${token}/?tournament_id=${tournId}`,
  );

  return res.data;
};

export default FetchStandings;
