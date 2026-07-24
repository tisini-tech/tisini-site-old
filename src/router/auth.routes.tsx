import { NoAuth } from "@/layouts/NoAuth";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import ProfilePage from "@/pages/Profile/ProfilePage";
import AppAuth from "@/pages/auth/AppAuth";
import { Outlet, type RouteObject } from "react-router-dom";

const authRoutes = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "/auth/login",
      element: (
        <NoAuth>
          <AppAuth />
        </NoAuth>
      ),
    },
    {
      // ForgotPassword
      path: "/auth/forgot-password",
      element: (
        <NoAuth>
          <ForgotPassword />
        </NoAuth>
      ),
    },
    {
      path: "/auth/profile",
      element: (
        <ProtectedLayout>
          <ProfilePage />
        </ProtectedLayout>
      ),
    }
  ],
} satisfies RouteObject;

export default authRoutes;
