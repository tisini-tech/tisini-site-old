import BaseLayout from "@/layouts/BaseLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Organizationspage from "@/pages/Organizations/Organizationspage";
import PlayQuiz from "@/pages/PlayQuiz/PlayQuiz";
import QuestionsetLeaderboard from "@/pages/QuestionSetLeaderboard/QuestionsetLeaderboard";
import QuestionSetsPage from "@/pages/QuestionSets/QuestionSetsPage";
import QuizLeaderboard from "@/pages/quiz/QuizLeaderboard";
import QuizPrePlayPage from "@/pages/QuizPrePlay/QuizPrePlayPage";
import { Outlet, type RouteObject } from "react-router-dom";

const quizRoutes = {
  path: "/quiz",
  element: (
    <BaseLayout>
      <ProtectedLayout>
        <Outlet />
      </ProtectedLayout>
    </BaseLayout>
  ),
  children: [
    {
      path: "/quiz",
      index: true,
      element: <Organizationspage />,
    },
    {
      // TODO: Add a route for the organization page
      path: "/quiz/:organizationId",
      element: <QuestionSetsPage />,
      children: [],
    },
    {
      // TODO: Add a route for the organization page
      path: "/quiz/:organizationId/leaderboard",
      element: <QuizLeaderboard />,
      children: [],
    },
    {
      // TODO: Add a route for the single question set page
      path: "/quiz/questionsets/:organizationId/:questionSetId/preplay",
      element: <QuizPrePlayPage />,
      children: [],
    },
    // TODO: Play quiz route
    {
      path: "/quiz/questionsets/:organizationId/:questionSetId/play",
      element: <PlayQuiz />,
      children: [],
    },
    // TODO: Add a route for leaderboard
    {
      path: "/quiz/questionsets/:questionSetId/leaderboard",
      element: <QuestionsetLeaderboard />,
      children: [],
    },
  ],
} satisfies RouteObject;

export default quizRoutes;
