import { Doctor } from "../../services/doctorApi.types"

export type DoctorPageState = {
    // doctors as key,value dictionary to let the cards subscribe to proper doctor on their own (easier to test)
    doctors: { [key: string]: Doctor }, 
    filteredDoctors: Doctor[],
    filters: DoctorsFilter,
}

export type DoctorsFilter = {
    search: string,
    favoriteOnly: boolean,
}

export type SetFiltersPayload = Partial<DoctorsFilter>;

export type ToggleFavoritePayload = {
    doctorId: number,
}

export type RateDoctorPayload = {
    doctorId: number,
    newRating: number,
}