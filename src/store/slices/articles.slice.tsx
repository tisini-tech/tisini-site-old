import { ArticleInterface, PaginatedResponse } from "@/lib/types";

import { ArticlesState } from "@/lib/types/state";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { defaultPagination } from "@/lib/constants";

const initialState: ArticlesState = {
  loading: false,
  error: "",
  articles: {
    results: [],
    pagination: { ...defaultPagination },
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,

  reducers: {
    articlesLoadStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    articlesLoadSuccess: (
      state,
      action: PayloadAction<PaginatedResponse<ArticleInterface>>
    ) => {
      state.loading = false;
      state.articles = action.payload;
    },
    articlesLoadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    articlesSettle: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});
export const {
  articlesLoadStart,
  articlesLoadSuccess,
  articlesLoadFailure,
  articlesSettle,
} = articlesSlice.actions;
export default articlesSlice.reducer;
