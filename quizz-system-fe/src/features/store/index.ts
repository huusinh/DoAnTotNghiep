import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../slices/loading.slice";
import { messagesReducer } from "../slices/messages.slice";
import { authenticationReducer } from "../slices/authentication.slice";
import { keywordsReducer } from "../slices/keywords.slice";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { quizzReducer } from "../slices/quizz.slice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  messages: messagesReducer,
  authentication: authenticationReducer,
  keywords: keywordsReducer,
  quizz: quizzReducer
});

const peristConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication']
}

const persistedRootReducer = persistReducer(peristConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;