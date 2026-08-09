import axios from "axios";
import { TopEventPlayer, TopScorer } from "../types/leagues";

export const fetchScorers = async (season: string) => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<TopScorer[]>(`${url}?gettoken=${token}`, {
      action: "topPointRefData",
      fixturetype: "rugby7",
      seriesid: season,
    });

    // console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

export const fetchSeasonScorers = async (
  tournId: string,
  season: string,
  eventId: string,
) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const res = await axios.get<TopEventPlayer>(
      `${url}/competitions/${tournId}/seasons/${season}/events/${eventId}/top-performers?page_size=200`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch event scorers, ${error.message}`);
  }
};
