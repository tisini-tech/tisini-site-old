import axios from "axios";
import { Fixture } from "../types/leagues";

const fetchSeasonFixtures = async (season: string) => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<Fixture[]>(`${url}?gettoken=${token}`, {
      action: "fixtures",
      seasonid: season,
    });

    // console.log(res);
    if (!Array.isArray(res.data)) {
      throw new Error("Invalid response format: expected an array");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch leagues, ${error.message}`);
  }
};

export default fetchSeasonFixtures;
