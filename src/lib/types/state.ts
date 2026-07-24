/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ArticleInterface,
  OrganizationInterface,
  PaginatedResponse,
  UserInterface,
} from ".";
import { stateKeys } from "../constants";

/**
 * AuthState
 */
export type AuthState = {
  user: UserInterface | null;
  loading: boolean;
  error: string;
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
};
/**
 * ArticlesState
 */
export type ArticlesState = {
  articles: PaginatedResponse<ArticleInterface>;
  loading: boolean;
  error: string;
};
/**
 * OrganizationsState
 */
export type OrganizationsState = {
  organizations: PaginatedResponse<OrganizationInterface>;
  loading: boolean;
  error: string;
};
/**
 * Sponsored articles
 */
export type SponsoredArticlesState = {
  articles: Array<ArticleInterface>;
  loading: boolean;
  error: string;
};

/**
 * Persistent state map
 */
export type PersistState = {
  auth: AuthState;
};

export type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

// export type Y = PickKeysType<s, keyof s>;

export type SortFunction<T> = (items: T[], field: string) => T[];
export type AppStates = /*"tisini-app-authState" |*/ "uz-stUsx-aasSWlsdw5242-00981";
export type LocalStorageKeyType = keyof typeof stateKeys;
export type TokenType = {
  accessToken: string;
  refreshToken: string;
};