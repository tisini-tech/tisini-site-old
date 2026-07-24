/* eslint-disable @typescript-eslint/no-misused-promises */

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Loader from "@/components/Loader/Loader";
import { NavLink } from "react-router-dom";
import React from "react";
import answerCreator from "@/lib/answer-creator";
import { privateAxios } from "@/lib/api";
import { quizPlaySubmit } from "@/store/slices/quiz-play.slice";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function QuizPlayDone({ count }: { count: number }) {
  const {
    progress,
    questionSet,
    isSubmitted,
    totalQuestions,
    currentOrganization,
  } = useAppSelector((state) => state.persist.quizPlay);

  const summary = React.useMemo(() => {
    return answerCreator.createPayload(progress);
  }, [progress]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const qtype = questionSet?.quiz_type === "NR" ? "quiz" : "tanobora";

  const submitResults = async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setIsLoading(true);
    try {
      const dataToSend = {
        ...summary,
        points_earned: qtype === "quiz" ? summary.points_earned : 0,
        time_used: summary.time_used! / totalQuestions,
      };

      https: await privateAxios.post(
        `/${qtype}/organizations/${currentOrganization}/questionsets/${questionSet?.uid}/leaderboard/`,
        dataToSend
      );
      // console.log({ response });
      dispatch(quizPlaySubmit());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (_: any) {
      if (_ instanceof AxiosError && _.response?.status === 500) {
        if (_ instanceof AxiosError) {
          if (_.response?.status === 500 || _.response?.status === 400) {
            dispatch(quizPlaySubmit());
            return;
          }
        }
        try {
          // retry
          const dataToSend = {
            ...summary,
            time_used: summary.time_used! / totalQuestions,
          };
          await privateAxios.post(
            `/${qtype}/quiz_leaderboard/${questionSet?.uid}/leaderboard/`,
            dataToSend
          );
          dispatch(quizPlaySubmit());
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              error.response?.status === 500 ||
              error.response?.status === 400
            ) {
              dispatch(quizPlaySubmit());
              return;
            }
          }

          // console.log({ error });
          toast.error("Something went wrong while submitting your results");
        }
        return;
      }
      toast.error("Something went wrong while submitting your results");
      // console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(summary.points_earned);

  return (
    <div>
      <Loader isLoading={isLoading} />
      {questionSet?.quiz_type === "NR" ? (
        <div className="text-xl">
          {!isSubmitted && (
            <h1>Congratulations you have completed the quiz.👏 </h1>
          )}
          <div className="max-w-xl p-2 border mx-auto my-2 shadow-md py-4">
            {!isSubmitted && (
              <>
                <h2 className="underline text-primary">Summary</h2>
                <div>
                  <p>
                    Total Questions: {totalQuestions} <br />
                  </p>
                  <p className="hidden">Total Points scored: {count}</p>
                  <p>
                    Average time:{" "}
                    {(summary.time_used! / totalQuestions).toFixed(2)} seconds
                  </p>
                </div>
              </>
            )}
            <div>
              {isSubmitted ? (
                <div className="flex flex-col gap-4">
                  <h1 className="text-green-500 text-xl">
                    Thank you for submitting your results
                  </h1>
                  <div className="flex flex-col md:flex-row  gap-2 items-center justify-center">
                    <NavLink
                      to={`/quiz/${currentOrganization}`}
                      className="border border-primary rounded-lg px-2 py-1 text-primary"
                    >
                      Back to Quizzes
                    </NavLink>
                    <NavLink
                      to={`/quiz/questionsets/${questionSet.uid}/leaderboard`}
                      className="bg-primary text-white px-2 py-1 rounded-lg"
                    >
                      Leaderboard
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={submitResults}
                    className="bg-primary text-white px-4 py-1 rounded-lg mt-4"
                  >
                    Submit Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl">
          {!isSubmitted && (
            <h1>Congratulations you have completed the Tano Bora.👏</h1>
          )}
          <div className="max-w-xl p-2 border mx-auto my-2 shadow-md py-4">
            {!isSubmitted && (
              <div>
                <h2 className="underline text-primary">Summary</h2>
                <div>
                  <p>
                    Total Questions: {totalQuestions} <br />
                  </p>
                  <p>
                    Average time:{" "}
                    {(summary.time_used! / totalQuestions).toFixed(2)} seconds
                  </p>
                </div>
              </div>
            )}

            <div>
              <div>
                {isSubmitted ? (
                  <div className="flex flex-col gap-4">
                    <h1 className="text-green-500 text-xl">
                      Thank you for submitting your results
                    </h1>
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                      <NavLink
                        to={`/tanobora/${currentOrganization}`}
                        className="border border-primary rounded-lg px-2 py-1 text-primary"
                      >
                        Back to Tano Bora
                      </NavLink>
                      <NavLink
                        to={`/tanobora/questionsets/${
                          questionSet!.uid
                        }/leaderboard`}
                        className="bg-primary text-white px-2 py-1 rounded-lg"
                      >
                        Leaderboard
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={submitResults}
                      className="bg-primary text-white px-4 py-1 rounded-lg mt-4"
                    >
                      Submit Results
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
        <strong className="font-bold">Note: </strong>
        <span className="block sm:inline">
          You can only submit your results once. Once you have submitted your
          results you cannot change them. Results will be available to view once
          the games have ended.
        </span>
      </div>
    </div>
  );
}
