import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctors/doctor.slice";

export const store = configureStore({
    reducer: {
        doctors: doctorSlice,
    },
});

export type AppStore = typeof store;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;