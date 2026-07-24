import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useTisiniCookies from "@/hooks/useTisiniCookies";
import { logoutUser } from "@/store/slices/auth.slice";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { auth } = useAppSelector((state) => state.persist);
  const dispatch = useAppDispatch();
  const { refreshTokenValid, isCookie } = useTisiniCookies();
  //   React.useEffect(() => {
  //     if (!auth) {
  //       window.location.href = "/login";
  //     }
  //   }, [auth]);
  const currentUrl = useLocation().pathname;
  const encodedUrl = encodeURIComponent(currentUrl);
  const loginUrl = `/auth/login?_redirect=${encodedUrl}`;
  // if (!refreshTokenValid || !isCookie) {
  //   dispatch(logoutUser())
  //   console.log({
  //     accessTokenValid,
  //     refreshTokenValid,
  //     isCookie,
  //   });
  // }
  React.useEffect(() => {
    if (!(refreshTokenValid || isCookie)) {
      dispatch(logoutUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTokenValid, isCookie]);

  return auth.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate
      to={loginUrl}
      state={{
        from: encodedUrl,
      }}
      replace
    />
  );
}
