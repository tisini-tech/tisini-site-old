import axios from "axios";

import { VotingCause, VotingResults } from "../types/voting";

export const fetchVotingCauses = async () => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<VotingCause[]>(`${url}?gettoken=${token}`, {
      action: "activevotes",
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

export const castVote = async (
  session: string,
  participant_id: string,
  voting_cause_id: string,
) => {
  const url = import.meta.env.VITE_API_SCORES_URL;

  try {
    const res = await axios.post(`${url}`, {
      action: "castvote",
      session: session,
      participant_id: participant_id,
      voting_cause_id: voting_cause_id,
      comments: "",
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to post vote, ${error.message}`);
  }
};

export const fetchVotingResults = async (voting_cause_id: string) => {
  const url = import.meta.env.VITE_API_SCORES_URL;

  console.log("refetching voting results");

  try {
    const res = await axios.post<VotingResults>(`${url}`, {
      action: "votecount",
      voting_cause_id: voting_cause_id,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch voting results, ${error.message}`);
  }
};
