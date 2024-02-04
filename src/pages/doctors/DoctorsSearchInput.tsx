import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setFilters } from "../../redux/doctors/doctor.slice";
import "./DoctorsSearchInput.scss";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";

export function DoctorsSearchInput() {
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    useDebouncedCallback(
        search, () => {
            dispatch(setFilters({
                search: search,
            }));
        },
        250);

    return <input
        type="text"
        id="search-field"
        aria-label="search field"
        placeholder="Search..."
        data-testid="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
}