import Notfound404 from "@/pages/Notfoud404/Notfound404";
import type { RouteObject } from "react-router-dom";
import articlesRoutes from "./articles.routes";
import authRoutes from "./auth.routes";
import baseRoutes from "./base.routes";
import { createBrowserRouter } from "react-router-dom";
import BaseErrorPage from "@/components/errors/BaseErrorPage";
import { RootLayout } from "./RootLayout";
import scoresRoutes from "./scores.routes";
import tournamentRoutes from "./tournaments";
import quizRoutes from "./quiz.routes";
import tanoboraRoutes from "./tanobora.routes";
import streamRoutes from "./stream.routes";
import surveyRoutes from "./survey.routes";
import votingRoutes from "./voting";

const routes = [
  {
    path: "/",
    errorElement: <BaseErrorPage />,
    element: <RootLayout />,
    children: [
      ...baseRoutes,
      authRoutes,
      articlesRoutes,
      quizRoutes,
      tanoboraRoutes,
      scoresRoutes,
      tournamentRoutes,
      streamRoutes,
      surveyRoutes,
      votingRoutes,
    ],
  },
  {
    path: "*",
    element: <Notfound404 />,
  },
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
