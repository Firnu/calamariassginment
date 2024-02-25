import { useDispatch, useSelector } from "react-redux";
import { rateDoctor, toggleFavorite } from "../../../redux/doctors/doctor.slice";
import { AppDispatch, AppRootState } from "../../../redux/store";

export function useDoctorCard(doctorId: number) {
    const doctor = useSelector((state: AppRootState) =>
        state.doctors.doctors ?
            state.doctors.doctors[doctorId] : null);
    const dispatch = useDispatch<AppDispatch>();

    if (!doctor) {
        throw new Error("Rendered a card with non-existing doctorId. This should not happen.");
    }

    const doctorInitials = doctor.name[0] + doctor.lastName[0];

    function logInput(element: string) {
        console.log(`${element} clicked.`);
    }

    function toggleHeart() {
        logInput("heart");
        dispatch(toggleFavorite({ doctorId: doctorId }));
    }

    function selectStar(selectedStarValue: number) {
        console.log(`star - value ${selectedStarValue}`);
        dispatch(rateDoctor({
            doctorId: doctorId,
            newRating: selectedStarValue,
        }));
    }

    return { doctor, doctorInitials, toggleHeart, selectStar, logInput };
}