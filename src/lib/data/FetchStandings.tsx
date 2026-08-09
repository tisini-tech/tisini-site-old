import axios from "axios";
import { TournamentStanding } from "../types/scores";

const FetchStandings = async (tournId: string, seasonId: string) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<TournamentStanding>(
    `${url}/competitions/${tournId}/seasons/${seasonId}/standings/`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    },
  );

  return res.data;
};

export default FetchStandings;
