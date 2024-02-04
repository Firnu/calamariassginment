import { configureStore } from "@reduxjs/toolkit"
import doctorSlice from "../redux/doctors/doctor.slice"
import { DoctorPageState } from "../redux/doctors/doctor.types"

export const testDoctors = {
    0: {
        id: 0,
        name: "Dean",
        lastName: "Winchester",
        isFavorite: false,
        ratingCount: 3,
        ratingSum: 15,
        specialization: "Demon Hunter",
        userRating: null,
        avatarSrc: null,
    },
    1: {
        id: 1,
        name: "Sam",
        lastName: "Winchester",
        isFavorite: true,
        ratingCount: 3,
        ratingSum: 14,
        specialization: "Demon Hunter",
        userRating: null,
        avatarSrc: null,
    },
    2: {
        id: 2,
        name: "Bobby",
        lastName: "Singer",
        isFavorite: false,
        ratingCount: 5,
        ratingSum: 20,
        specialization: "Demon Hunter",
        userRating: null,
        avatarSrc: null,
    },
}

export const testDoctorsState: DoctorPageState = {
    filteredDoctors: Object.values(testDoctors),
    filters: {
        favoriteOnly: false,
        search: "",
    },
    doctors: testDoctors,
}

export const testStore = configureStore({
    reducer: { doctors: doctorSlice },
    preloadedState: {
        doctors: testDoctorsState
    },
})
