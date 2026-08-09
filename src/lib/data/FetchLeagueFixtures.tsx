import axios from "axios";
import { NewFixture } from "../types/scores";

const fetchSeasonFixtures = async (tournId: string, season: string) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const res = await axios.get<NewFixture[]>(
      `${url}/competitions/${tournId}/seasons/${season}/fixtures`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch fixtures, ${error.message}`);
  }
};

export default fetchSeasonFixtures;
