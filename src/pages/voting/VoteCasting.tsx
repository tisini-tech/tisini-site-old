import React, { useEffect, useState } from "react";

import useStore from "@/store/store";
import { CastedVotes } from "./Votes";
import { CastVote } from "./CastVote";
import { VotingCause } from "@/lib/types/voting";
import { getOrCreateVotingSessionId } from "./voteSession";
import { useQuery } from "@tanstack/react-query";
import { fetchVotingResults } from "@/lib/data/FetchVoting";

const VoteCastingPage = () => {
  const { votingCause } = useStore() as { votingCause: VotingCause | null };
  const votingSessionId = getOrCreateVotingSessionId();

  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    if (!votingCause) return false;
    return (
      Boolean(votingCause.vote_owner) &&
      votingCause.vote_owner === votingSessionId
    );
  });

  useEffect(() => {
    if (!votingCause) {
      setHasVoted(false);
      return;
    }
    setHasVoted(
      Boolean(votingCause.vote_owner) &&
        votingCause.vote_owner === votingSessionId,
    );
  }, [votingCause, votingSessionId]);

  // Helper to check if voting is still active
  const votingActive = (): boolean => {
    if (!votingCause) return false;
    const now = new Date();
    const fromDate = new Date(votingCause.date_from);
    const toDate = new Date(votingCause.date_to);
    return now >= fromDate && now <= toDate;
  };

  const { data: votingResults } = useQuery({
    queryKey: ["voting-results", votingCause?.id],
    queryFn: () => fetchVotingResults(votingCause?.id?.toString() ?? ""),
    refetchInterval: votingActive() ? 1000 * 2 : false, // 2 seconds
  });

  if (!votingCause) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-gray-500 text-lg">
            No active voting session found.
          </div>
        </div>
      </div>
    );
  }

  const isVotingActive = votingActive();
  const canVote = isVotingActive && !hasVoted;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isVotingActive && canVote ? (
          <CastVote
            votingCause={votingCause}
            hasVoted={hasVoted}
            votingActive={isVotingActive}
            canVote={canVote}
            setHasVoted={setHasVoted}
            votingSessionId={votingSessionId}
          />
        ) : (
          <CastedVotes
            votingCause={votingCause}
            votingResults={votingResults}
          />
        )}
      </div>
    </main>
  );
};

export default VoteCastingPage;
