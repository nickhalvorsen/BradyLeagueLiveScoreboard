import { configureStore } from "@reduxjs/toolkit";
import { espnSlice } from "./espnSlice";

export const store = configureStore({
    reducer: {
        espn: espnSlice.reducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
