import SurveyPage from "@/pages/survey/Survey";
import type { RouteObject } from "react-router-dom";

const surveyRoutes = {
  path: "/survey",
  element: <SurveyPage />,
} satisfies RouteObject;

export default surveyRoutes;
