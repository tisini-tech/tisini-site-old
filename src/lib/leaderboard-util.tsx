import {
  GenericLeaderBoardData,
  NormalLeaderBoard,
  PredictiveLeaderBoard,
} from "./types";
import { Leaderboard2QuizData } from "./types/leader-board";

export function convertLeaderBoardData<T = unknown>(
  data: T extends "NR"
    ? NormalLeaderBoard
    : T extends "PR"
    ? PredictiveLeaderBoard | Leaderboard2QuizData
    : never,
  t: T
) {
  // const { type, ...rest } = data as any;
  type PossibleTupleT = "Predictive" | "Normal" | "Unknown";
  const res = {
    data: data as GenericLeaderBoardData<T>,
    type:
      t === "NR"
        ? "Normal"
        : t === "PR"
        ? "Predictive"
        : ("Unknown" as PossibleTupleT),
  };
  return res;
}

export function processPredictiveLeaderboard(
  leaderboard: PredictiveLeaderBoard
) {
  const { question_players } = leaderboard;

  const players = question_players.map((player) => {
    const { q_player, questions, points_earned, time_used, score, has_player_paid } = player;
    const { nickname, profile_pic } = q_player;
    const sortedQuestions = questions.sort((a, b) =>
      a.question_text.uid.localeCompare(b.question_text.uid)
    );
    const answers =
      sortedQuestions && Array.isArray(sortedQuestions)
        ? sortedQuestions.map((question) => {
            const { question_text, user_answers } = question;
            const { game_event } = question_text;

            const answer = user_answers[0];
            type AnswerStatus = "c" | "w" | "p";
            return {
              question: game_event.names,
              user_answer: answer.answer_text,
              // correct_answer: answer.answer_marker,
              status:
                answer.answer_marker === "IC"
                  ? "c"
                  : answer.answer_marker === "IW"
                  ? "w"
                  : ("p" as AnswerStatus),
            };
          })
        : [];

    return {
      nickname,
      profile_pic,
      answers,
      points_earned,
      time_used,
      score,
      has_player_paid,
    };
  });

  return players;
}

export const processPredictiveLeaderboardV2 = (
  leaderboard: Leaderboard2QuizData
) => {
  const { question_players } = leaderboard;

  const players = question_players.map((player) => {
    const { q_player, marked_useranswers, points_earned, time_used, has_player_paid } = player;
    const { nickname } = q_player;
    const sortedQuestions = marked_useranswers.sort((a, b) =>
      a.game_event.localeCompare(b.game_event)
    );
    // type QuestionType = {
    //   question_abbrev: string;
    //   user_answer: string;
    //   answer_marker: string;
    // };

    // const question: QuestionType = {
    //   // some mock data
    //   question_abbrev: "Sample",
    //   user_answer: "Answer",
    //   answer_marker: "Marker",
    // };

    const answers =
      sortedQuestions && Array.isArray(sortedQuestions)
        ? sortedQuestions.map((question) => {
          console.log({ question });
          
            // const questionKeys = new Set(Object.keys(question));

            const { answer_marker, game_event, user_answer } = question;

            // const answer = user_answer;
            type AnswerStatus = "c" | "w" | "p";
            return {
              question: game_event,
              user_answer: user_answer,
              // correct_answer: answer.answer_marker,
              status:
                answer_marker === "IC"
                  ? "c"
                  : answer_marker === "IW"
                  ? "w"
                  : ("p" as AnswerStatus),
            };
          })
        : [];

    return {
      nickname,
      answers,
      points_earned,
      time_used,
      has_player_paid
    };
  });
  return players;
};
