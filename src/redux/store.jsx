import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { StatisticsReducer } from "./statistics/slice";
import authReducer from './auth/slice'

const persistConfig = {
    key: 'root',
    storage,

};


const rootReducer = combineReducers({
    statistics: StatisticsReducer,
    auth: authReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer

});

export const persistor = persistStore(store);