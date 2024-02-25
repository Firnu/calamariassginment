import React from "react";
import "./DoctorsPage.scss";
import { Tabs } from "../../components/Tabs";
import { DoctorsSearchInput } from "./@components/DoctorsSearchInput";
import { DoctorsList } from "./@components/DoctorsList";
import { useDoctorsPage } from "./DoctorsPage.hook";

export function DoctorsPage() {
    const [
        filteredDoctors,
        availableTabs,
        startTab,
        chosenTab,
        onTabChanged] = useDoctorsPage();

    return <div className="doctors-container">
        <nav className="doctors-nav">
            <div>
                <h1 className="main-label bold">{chosenTab.label} ({filteredDoctors.length})</h1>
            </div>
            <Tabs
                onTabChanged={(tab) => onTabChanged(tab)}
                startTab={startTab}
                tabs={availableTabs} />
            <div>
                <DoctorsSearchInput />
            </div>
        </nav>
        <DoctorsList />
    </div>
}