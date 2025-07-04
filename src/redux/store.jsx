import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { StatisticsReducer } from "./statistics/slice";
import { improvisedReducer } from "./improvised/slice";
import authReducer from './auth/slice';
import { filterReducer } from './filter/slice'
import { settingsReducer } from "./settings/slice";

import { giftsReducer } from './gift/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["filter", "auth", 'improvised']
};


const rootReducer = combineReducers({
  statistics: StatisticsReducer,
  auth: authReducer,
  filter: filterReducer,
  settings: settingsReducer,
  improvised: improvisedReducer,
  gifts: giftsReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);