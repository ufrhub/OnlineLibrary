import { configureStore as ConfigureStore } from "@reduxjs/toolkit";
import { combineReducers as CombineReducers } from "redux";
import { thunk as Thunk } from "redux-thunk";
import { logger as Logger } from "redux-logger";
import {
    persistStore as PersistStore,
    persistReducer as PersistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import LocalStorage from "redux-persist/es/storage";
// import SessionStorage from "redux-persist/es/storage/session";
import BookReducers from "./Reducers/BookReducers";

const PersistConfiguration = {
    key: "root",
    storage: LocalStorage,
    whitelist: ['BookReducers']
};

const RootReducers = CombineReducers({
    BookReducers: BookReducers
});

const PersistedReducer = PersistReducer(PersistConfiguration, RootReducers);

export const Store = ConfigureStore({
    reducer: PersistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(Thunk, Logger)
});

export const Persistor = PersistStore(Store);