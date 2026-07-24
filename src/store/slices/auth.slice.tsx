import { Cookie } from "@/lib/services";
import { AuthState } from "@/lib/types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: "",
  access_token: "",
  isAuthenticated: false,
  refresh_token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
    ,
    logoutUser: (state) => {
      Cookie.removeToken('ck_63hsG-sscWPkl');
      state.loading = false;
      state.user = null;
      state.access_token = "";
      state.refresh_token = "";
      state.isAuthenticated = false;
    },

  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
