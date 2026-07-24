export interface Participant {
  id: number;
  voting_cause_id: number;
  name: string;
  image_url: string;
  description: string;
  date_updated: string;
  date_created: string;
}

export interface Vote {
  id: number;
  name: string;
  votes: number;
}

export interface VotingCause {
  id: number;
  reason: string;
  date_created: string;
  date_from: string;
  date_to: string;
  date_updated: string;
  tournament_id: number | null;
  created_by: string;
  vote_owner: string;
  participants: Participant[];
  totalVotes: Vote[];
}

export interface VotingResults {
  message: string;
  success: boolean;
  timestamp: number;
  totalVotes: Vote[];
}
