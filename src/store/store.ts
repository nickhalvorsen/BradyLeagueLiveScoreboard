import { configureStore } from "@reduxjs/toolkit";
import espnReducer from "./espnSlice";

export const store = configureStore({
    reducer: {
        espn: espnReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
