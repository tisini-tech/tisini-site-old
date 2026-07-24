type UID = string;
type CategoryName = string;
type QuizType = 'PR';
type PlayerID = number;
type PlayerNickname = string;
type PlayerFirstName = string;
type PlayerLastName = string;
type GameEvent = string;
type UserAnswer = string;
type AnswerMarker = "IC" | "IW" | null;
type Points = number;
type TimeUsed = number | null;
type HasPlayerPaid = boolean;

interface QPlayer {
  id: PlayerID;
  nickname: PlayerNickname;
  first_name: PlayerFirstName;
  last_name: PlayerLastName;
}

interface MarkedUserAnswer {
  id: number;
  game_event: GameEvent;
  user_answer: UserAnswer;
  answer_marker: AnswerMarker;
}

interface QuestionPlayer {
  id: number;
  q_player: QPlayer;
  marked_useranswers: MarkedUserAnswer[];
  points_earned: Points;
  time_used: TimeUsed;
  has_player_paid: HasPlayerPaid;
}

export interface Leaderboard2QuizData {
  uid: UID;
  category_name: CategoryName;
  quiz_type: QuizType;
  question_players: QuestionPlayer[];
}
