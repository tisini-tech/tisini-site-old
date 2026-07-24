import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { QuestionSetInterface } from "@/lib/types";
import moment from "moment";
import { qSetStatus } from "@/lib/questionset-status";

type QuestionsetComponentProps = {
  questionSet: QuestionSetInterface;
  organizationId: string;
};

export default function QuestionSetTimerCard({
  questionSet,
  organizationId,
}: QuestionsetComponentProps) {
  const [targetTime, setTargetTime] = useState(moment());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_remainingTime, setRemainingTime] = useState(
    moment.duration(targetTime.diff(moment()))
  );

  useEffect(() => {
    setTargetTime(moment(questionSet.start_datetime));
    const interval = setInterval(() => {
      setRemainingTime(moment.duration(targetTime.diff(moment())));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressTime = (type: "start" | "end") => {
    const startTime = moment(qSetStatus.getStartDate(questionSet));
    const endTime = moment(qSetStatus.getEndDate(questionSet));
    const rt = moment.duration(
      type === "start" ? startTime.diff(moment()) : endTime.diff(moment())
    );

    const timeLeft = {
      days: Math.floor(Math.abs(rt.days())).toString().padStart(2, "0"),
      hours: Math.floor(Math.abs(rt.hours())).toString().padStart(2, "0"),
      minutes: Math.abs(rt.minutes()).toString().padStart(2, "0"),
      seconds: Math.abs(rt.seconds()).toString().padStart(2, "0"),
    };

    return timeLeft;
  };

  const afterPlay = () => {
    const currentDate = new Date();
    const endTime = new Date(questionSet.end_datetime);

    const timeDifference = currentDate.getTime() - endTime.getTime();
    const secondsDifference = timeDifference / 1000;

    if (secondsDifference < 60) {
      return `${Math.floor(secondsDifference)} seconds ago`;
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(secondsDifference / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };
  // console.log({orgId, questionSet: questionSet.uid});

  const startQuizLabel =
    questionSet.quiz_type === "PR" ? "Start Tano Bora" : "Start Quiz";
  const closedQuizLabel =
    questionSet.quiz_type === "PR" ? "Tano Bora Closed" : "Quiz Closed";

  const url = questionSet.quiz_type === "PR" ? "tanobora" : "quiz";

  return (
    <li className="flex flex-col gap-1 p-2">
      <div className="flex justify-between border-b py-2">
        <h1 className="font-bold">{questionSet.category_name}</h1>
        <div className="whitespace-nowrap">
          {qSetStatus.getStatus(questionSet) === "not-started" && (
            <span
              className={`${qSetStatus.getBadgeColor(
                questionSet
              )} whitespace-nowrap`}
            >
              {"Not started"}
            </span>
          )}
          {qSetStatus.getStatus(questionSet) === "in-progress" && (
            <span className={qSetStatus.getBadgeColor(questionSet)}>
              {"In progress"}
            </span>
          )}
          {qSetStatus.getStatus(questionSet) === "closed" && (
            <span>{"Closed"}</span>
          )}
        </div>
      </div>

      {qSetStatus.getStatus(questionSet) === "not-started" && (
        <div className="flex flex-col gap-1">
          <div className="text-center">
            <span className=""> Will open in</span>
            <h1 className="tracking-wider font-mono font-bold text-lg">
              {`${
                Number(progressTime("start").days) > 0
                  ? progressTime("start").days + " days "
                  : ""
              }${progressTime("start").hours}:${
                progressTime("start").minutes
              }:${progressTime("start").seconds}`}
            </h1>
          </div>
        </div>
      )}

      {qSetStatus.getStatus(questionSet) === "in-progress" && (
        <div className="flex flex-col gap-1">
          <div className="text-center">
            <span className=""> Will close in</span>
            <h1 className="tracking-wider font-mono font-bold text-lg">
              {`${progressTime("end").hours}:${progressTime("end").minutes}:${
                progressTime("end").seconds
              }`}
            </h1>
          </div>
          <div className="flex">
            <Link
              className="text-white bg-green-800 font-medium uppercase w-full text-center px-2 py-1 rounded border"
              to={`/${url}/questionsets/${organizationId}/${questionSet.uid}/preplay`}
            >
              {startQuizLabel}
            </Link>
          </div>
        </div>
      )}

      {qSetStatus.getStatus(questionSet) === "closed" && (
        <div className="flex flex-col gap-1">
          <h1 className="text-red-500 font-bold text-center py-4 uppercase">
            {closedQuizLabel}
          </h1>
          <p className="text-center">Played: {afterPlay()}</p>
        </div>
      )}

      <div className="w-full flex">
        <Link
          className="text-white bg-primary font-medium capitalize w-full text-center px-2 py-1 rounded border "
          to={`/${url}/questionsets/${questionSet.uid}/leaderboard`}
        >
          leaderboard
        </Link>
      </div>
    </li>
  );
}
