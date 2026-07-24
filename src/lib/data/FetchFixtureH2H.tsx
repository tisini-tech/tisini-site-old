import axios from "axios";
import { H2H } from "../types/scores";

const FetchFixtureH2H = async (
  compId: string,
  seasonId: string,
  fixId: string,
) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<H2H>(
    `${url}/competitions/${compId}/seasons/${seasonId}/fixtures/${fixId}/match-context/`,
    {
      headers: {
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};

export default FetchFixtureH2H;
