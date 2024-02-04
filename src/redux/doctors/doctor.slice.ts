import { createSlice } from "@reduxjs/toolkit";
import { getMockDoctors } from "../../services/doctorApi";
import { rateDoctorReducer, setFiltersReducer, toggleFavoriteDoctorReducer } from "./doctor.reducer";
import { DoctorPageState } from "./doctor.types";

const mockDoctors = getMockDoctors();

export const initialDoctorsState: DoctorPageState = {
    doctors: Object.fromEntries(mockDoctors.map(doctor => [doctor.id, doctor])),
    filteredDoctors: mockDoctors,
    filters: {
        search: "",
        favoriteOnly: false,
    }
}

const doctorsSlice = createSlice({
    name: "doctors",
    initialState: initialDoctorsState,
    reducers: {
        setFilters: setFiltersReducer,
        toggleFavorite: toggleFavoriteDoctorReducer,
        rateDoctor: rateDoctorReducer,
    },
});

export const { setFilters, toggleFavorite, rateDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;