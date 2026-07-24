/* eslint-disable @typescript-eslint/no-empty-function */

import { QuestionSetInterface } from "./types";
import moment from "moment";

type QuizSetStatus = "not-started" | "in-progress" | "closed";

type QuizSetPickedType = Pick<
  QuestionSetInterface,
  "end_datetime" | "start_datetime" | "status" 
>;

type BadgeColors =
  | "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
  | "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
  | "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full";

// const badgeColors: Record<QuizSetStatus, BadgeColors> = {
//   "not-started":
//     "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
//   "in-progress":
//     "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
//   closed:
//     "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
// };
type priorityType = 1 | 2 | 3;
class QsetStatus {
  private static instance: QsetStatus;
  private constructor() {}

  public static getInstance(): QsetStatus {
    if (!QsetStatus.instance) {
      QsetStatus.instance = new QsetStatus();
    }

    return QsetStatus.instance;
  }
  private badgeColors: Record<QuizSetStatus, BadgeColors> = {
    "not-started":
      "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
    "in-progress":
      "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
    closed:
      "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
  };

  public getStatus = (quizSetPicked: QuizSetPickedType): QuizSetStatus => {
    const { end_datetime, start_datetime, status } = quizSetPicked;
    const startDateTime = moment(start_datetime);
    const endDateTime = moment(end_datetime);
    const currentDateTime = moment();

    if (status === "PL") {
      return "closed";
    }

    if (currentDateTime.isBetween(startDateTime, endDateTime)) {
      return "in-progress";
    }

    if (currentDateTime.isAfter(endDateTime)) {
      return "closed";
    }

    return "not-started";
  };

  public getStartDate = (quizSetPicked: QuizSetPickedType): Date => {
    const { start_datetime } = quizSetPicked;
    const startDateTime = moment(start_datetime);

    return startDateTime.toDate();
  };

  public getEndDate = (quizSetPicked: QuizSetPickedType): Date => {
    const { end_datetime} = quizSetPicked;
    const endDateTime = moment(end_datetime);

    return endDateTime.toDate();
  };

  public getBadgeColor = (quizSetPicked: QuizSetPickedType): BadgeColors => {
    const status = this.getStatus(quizSetPicked);
    return this.badgeColors[status];
  };

  public getPriority = (quizSetPicked: QuizSetPickedType): priorityType => {
    const status = this.getStatus(quizSetPicked);

    switch (status) {
      case "not-started":
        return 2;
      case "in-progress":
        return 1;
      case "closed":
        return 3;
      default:
        return 3;
    }
  };
}
export default QsetStatus;
const QsetStatusInstance = QsetStatus.getInstance();
// eslint-disable-next-line react-refresh/only-export-components
export { QsetStatus, QsetStatusInstance as qSetStatus };