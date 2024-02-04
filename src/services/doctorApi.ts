import { Doctor } from "./doctorApi.types";
import { generatePeople } from "./mockData";

let doctors: Doctor[] | null = null;

export function getMockDoctors(): Doctor[] {
    if (!doctors) {
        doctors = generatePeople(5000);
    }

    return doctors;
}