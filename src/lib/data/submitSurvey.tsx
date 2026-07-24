import axios from "axios";
import { SurveyAnswer } from "../types/survey";

export const submitSurvey = async (data: SurveyAnswer[]): Promise<any> => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post(`${url}?gettoken=${token}`, {
      action: "savesurvey",
      input: data,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to submit survey, ${error.message}`);
  }
};
