/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  quizPlayAnswerQuestion,
  quizPlayNextQuestion,
  quizPlaySkipQuestion,
} from "@/store/slices/quiz-play.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import React from "react";

type MultipleAnswerQuestionPagePlayProps = {
  timeLeft: number;
  clearTimer: () => void;
  timeUsed: number;
};

export default function MultipleAnswerQuestionPagePlay({
  timeLeft,
  clearTimer,
  timeUsed,
}: MultipleAnswerQuestionPagePlayProps) {
  // Load the question from the database
  // load the answers from the database
  // setup the state for the answers
  // setup state for timer based on the time limit of the question
  // watch the timer state and when it reaches 0, time is up, disable the answers
  // watch the answers state and when it changes, disable the answers
  // when the user selects an answer, update the state
  // when the user clicks submit, check the answer and update the state to show the correct answer
  // when the user clicks next, go to the next question
  // when user clicks skip, go to the next question and mark the question as skipped
  // When on the last question, when the user clicks next, go to the results page
  // When on the last question, when the user clicks skip, go to the results page and mark the question as skipped
  // This page should be able to handle multiple choice questions, multiple answer questions, is text selection questions, and is text entry questions
  const { currentAnswers, currentQuestion } = useAppSelector(
    (state) => state.persist.quizPlay
  );
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = React.useState<Array<string>>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log({ value });

    answers.includes(value)
      ? setAnswers(answers.filter((answer) => answer !== value))
      : setAnswers([...answers, value]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearTimer();
    dispatch(
      quizPlayAnswerQuestion({
        answer: selectedAnswers,
        duration: timeUsed,
        status: "answered",
      })
    );
  };
  const selectedAnswers = React.useMemo(() => {
    return currentAnswers.filter((answer) => answers.includes(answer.uid));
  }, [answers]);
  return (
    <form onSubmit={handleSubmit}>
    
      {/* time left */}
      <div className="flex flex-row items-center gap-2 p-2">
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl font-bold">{timeLeft}</div>
          <div className="text-2xl font-bold">seconds left</div>
        </div>
      </div>
      {/* <h1>Multiple Answer Question Page</h1> */}
      <h2>Question: {currentQuestion!.question}</h2>
      {currentQuestion?.is_answered ? (
        <div className="py-2 flex flex-col gap-2">
          <div>
            <div>Selected answers</div>
          </div>
          {Array.isArray(currentQuestion.selected_answer)
            ? currentQuestion.selected_answer.map((answer: any) => (
                <div
                  key={answer?.uid}
                  className={`px-2 border rounded-md w-fit ${
                    answer.is_answer ? "border-green-500" : ""
                  }`}
                >
                  {answer.answer}
                </div>
              ))
            : null}
        </div>
      ) : (
        <div className="p-2">
          {currentQuestion!.answers.map((answer) => (
            <div
              key={answer.uid}
              className="flex flex-row items-center gap-2 p-2"
            >
              <input
                type="checkbox"
                name={answer.uid}
                value={answer.uid}
                id={answer.answer}
                onChange={handleInputChange}
                checked={answers.includes(answer.uid)}
              />
              <label htmlFor="">{answer.answer}</label>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 p-2">
        {!currentQuestion?.is_answered && (
          <button
            type="submit"
            className="bg-primary text-white rounded-md px-4 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestion?.is_answered}
          >
            Submit
          </button>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-primary text-white rounded-md px-4 text-center"
            onClick={() => dispatch(quizPlayNextQuestion())}
          >
            Next
          </button>
          {!currentQuestion?.is_answered && (
            <button
              type="button"
              className="bg-primary text-white rounded-md px-4 text-center"
              onClick={() => {
                clearTimer();
                dispatch(quizPlaySkipQuestion({ duration: timeUsed }));
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
