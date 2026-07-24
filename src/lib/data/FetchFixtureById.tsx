import axios from "axios";
import { SingleFixtureStats } from "../types/scores";

const FetchFixtureById = async (fixtureId: string) => {
  const res = await axios.get<SingleFixtureStats>(
    `https://apis.tisini.co.ke/apiagent7.php?event=${fixtureId}`
  );

  return res.data;
};

export default FetchFixtureById;
