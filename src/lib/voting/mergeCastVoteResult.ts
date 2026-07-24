import type { Vote, VotingCause } from "@/lib/types/voting";

function mergeParticipantVotesIntoTotal(
  previous: VotingCause,
  participantVotes: unknown,
): Vote[] {
  if (!Array.isArray(participantVotes)) {
    return previous.totalVotes;
  }

  return previous.participants.map((p) => {
    const match = participantVotes.find((row: unknown) => {
      const r = row as { id?: number; name?: string; votes?: number };
      if (typeof r.id === "number" && r.id === p.id) return true;
      if (r.name && p.name) {
        return r.name.toLowerCase().trim() === p.name.toLowerCase().trim();
      }
      return false;
    }) as { id?: number; name?: string; votes?: number } | undefined;

    const votes =
      match != null && match.votes != null
        ? Number(match.votes)
        : (previous.totalVotes.find((t) => t.id === p.id)?.votes ?? 0);

    return {
      id: p.id,
      name: p.name,
      votes,
    };
  });
}

export function shouldMarkSessionAsVoter(
  message: unknown,
  participantVotes: unknown,
): boolean {
  if (typeof message === "string") {
    const m = message.toLowerCase();
    if (
      m.includes("already") ||
      m.includes("duplicate") ||
      m.includes("cannot vote") ||
      m.includes("one vote") ||
      m.includes("voted for this")
    ) {
      return true;
    }
  }
  return Array.isArray(participantVotes) && participantVotes.length > 0;
}

/**
 * Normalizes the castvote API response into a full VotingCause.
 * Handles full cause payloads, partial updates, and `participantVotes` tallies.
 * When `success === false` but the message indicates duplicate vote (or tallies are
 * returned), sets `vote_owner` so the UI can switch to results.
 */
export function mergeCastVoteResult(
  previous: VotingCause,
  data: unknown,
  sessionId: string,
): VotingCause {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      ...previous,
      vote_owner: sessionId,
    };
  }

  const d = data as Record<string, unknown>;
  const success = d.success;

  if (
    typeof d.id === "number" &&
    Array.isArray(d.participants) &&
    Array.isArray(d.totalVotes)
  ) {
    return data as VotingCause;
  }

  const totalVotes = mergeParticipantVotesIntoTotal(
    previous,
    d.participantVotes,
  );

  if (success === false) {
    const markVoter = shouldMarkSessionAsVoter(d.message, d.participantVotes);
    return {
      ...previous,
      totalVotes,
      ...(markVoter ? { vote_owner: sessionId } : {}),
    };
  }

  return {
    ...previous,
    ...(data as Partial<VotingCause>),
    totalVotes,
    vote_owner: sessionId,
  };
}
