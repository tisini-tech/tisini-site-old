import { type RouteObject } from "react-router-dom";

import { StreamsLayout } from "@/layouts/StreamsLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SingleStream from "@/pages/streams/SingleStream/SingleStream";
import { LowerThird } from "@/pages/streams/SingleStream/LowerThird";
import { SelectStream } from "@/pages/streams/Stream/SelectStream";
import MatchInsights from "@/pages/streams/SingleStream/MatchInsights";
import TournamentHistory from "@/pages/streams/SingleStream/TournamentHistory";
import TopStats from "@/pages/streams/SingleStream/TopStats";
import { StreamPage } from "@/pages/streams/Stream/Stream";
import LeagueStream from "@/pages/streams/league/LeagueStream";

const streamRoutes = {
  path: "/streams",
  element: <StreamsLayout />,
  children: [
    {
      path: "/streams",
      element: <SelectStream />,
    },
    {
      path: "/streams/:fixtureType",
      element: <StreamPage />,
    },
    {
      path: "/streams/:fixtureType/stats/:fixtureId",
      element: <SingleStream />,
    },
    {
      path: "/streams/:fixtureType/lowerthird/:fixtureId",
      element: <LowerThird />,
    },
    {
      path: "/streams/:fixtureType/insights/:fixtureId",
      element: <MatchInsights />,
    },
    {
      path: "/streams/:fixtureType/history/:fixtureId",
      element: <TournamentHistory />,
    },
    {
      path: "/streams/:fixtureType/top-stats/:fixtureId",
      element: <TopStats />,
    },
    {
      path: "/streams/league",
      element: <LeagueStream />,
    },
    {
      path: "*",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default streamRoutes;
