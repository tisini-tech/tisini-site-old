import type { RouteObject } from "react-router-dom";

import BaseLayout from "@/layouts/BaseLayout";
import { BlogPage } from "@/pages/Blog/BlogPage";
import WalletPage from "@/pages/Wallet/WalletPage";
// import Homepage from "@/pages/Homepage/Homepage";
// import { BlogPage } from "@/pages/Blog/BlogPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import HomepageError from "@/pages/Homepage/HomepageError";
// import HomepageDataLoader from "@/pages/Homepage/HomepageDataLoader";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy/PrivacyPolicyPage";
import BingoPage from "@/pages/Bingo/BingoPage";

const baseRoutes = [
  {
    path: "/",
    element: <BlogPage />,
    // element: <Homepage />,
    // loader: HomepageDataLoader,
    errorElement: <HomepageError />,
  },
  {
    path: "/privacy-policy",
    element: (
      <BaseLayout>
        <PrivacyPolicyPage />
      </BaseLayout>
    ),
    errorElement: <HomepageError />,
  },
  {
    path: "/wallet",
    element: (
      <ProtectedLayout>
        <WalletPage />
      </ProtectedLayout>
    ),
  },
  {
    path: "/bingo/:bingoType",
    element: (
      <BaseLayout>
        <BingoPage />
      </BaseLayout>
    ),
  },
] satisfies RouteObject[];

export default baseRoutes;
