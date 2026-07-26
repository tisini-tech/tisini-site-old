import axios from "axios";
import {
  Fixture,
  FixtureDate,
  MatchDetails,
  MatchSquads,
  NewFixture,
} from "../types/scores";

const fetchFootballFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=football",
  );

  return res.data;
};

export default fetchFootballFixtures;

export const matchDayFixtures = async (fixType: string, matchDay: string) => {
  const res = await axios.get<Fixture[]>(
    `https://apis.tisini.co.ke/apiagent11.php?fixture=all&fixtype=${fixType}&gamedate=${matchDay}`,
  );

  return res.data;
};

export const fetchNewFootballFixtures = async (
  fixType: string,
  matchDay: string,
) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<NewFixture[]>(
    `${url}/scores/matches-by-date/${matchDay}?fixture_type=${fixType}&new=true`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};

export const fetchLeagueFixtures = async () => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<NewFixture[]>(
    `${url}/competitions/238/seasons/258/fixtures`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};

export const fetchFixtureDates = async (fixType: string) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<FixtureDate[]>(
    `${url}/scores/match-dates/${fixType}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};

export const fetchFixtureDetails = async (fixId: string) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<MatchDetails>(
    `${url}/scores/match-details/${fixId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};

export const fetchFixtureLineups = async (fixId: string) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<MatchSquads>(
    `${url}/scores/match-lineups/${fixId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};
