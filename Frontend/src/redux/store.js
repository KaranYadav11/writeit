import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice.js";

// Redux Persist configuration
const persistConfig = {
  key: "writeit", // Root key in the storage
  storage, // Storage engine (localStorage by default)
};

// Create a persisted reducer
const rootReducer = combineReducers({
  auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);
export default store;
