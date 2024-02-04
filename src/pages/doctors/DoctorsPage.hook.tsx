import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "../../components/Tabs";
import { setFilters } from "../../redux/doctors/doctor.slice";
import { AppDispatch, AppRootState } from "../../redux/store";

const availableTabs = [
    { id: "favorite", label: "All favorite" },
    { id: "myspecialists", label: "My specialists" },
]

const startTab = availableTabs[0];

export function useDoctorsPage() {
    const [chosenTab, setChosenTab] = react.useState<Tab>(startTab);

    const dispatch = useDispatch<AppDispatch>();
    const filteredDoctors = useSelector((state: AppRootState) => state.doctors.filteredDoctors);

    function onTabChanged(tab: Tab) {
        setChosenTab(tab);
        dispatch(setFilters({
            favoriteOnly: tab.id === "myspecialists",
        }));
    }

    return [filteredDoctors, availableTabs, startTab, chosenTab, onTabChanged] as const;
}