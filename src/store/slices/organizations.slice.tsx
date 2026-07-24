import { OrganizationInterface } from "@/lib/types";
import { OrganizationsState } from "@/lib/types/state";
import { PaginatedResponse } from "@/lib/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrganizationsState = {
  organizations: {
    results: [],
    pagination: {
      hasNextPage: false,
      hasPrevPage: false,
      limit: 0,
      nextPage: null,
      page: 0,
      prevPage: null,
      totalDocs: 0,
      totalPages: 0,
    },
  },
  loading: false,
  error: "",
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    organizationsLoadStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    organizationsLoadSuccess: (
      state,
      action: PayloadAction<PaginatedResponse<OrganizationInterface>>
    ) => {
      state.loading = false;
      state.organizations = action.payload;
    },
    organizationsLoadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    organizationsSettle: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});
export const {
  organizationsLoadStart,
  organizationsLoadSuccess,
  organizationsLoadFailure,
  organizationsSettle,
} = organizationsSlice.actions;

export default organizationsSlice.reducer;
