import BaseLayout from "@/layouts/BaseLayout";
import BlogCategory from "@/pages/Blog/BlogCategory";
import { BlogPage } from "@/pages/Blog/BlogPage";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SinglePostpage from "@/pages/Singlepost/SinglePostpage";
import { Outlet, type RouteObject } from "react-router-dom";

const articlesRoutes = {
  path: "/articles",
  element: (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
  children: [
    {
      path: "/articles",
      id: "articles",
      element: <BlogPage />,
    },
    {
      path: "/articles/:slug",
      id: "article",
      element: <SinglePostpage />,
    },
    {
      path: "/articles/categories/:category",
      id: "category",
      element: <BlogCategory />,
    },
    {
      path: "/articles/*",
      id: "articles-404",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default articlesRoutes;
