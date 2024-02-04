import { rateDoctor, setFilters, toggleFavorite } from "./doctor.slice";
import doctorsReducer from "./doctor.slice";
import { testDoctorsState } from "../../utils/test.data";

describe("Doctors state", () => {
    test("should properly resolve filtered doctors", () => {
        const searchPhrase = "sa";

        const newState = doctorsReducer(testDoctorsState, setFilters({
            search: searchPhrase,
            favoriteOnly: true,
        }));

        const correctFilteredDoctors = newState.filteredDoctors.every((doctor) => {
            const fullName = doctor.name + " " + doctor.lastName;
            const titleOk = fullName.toLowerCase().includes(searchPhrase.toLowerCase());
            const specializationOk = doctor.specialization.toLowerCase().includes(searchPhrase.toLowerCase());
            const favoritismOk = doctor.isFavorite;
            return (titleOk || specializationOk) && favoritismOk;
        });

        expect(correctFilteredDoctors).toBe(true);
    });

    test("should property toggle doctor favorite state", () => {
        expect(testDoctorsState.doctors).not.toBe(null);

        if (testDoctorsState.doctors === null) {
            return;
        }

        expect(testDoctorsState.doctors[2].isFavorite).toBe(false);

        let newState = doctorsReducer(testDoctorsState, toggleFavorite({
            doctorId: 2,
        }));

        expect(newState.doctors[2].isFavorite).toBe(true);

        newState = doctorsReducer(newState, toggleFavorite({
            doctorId: 2,
        }));

        expect(newState.doctors[2].isFavorite).toBe(false);
    });

    test("should properly set new doctor rating", () => {
        let testDoctor = testDoctorsState.doctors[0];

        let doctorAverageRating = testDoctor.ratingSum / testDoctor.ratingCount;
        expect(testDoctor.ratingCount).toBe(3)
        expect(testDoctor.ratingSum).toBe(15)
        expect(doctorAverageRating).toBe(5);

        let newState = doctorsReducer(testDoctorsState, rateDoctor({
            doctorId: 0,
            newRating: 1,
        }));

        testDoctor = newState.doctors[0];

        doctorAverageRating = testDoctor.ratingSum / testDoctor.ratingCount;
        expect(testDoctor.ratingCount).toBe(4);
        expect(testDoctor.ratingSum).toBe(16);
        expect(doctorAverageRating).toBe(4);
    });
})