import { toast } from "react-toastify";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useStore from "@/store/store";
import { ConfirmationModal } from "./modal";
import { castVote } from "@/lib/data/FetchVoting";
import { getParticipantImageSrc } from "./participants";
import { Participant, VotingCause } from "@/lib/types/voting";
import {
  mergeCastVoteResult,
  shouldMarkSessionAsVoter,
} from "@/lib/voting/mergeCastVoteResult";

type CastVoteProps = {
  votingCause: VotingCause;
  hasVoted: boolean;
  votingActive: boolean;
  canVote: boolean;
  setHasVoted: (hasVoted: boolean) => void;
  votingSessionId: string;
};

export const CastVote = ({
  votingCause,
  hasVoted,
  votingActive,
  canVote,
  setHasVoted,
  votingSessionId,
}: CastVoteProps) => {
  const setVotingCause = useStore((s) => s.setVotingCause);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  type CastVoteVars = {
    session: string;
    participant_id: string;
    voting_cause_id: string;
  };

  const queryClient = useQueryClient();

  const { mutate: castVoteMutation, isLoading } = useMutation(
    (vars: CastVoteVars) =>
      castVote(vars.session, vars.participant_id, vars.voting_cause_id),
    {
      onSuccess: (data: unknown) => {
        const current = useStore.getState().votingCause;
        if (!current) return;

        queryClient.invalidateQueries({
          queryKey: ["voting-results", current.id],
        });
        const next = mergeCastVoteResult(current, data, votingSessionId);
        setVotingCause(next);

        const payload = data as {
          success?: boolean;
          message?: string;
          participantVotes?: unknown;
        };

        if (payload.success === false) {
          toast.error(
            payload.message ?? "Unable to complete your vote request.",
          );
          if (
            shouldMarkSessionAsVoter(payload.message, payload.participantVotes)
          ) {
            setHasVoted(true);
          }
        } else {
          toast.success(payload.message?.trim() || "Vote cast successfully!");
          setHasVoted(true);
        }

        setShowModal(false);
        setSelectedParticipant(null);
      },
      onError: (error: unknown) => {
        console.log("error", error);
        toast.error("Failed to cast vote. Please try again.");
        setShowModal(false);
      },
    },
  );

  const handleVoteClick = (participant: Participant) => {
    if (!canVote) return;
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    if (!selectedParticipant || !votingCause) return;

    castVoteMutation({
      session: votingSessionId,
      participant_id: selectedParticipant.id.toString(),
      voting_cause_id: votingCause.id.toString(),
    });
  };

  const handleCancelVote = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {votingCause.reason}
        </h1>
        <p className="text-gray-600">
          Voting Period: {new Date(votingCause.date_from).toLocaleString()} -{" "}
          {new Date(votingCause.date_to).toLocaleString()}
        </p>
        {!votingActive && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            {new Date() < new Date(votingCause.date_from)
              ? "Voting Not Started Yet"
              : "Voting Has Ended"}
          </div>
        )}
        {hasVoted && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ You have already cast your vote
          </div>
        )}
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {votingCause.participants.map((participant) => {
          // const voteCount =
          //   votingCause.totalVotes.find((v) => v.id === participant.id)
          //     ?.votes || 0;

          const imageSrc = getParticipantImageSrc(participant);

          return (
            <article
              key={participant.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md ring-1 ring-black/5 transition-shadow duration-200 hover:shadow-lg"
            >
              {/* Natural height (no fixed aspect) removes letterboxing gaps above/below */}
              <div className="w-full bg-slate-100 leading-none">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt=""
                    className="block h-auto w-full max-w-full align-top"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex min-h-[10rem] w-full flex-col items-center justify-center py-8 text-slate-500">
                    <svg
                      className="h-16 w-16 opacity-40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="mt-2 text-sm">No photo</span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold capitalize leading-snug text-gray-900">
                    {participant.name.toLowerCase()}
                  </h3>
                  {/* <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-900">
                    {voteCount} vote{voteCount !== 1 ? "s" : ""}
                  </span> */}
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                  {participant.description || "No description provided"}
                </p>

                <button
                  type="button"
                  onClick={() => handleVoteClick(participant)}
                  disabled={!canVote}
                  className={`
                      w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200
                      ${
                        canVote
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700"
                          : "cursor-not-allowed bg-gray-200 text-gray-500"
                      }
                    `}
                >
                  {hasVoted
                    ? "Already Voted"
                    : `Vote for ${participant.name.split(" ")[0]}`}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        participantName={selectedParticipant?.name || ""}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
        isLoading={isLoading}
      />
    </section>
  );
};
