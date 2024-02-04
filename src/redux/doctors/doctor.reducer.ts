import { PayloadAction } from "@reduxjs/toolkit";
import { DoctorPageState, DoctorsFilter, RateDoctorPayload, SetFiltersPayload, ToggleFavoritePayload } from "./doctor.types";
import { Doctor } from "../../services/doctorApi.types";
import { getMockDoctors } from "../../services/doctorApi";

export function loadDoctors(state: DoctorPageState) {
    const mockDoctors = getMockDoctors();
    const doctors = Object.fromEntries(mockDoctors.map(doctor => [doctor.id, doctor]));

    return {
        ...state,
        areDoctorsLoaded: true,
        doctors: doctors,
        filteredDoctors: mockDoctors,
    }
}

export function setFiltersReducer(state: DoctorPageState, { payload }: PayloadAction<SetFiltersPayload>) {
    const newFilters: DoctorsFilter = {
        ...state.filters,
        ...payload
    };

    state.filters = newFilters;
    state.filteredDoctors = filterDoctors(state.doctors, newFilters);
}

export function toggleFavoriteDoctorReducer(state: DoctorPageState, { payload }: PayloadAction<ToggleFavoritePayload>) {
    const doctor = state.doctors[payload.doctorId];

    if (doctor) {
        doctor.isFavorite = !doctor.isFavorite;
    }

    state.filteredDoctors = filterDoctors(state.doctors, state.filters);
}

export function rateDoctorReducer(state: DoctorPageState, { payload }: PayloadAction<RateDoctorPayload>) {
    const doctor = state.doctors[payload.doctorId];

    let ratingSum = doctor.ratingSum;
    let ratingCount = doctor.ratingCount;

    // remove previous rating the player applied if existing
    if (doctor.userRating) {
        ratingSum -= doctor.userRating;
        ratingCount--;
    }

    ratingSum += payload.newRating;
    ratingCount++;

    // calculate new rating
    if (doctor) {
        doctor.userRating = payload.newRating;
        doctor.ratingSum = ratingSum;
        doctor.ratingCount = ratingCount;
    }
}

function filterDoctors(doctors: { [key: string]: Doctor }, { search, favoriteOnly }: DoctorsFilter): Doctor[] {
    return Object.values(doctors).filter((doctor) => {
        const fullName = doctor.name + " " + doctor.lastName;
        const searchOk = fullName.toLowerCase().includes(search.toLowerCase()) || doctor.specialization.toLowerCase().includes(search.toLowerCase());
        const favoriteOk = !favoriteOnly || doctor.isFavorite;
        return searchOk && favoriteOk;
    });
}