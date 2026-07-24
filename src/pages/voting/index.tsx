import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useStore from "@/store/store";
import Spinner from "@/components/spinner/Spinner";
import type { VotingCause } from "@/lib/types/voting";
import { fetchVotingCauses } from "@/lib/data/FetchVoting";
import { getOrCreateVotingSessionId } from "./voteSession";
import { causesImages } from "./participants";

function isCauseExpired(dateTo: string | undefined | null, nowMs: number) {
  if (!dateTo) return false;
  const t = new Date(dateTo).getTime();
  if (Number.isNaN(t)) return false;
  return nowMs > t;
}

function getClosesInHMS(dateTo: string | undefined | null, nowMs: number) {
  if (!dateTo) return null;
  const t = new Date(dateTo).getTime();
  if (Number.isNaN(t)) return null;

  const diffMs = t - nowMs;
  if (diffMs <= 0) return null;

  const totalSeconds = Math.ceil(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}

const VotingPage = () => {
  const votingSessionId = getOrCreateVotingSessionId();
  const { setVotingCause } = useStore();
  const [resultsCause, setResultsCause] = React.useState<VotingCause | null>(
    null,
  );

  const [nowMs, setNowMs] = React.useState(() => Date.now());
  React.useEffect(() => {
    // Refresh countdown occasionally so we don't re-render every second.
    const interval = window.setInterval(() => setNowMs(Date.now()), 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["voting-causes"],
    queryFn: fetchVotingCauses,
  });

  if (isLoading) return <Spinner />;

  const votingCauses = Array.isArray(data) ? data : [];
  if (votingCauses.length === 0) return <div>No voting causes found</div>;

  return (
    <main className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {votingCauses.map((cause) => {
          const expired = isCauseExpired(cause.date_to, nowMs);
          const hasVoted =
            Boolean(cause.vote_owner) && cause.vote_owner === votingSessionId;
          const canVote = !expired && !hasVoted;

          // Hardcoded preview image: first participant for now.
          const previewImage =
            "https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

          return (
            <section
              key={cause.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-3 flex-1">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    className="h-full w-full object-cover"
                    src={causesImages[cause.id] ?? previewImage}
                    alt={cause.reason}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    {cause.reason}
                  </h2>
                  {expired ? (
                    <p className="text-sm font-medium text-gray-500">
                      Voting ended
                    </p>
                  ) : (
                    <div className="w-full rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 p-3">
                      <p className="text-xs font-semibold text-indigo-700">
                        Will close in
                      </p>
                      <p className="font-mono text-2xl font-bold text-indigo-900">
                        {getClosesInHMS(cause.date_to, nowMs) ?? ""}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  {canVote ? (
                    <Link
                      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-indigo-700"
                      to={`/voting/${cause.id}/castVote`}
                      onClick={() => setVotingCause(cause)}
                    >
                      Vote
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setResultsCause(cause)}
                      className="w-full rounded-xl border border-gray-200 bg-secondary px-4 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                    >
                      Results
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {resultsCause && (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Results</h3>
              <p className="text-sm text-gray-600">{resultsCause.reason}</p>
            </div>
            <button
              type="button"
              onClick={() => setResultsCause(null)}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm"
            >
              Close
            </button>
          </div>

          {/* Hardcoded/placeholder results for now */}
          <div className="mt-3 aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              className="h-full w-full object-cover"
              src={
                resultsCause.participants?.[0]?.image_url ??
                "https://via.placeholder.com/900x500?text=Results"
              }
              alt="Results preview"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default VotingPage;
