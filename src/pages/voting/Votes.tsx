import React from "react";

import useStore from "@/store/store";
import type { VotingCause, VotingResults } from "@/lib/types/voting";
import { getOrCreateVotingSessionId } from "./voteSession";

type CastedVotesProps = {
  /** Optional: pass cause directly; otherwise read from store (after mutation). */
  votingCause?: VotingCause | null;
  votingResults?: VotingResults | null;
};

export const CastedVotes = ({
  votingCause: votingCauseProp,
  votingResults,
}: CastedVotesProps) => {
  const { votingCause: fromStore } = useStore() as {
    votingCause: VotingCause | null;
  };

  const votingCause = votingCauseProp ?? fromStore;
  const sessionId = getOrCreateVotingSessionId();
  const userParticipated =
    Boolean(votingCause?.vote_owner) && votingCause!.vote_owner === sessionId;

  if (!votingCause) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-600">No voting data to display.</p>
      </div>
    );
  }

  const totalBallots = votingResults?.totalVotes.reduce(
    (sum, v) => sum + v.votes,
    0,
  );

  const rows =
    votingResults?.totalVotes
      .map((v) => {
        const pct =
          totalBallots && totalBallots > 0
            ? Math.round((v.votes / totalBallots) * 1000) / 10
            : 0;
        return { vote: v, votes: v.votes, pct };
      })
      .sort((a, b) => b.votes - a.votes) ?? [];

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-3 sm:px-4">
      <div className="mb-6 w-full text-center sm:mb-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {votingCause.reason}
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          {userParticipated
            ? "Thanks for voting. Results are sorted by vote count."
            : "Results sorted by vote count (highest first)."}
        </p>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          {totalBallots} total vote{totalBallots !== 1 ? "s" : ""} recorded
        </p>
      </div>

      {/* Mobile: stacked cards */}
      <div className="w-full space-y-3 md:hidden">
        {rows.map(({ vote, votes, pct }, index) => (
          <article
            key={vote.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                {index + 1}
              </span>
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300">
                <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500">
                  —
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold capitalize text-gray-900">
                  {vote.name.toLowerCase()}
                </p>
                <p className="mt-1 text-sm tabular-nums text-gray-600">
                  <span className="font-semibold text-gray-900">{votes}</span>
                  <span className="text-gray-400"> · </span>
                  <span>{pct}%</span>
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md ring-1 ring-black/5 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-12" />
              <col />
              <col className="w-44" />
              <col className="w-28" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
                <th
                  scope="col"
                  className="w-12 px-2 py-2.5 text-center text-xs font-semibold text-gray-700"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 font-semibold text-gray-700"
                >
                  Participant
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 font-semibold text-gray-700"
                >
                  Share
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right text-xs font-semibold text-gray-700"
                >
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ vote, votes, pct }, index) => (
                <tr
                  key={vote.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                >
                  <td className="w-12 whitespace-nowrap px-2 py-2.5 align-middle text-center text-gray-500">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white">
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-500">
                          —
                        </div>
                      </div>
                      <span className="min-w-0 truncate font-medium capitalize text-gray-900">
                        {vote.name.toLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 align-middle">
                    <div className="flex w-full max-w-[13rem] items-center">
                      <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right align-middle tabular-nums">
                    <span className="font-semibold text-gray-900">{votes}</span>
                    <span className="text-gray-500"> · </span>
                    <span className="text-gray-600">{pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
