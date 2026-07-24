import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import articlesSlice from "./slices/articles.slice";
import authSlice from "./slices/auth.slice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import organizationsSlice from "./slices/organizations.slice";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import questionSetsSlice from "./slices/question-sets.slice";
import quizPlaySlice from "./slices/quiz-play.slice";
import sponsoredArticlesSlice from "./slices/sponsored-articles.slice";
import { stateKeys } from "@/lib/constants";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: stateKeys["uz-stUsx-aasSWlsdw5242-00981"],
  version: 1,
  storage,
  whitelist: ["quizPlay", "auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  quizPlay: quizPlaySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persist: persistedReducer,
    organizations: organizationsSlice,
    questionSets: questionSetsSlice,
    articles: articlesSlice,
    sponsoredArticles: sponsoredArticlesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor };

export default store;
