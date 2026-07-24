import {
  quizPlayAnswerQuestion,
  quizPlayNextQuestion,
  // quizPlaySkipQuestion,
} from "@/store/slices/quiz-play.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import React from "react";

type TextAnswerQuestionPagePlayProps = {
  timeLeft: number;
  clearTimer: () => void;
  timeUsed: number;
};

export default function TextAnswerQuestionPagePlay({
  timeLeft,
  timeUsed,
  clearTimer,
}: TextAnswerQuestionPagePlayProps) {
  const [answer, setAnswer] = React.useState("");
  const dispatch = useAppDispatch();
  const { currentQuestion, currentQuestionIndex, totalQuestions } =
    useAppSelector((state) => state.persist.quizPlay);
  const submitAnswer = () => {
    clearTimer();
    dispatch(
      quizPlayAnswerQuestion({
        answer: answer,
        duration: timeUsed,
        status: "answered",
      })
    );
    answer && setAnswer("");
  };
  // const skipQuestion = () => {
  //   clearTimer();
  //   dispatch(quizPlaySkipQuestion({ duration: timeUsed }));
  //   answer && setAnswer("");
  // };
  return (
    <div className="font-pop">
      <div className="flex flex-row items-center gap-2 p-2">
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl font-bold">{timeLeft}</div>
          <div className="text-2xl font-bold">seconds left</div>
        </div>
      </div>

      <p className="text-xl font-medium">
        <span className="">Question {currentQuestionIndex + 1}</span>/
        {totalQuestions} <br />
      </p>
      <br />
      <p>
        <span className="text-xl font-bold">Question:</span>{" "}
        {currentQuestion?.question}
      </p>

      <div className="mt-4">
        <label className="text-xl">Answer</label>
        {currentQuestion?.is_answered ? (
          <div>
            <p className="text-xl font-bold border px-4 w-fit rounded">
              {typeof currentQuestion?.selected_answer === "string"
                ? currentQuestion?.selected_answer
                : ""}
            </p>
          </div>
        ) : (
          <input
            type="text"
            className="w-full border-2 border-gray-300 p-2 rounded-lg ring-0 focus:ring-0 focus:border-primary text-xl"
            value={answer}
            placeholder="Enter your answer here"
            disabled={currentQuestion?.is_answered}
            onChange={(e) => setAnswer(e.target.value)}
            defaultValue={currentQuestion?.selected_answer as string}
          />
        )}
      </div>
      {/* add more actions of skip,continue and submit */}
      <div className="mt-4 flex p-2 justify-start gap-2 py-4">
        {/* <div>
          {!currentQuestion?.is_answered && (
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg mr-2"
              onClick={skipQuestion}
            >
              Skip
            </button>
          )}
        </div> */}
        <div>
          {currentQuestion?.is_answered && !currentQuestion.isLastQuestion ? (
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              onClick={() => dispatch(quizPlayNextQuestion())}
            >
              Next question
            </button>
          ) : !currentQuestion?.is_answered ? (
            <button
              className="bg-primary text-white px-6 py-2 rounded-lg text-xl"
              onClick={submitAnswer}
            >
              Submit
            </button>
          ) : null}
        </div>
      </div>
      {/* {questions.map((question, index) => (
        <div key={index}>
          <p>{question.is_answered ? "Answered" : "Not yet"}</p>
        </div>
      ))} */}
    </div>
  );
}
