import { create } from "zustand";
import { persist } from "zustand/middleware";

import { VotingCause } from "@/lib/types/voting";

export type Store = {
    votingCause: VotingCause | null;
}

export type State = {
    votingCause: VotingCause | null;
}

export type Actions = {
    setVotingCause: (votingCause: VotingCause | null) => void;
}

const initialState: State = {
    votingCause: null,
}

export const useStore = create<State & Actions>()(persist((set) => ({
    ...initialState,
    setVotingCause: (votingCause: VotingCause | null) => set({ votingCause }),
}), {
    name: "voting-causes",
}));

export default useStore;