import { Cookie } from "@/lib/services";
import { TokenType } from "@/lib/types/state";
import jwtDecode, { JwtPayload } from "jwt-decode";
import React from "react";

export default function useTisiniCookies() {
  const [cookies, setCookieToken] = React.useState<TokenType | null>(
    Cookie.getCookieToken("ck_63hsG-sscWPkl")
  );
  const isCookie = React.useMemo(() => {
    if (typeof cookies === "object") {
      const cookieAvailable =
        cookies !== null && Object.keys(cookies).length > 0 ? true : false;
      if (cookieAvailable) {
        const accessToken = cookies!.accessToken;
        const refreshToken = cookies!.refreshToken;
        if (accessToken && refreshToken) {
          const accessTokenValid: JwtPayload = jwtDecode(accessToken);
          const refreshTokenValid: JwtPayload = jwtDecode(refreshToken);
          const currentTime = new Date().getTime() / 1000;
          const accessTokenExpTime = accessTokenValid.exp;
          const refreshTokenExpTime = refreshTokenValid.exp;
          if (
            currentTime > accessTokenExpTime! ||
            currentTime > refreshTokenExpTime!
          ) {
            return false;
          }
          return true;
        }
        return false;
      }

      return cookies !== null &&
        cookies !== undefined &&
        Object.keys(cookies).length > 0
        ? true
        : false;
    }
    // const isCookieObj
    return cookies !== null || cookies !== undefined || cookies !== "";
  }, [cookies]);
  const accessTokenValid = React.useMemo(() => {
    if (cookies) {
      if (cookies.accessToken) {
        const token: JwtPayload = jwtDecode(cookies.accessToken);
        const currentTime = new Date().getTime() / 1000;
        const expTime = token.exp;
        if (currentTime > expTime!) {
          return false;
        }
        return true;
      }
    }
    return false;
  }, [cookies]);
  const refreshTokenValid = React.useMemo(() => {
    if (cookies) {
      if (cookies.refreshToken) {
        const token: JwtPayload = jwtDecode(cookies.refreshToken);
        const currentTime = new Date().getTime() / 1000;
        const expTime = token.exp;
        if (currentTime > expTime!) {
          return false;
        }
        return true;
      }
    }
    return false;
  }, [cookies]);
  return {
    cookies,
    isCookie,
    setCookieToken,
    accessTokenValid,
    refreshTokenValid,
  };
}
