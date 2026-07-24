import { PayloadAction } from "@reduxjs/toolkit";
import { QuestionSetInterface } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

// import { defaultPagination } from "@/lib/constants";

/**
 * QuestionSetState
 */
export type QuestionSetState = {
  questionSets: Array<QuestionSetInterface>;
  loading: boolean;
  error: string;
};

const initialState: QuestionSetState = {
  error: "",
  loading: false,
  questionSets: [],
};

const questionSetSlice = createSlice({
  name: "questionSets",
  initialState,
  reducers: {
    questionSetsLoadStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    questionSetsLoadSuccess: (
      state,
      action: PayloadAction<Array<QuestionSetInterface>>
    ) => {
      state.loading = false;
      state.questionSets = action.payload;
    },
    questionSetsLoadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    questionSetsSettle: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});

export const {
  questionSetsLoadStart,
  questionSetsLoadSuccess,
  questionSetsLoadFailure,
  questionSetsSettle,
} = questionSetSlice.actions;
export default questionSetSlice.reducer;
