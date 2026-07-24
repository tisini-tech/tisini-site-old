import axios from "axios";
import { Fixture } from "../types/scores";

export const FetchRugby7 = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=rugby7"
  );

  return res.data;
};

export const FetchRugby10 = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=rugby10"
  );

  return res.data;
};

export const FetchRugby15 = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=rugby15"
  );

  return res.data;
};
