import { AppStates } from "../types/state";

export const APP_NAME = "tisini.co.ke-app-v1"

// const prefix = APP_NAME;


export const stateKeys: Record<AppStates, AppStates> = {
  // "tisini-app-authState": `${prefix}-authState`,
  "uz-stUsx-aasSWlsdw5242-00981": `uz-stUsx-aasSWlsdw5242-00981`,
};
export const defaultPagination = {
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  page: 1,
  limit: 10,
  totalDocs: 0,
  totalPages: 0,

};