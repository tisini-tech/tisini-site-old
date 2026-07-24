/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Confetti from "react-confetti";
import MultipleAnswerQuestionPagePlay from "@/pages/PlayQuiz/MultipleAnswerQuestionPagePlay";
import QuizPlayDone from "./QuizPlayDone";
import React from "react";
import SingleQuestionPagePlay from "@/pages/PlayQuiz/SingleAnswerQuestionPagePlay";
import TextAnswerQuestionPagePlay from "@/pages/PlayQuiz/TextAnswerQuestionPagePlay";
import { quizPlayTimeoutQuestion } from "@/store/slices/quiz-play.slice";
import { useLocation, useNavigate } from "react-router-dom";
import SingleQuizQuestion from "./SingleQuizQuestion";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function PlayQuiz() {
  const { questions, currentQuestion, allAnswered } = useAppSelector(
    (state) => state.persist.quizPlay
  );

  const [isExploding, setIsExploding] = React.useState<boolean>(true);
  const [count, setCount] = React.useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const url = location.pathname.startsWith("/quiz") ? "quiz" : "tanobora";

  React.useEffect(() => {
    // check there are questions if not navigate to organizations
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    questions.length === 0 && navigate(`/${url}`);
  }, [questions, navigate]);

  const questionType = React.useMemo(() => {
    if (questions.length > 0) {
      return currentQuestion?.quiz_type;
    }
    return "";
  }, [questions, currentQuestion]);

  // Create a function that will check if all questions are answered and show coffeti once all questions are answered then timout after 2seconds
  React.useEffect(() => {
    if (allAnswered) {
      setTimeout(() => {
        setIsExploding(true);
      }, 100);
    }
  }, [allAnswered]);

  // turn off coffeti when all questions are answered
  React.useEffect(() => {
    if (allAnswered) {
      setTimeout(() => {
        setIsExploding(false);
      }, 10000);
    }
  }, [allAnswered]);

  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = React.useState<number>(
    currentQuestion?.timer || 0
  );
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  // Time watch
  React.useEffect(() => {
    // Start the countdown only if the question is not answered
    if (!currentQuestion?.is_answered) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          // If timer hits 0, clear the interval
          if (prevTimeLeft === 1) {
            clearInterval(timerRef.current!);
          }
          return prevTimeLeft > 0 ? prevTimeLeft - 1 : prevTimeLeft;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion, timeLeft]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      if (!currentQuestion?.is_answered) {
        dispatch(quizPlayTimeoutQuestion());
        toast.error("Time is up");
      }
    }
  }, [timeLeft]);

  React.useEffect(() => {
    if (currentQuestion?.timer && !currentQuestion?.is_answered) {
      setTimeLeft(currentQuestion.timer);
    }
  }, [currentQuestion]);

  const timeUsed = React.useMemo(() => {
    return currentQuestion?.timer ? currentQuestion?.timer - timeLeft : 0;
  }, [timeLeft]);
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  if (url === "quiz") {
    return (
      <main className="min-h-[50vh]">
        <ToastContainer />

        {!allAnswered ? (
          <div className="max-w-7xl mx-auto p-4 w-full">
            {questionType === "single" ? (
              <SingleQuizQuestion
                clearTimer={clearTimer}
                timeLeft={timeLeft}
                timeUsed={timeUsed}
                count={count}
                setCount={setCount}
              />
            ) : (
              <div>Unknown me</div>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto text-center p-4">
            {isExploding && (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}

            <QuizPlayDone count={count} />
          </div>
        )}
      </main>
    );
  } else {
    return (
      <main className="min-h-[50vh]">
        <ToastContainer />

        {!allAnswered ? (
          <div className="max-w-7xl mx-auto p-4 w-full">
            {questionType === "multiple" ? (
              <MultipleAnswerQuestionPagePlay
                clearTimer={clearTimer}
                timeLeft={timeLeft}
                timeUsed={timeUsed}
              />
            ) : questionType === "single" ? (
              <SingleQuestionPagePlay
                clearTimer={clearTimer}
                timeLeft={timeLeft}
                timeUsed={timeUsed}
              />
            ) : questionType === "text" ? (
              <TextAnswerQuestionPagePlay
                clearTimer={clearTimer}
                timeLeft={timeLeft}
                timeUsed={timeUsed}
              />
            ) : (
              <div>Unknown</div>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto text-center p-4">
            {isExploding && (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}

            <QuizPlayDone count={count} />
          </div>
        )}
      </main>
    );
  }
}

{
  /* <h1 className="text-2xl">All done</h1>
  <p>
            You have answered all the questions. You can now view your results
            and see how you did.
          </p> */
}
{
  /* {questionType === "multiple" ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">All done</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => submitResults()}
                >
                  Submit results
                </button>
              </div>
             
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
              <code>
                {JSON.stringify(answerCreator.createPayload(progress), null, 2)}
              </code>
            </div>
          ) : questionType === "single" ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">All done single</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  onClick={async () => {
                    await submitResults();
                    // navigate("/results");
                  }}
                >
                  Submit results
                </button>
              </div>
             
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
              <code>
                {JSON.stringify(answerCreator.createPayload(progress), null, 2)}
              </code>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl">All done</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  onClick={async () => {
                    await submitResults();
                    // navigate("/results");
                  }}
                >
                  Submit results
                </button>
              </div>
             
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
            </div>
          )} */
}
