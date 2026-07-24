import { checkObjectProp } from "./check-obj-prop";
import { AnswerInterface } from "./types";
import { QuestionProgress } from "@/store/slices/quiz-play.slice";

type APIAnswer = {
  questions: Array<{
    question_text: string;
    user_answers: Array<{
      answer_text: string;
    }>;
  }>;
  points_earned: null | number;
  time_used: null | number;
};

type QuestionWithAnswersProgress = Array<QuestionProgress>;

// a Singleton class to create answers for API payload
export class AnswerCreator {
  private static instance: AnswerCreator;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  static getInstance(): AnswerCreator {
    if (!AnswerCreator.instance) {
      AnswerCreator.instance = new AnswerCreator();
    }
    return AnswerCreator.instance;
  }

  createPayload(questionProgress: QuestionWithAnswersProgress): APIAnswer {
    const answer: APIAnswer =
      this.createFromProgressQuestions(questionProgress);
    // console.log({ answer });

    return answer;
  }
  private createFromProgressQuestions(
    questionProgress: QuestionWithAnswersProgress
  ): APIAnswer {
    const questions = questionProgress.map((progress) => {
      return AnswerCreator.extractQuestionAndAnswers(progress);
    }) as unknown as Pick<APIAnswer, "questions">;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const points_earned = (
      questions as unknown as Array<{ points: number }>
    ).reduce((acc, question) => {
      return acc + question.points;
    }, 0);
    const time_used = (
      questions as unknown as Array<{ duration: number }>
    ).reduce((acc, question) => {
      return acc + question.duration;
    }, 0);

    // console.log({ questions });

    return {
      questions: (questions as unknown as APIAnswer["questions"]).map(
        (question) => {
          const { user_answers, question_text } = question;
          return {
            question_text,
            user_answers,
          };
        }
      ),

      points_earned: points_earned > 0 ? points_earned : 0,
      time_used: time_used > 0 ? time_used : 0,
    };
  }

  public static extractQuestionAndAnswers(payload: QuestionProgress) {
    const points =  checkObjectProp(payload.question, 'selected_answer', ({ selected_answer }) => {
      return checkObjectProp(selected_answer as AnswerInterface, 'is_answer', (ans) => ans.is_answer) ? true : false
    }) ? 10 : 0
    const quizWithPoints =
      payload.question.quiz_type === "multiple"
        ? {
          question_text: payload.question.question,
          points: payload.question.points / payload.question.answers.length,
          duration: payload.duration,
          status: payload.status,
        }
        : payload.question.quiz_type === "text"
          ? {
            question_text: payload.question.question,
            points:  points,
            duration: payload.duration,
            status: payload.status,
          }
          : {
            question_text: payload.question.question,
            points: points,
            duration: payload.duration,
            status: payload.status,
          };
    const question_text = payload.question.question;
    const user_answers = payload.answer as AnswerInterface;

    let answers = [] as { answer_text: string }[];
    if (typeof user_answers === "string") {
      answers = [{ answer_text: user_answers }];
    } else if (Array.isArray(user_answers) && user_answers.length > 0) {
      answers = user_answers.map((answer: AnswerInterface) => ({
        answer_text: answer.answer,
      }));
    } else if (typeof user_answers === "object") {
      answers = [{ answer_text: user_answers.answer }];
    }
    return {
      question_text,
      user_answers: answers,
      points: quizWithPoints.points,
      duration: quizWithPoints.duration,
      status: quizWithPoints.status,
    };
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default AnswerCreator.getInstance();
