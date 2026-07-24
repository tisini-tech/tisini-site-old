import { type RouteObject } from "react-router-dom";

import LeaguesPage from "@/pages/scores/leagues/Leagues";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";

import SingleFixture from "@/pages/scores/SingleFixture/SingleFixture";
import ScoresLayout from "@/layouts/ScoresLayout";
import { FixturesPage } from "@/pages/scores/Fixtures/Fixtures";

const scoresRoutes = {
  path: "/scores",
  element: (
    <ThemeProviderWrapper>
      <ScoresLayout />
    </ThemeProviderWrapper>
  ),
  children: [
    {
      path: "/scores/leagues/:leagueId",
      element: <LeaguesPage />,
    },
    {
      path: "/scores/:fixtureType/:fixtureId",
      element: <SingleFixture />,
    },
    {
      path: "/scores/:fixtureType",
      element: <FixturesPage />,
    },
  ],
} satisfies RouteObject;

export default scoresRoutes;
