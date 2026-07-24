import axios from "axios";
import { Fixture } from "../types/scores";

const fetchBasketBallFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=basketball"
  );

  return res.data;
};

export default fetchBasketBallFixtures;
