import { ArticleInterface } from "@/lib/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { SponsoredArticlesState } from "@/lib/types/state";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SponsoredArticlesState = {
  articles: [],
  loading: false,
  error: "",
};

const sponsoredArticlesSlice = createSlice({
  name: "sponsoredArticles",
  initialState,
  reducers: {
    sponsoredArticlesLoadStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    sponsoredArticlesLoadSuccess: (
      state,
      action: PayloadAction<ArticleInterface[]>
    ) => {
      state.loading = false;
      state.articles = action.payload;
    },
    sponsoredArticlesLoadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    sponsoredArticlesSettle: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});

export const {
  sponsoredArticlesLoadStart,
  sponsoredArticlesLoadSuccess,
  sponsoredArticlesLoadFailure,
  sponsoredArticlesSettle,
} = sponsoredArticlesSlice.actions;

export default sponsoredArticlesSlice.reducer;
