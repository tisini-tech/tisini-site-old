import { Outlet, RouteObject } from "react-router-dom";

// import LeaguesPage from "@/pages/scores/leagues/Leagues";
import LeaguesLayout from "@/layouts/LeaguesLayout";

const LeagueRoutes = {
  path: "/scores/leagues",
  element: (
    <LeaguesLayout>
      <Outlet />
    </LeaguesLayout>
  ),
  children: [
    // {
    //   path: "/scores/leagues/:leagueId",
    //   element: <LeaguesPage />,
    // },
  ],
} satisfies RouteObject;

export default LeagueRoutes;
