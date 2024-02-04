import { act, renderHook } from "@testing-library/react";
import { Wrapper } from "../../utils/test.utils";
import { useDoctorCard } from "./DoctorCard.hook";

describe("Doctor card hooks", () => {
    test("creates proper initials", () => {
        const { result } = renderHook(() => useDoctorCard(0), { wrapper: Wrapper });
        expect(result.current.doctorInitials).toBe("DW");
    })

    test("toggles favorites", () => {
        const { result } = renderHook(() => useDoctorCard(0), { wrapper: Wrapper });

        expect(result.current.doctor.isFavorite).toBe(false);
        act(() => result.current.toggleHeart());
        expect(result.current.doctor.isFavorite).toBe(true);
    })

    test("changes doctor rating through stars and respond to state change", () =>{
        const { result } = renderHook(() => useDoctorCard(0), { wrapper: Wrapper });

        let testDoctor = result.current.doctor;
    
        let doctorAverageRating = testDoctor.ratingSum / testDoctor.ratingCount;
        expect(testDoctor.userRating).toBe(null);
        expect(testDoctor.ratingCount).toBe(3)
        expect(testDoctor.ratingSum).toBe(15)
        expect(doctorAverageRating).toBe(5);

        act(() => result.current.selectStar(1));

        testDoctor = result.current.doctor;
        
        doctorAverageRating = testDoctor.ratingSum / testDoctor.ratingCount;
        expect(testDoctor.ratingCount).toBe(4);
        expect(testDoctor.ratingSum).toBe(16);
        expect(doctorAverageRating).toBe(4);
    })
})