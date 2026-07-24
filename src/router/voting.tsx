import { Outlet, type RouteObject } from "react-router-dom";

import VotingPage from "@/pages/voting";
import BaseLayout from "@/layouts/BaseLayout";
import VoteCastingPage from "@/pages/voting/VoteCasting";

const votingRoutes = {
  path: "/voting",
  element: (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
  children: [
    {
      path: "/voting",
      element: <VotingPage />,
    },
    {
      path: "/voting/:votingCauseId/castVote",
      element: <VoteCastingPage />,
    },
  ],
} satisfies RouteObject;

export default votingRoutes;
