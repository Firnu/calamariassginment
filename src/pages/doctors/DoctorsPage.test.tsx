import React from "react";
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from "../../utils/test.utils";
import '@testing-library/jest-dom';
import { DoctorsPage } from "./DoctorsPage";

window.scrollTo = jest.fn();
jest.useFakeTimers();

describe("Doctors Page", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test("should display the doctors list correctly", () => {
        renderWithProviders(<DoctorsPage />);

        const cards = screen.getAllByTestId("doctor-card");
        expect(cards.length).toBe(3);
    });

    test("should filter doctors list by name", async () => {
        renderWithProviders(<DoctorsPage />);

        const searchFilter = screen.getByTestId("search-input");
        fireEvent.change(searchFilter, { target: { value: "sam" } });

        // search has a 250ms debounce time.
        act(() => jest.advanceTimersByTime(3000));

        const cards = screen.getAllByTestId("doctor-card");
        expect(cards.length).toBe(1);

        const card = cards[0];
        expect(card).toHaveTextContent("Sam Winchester");
    });

    test("should show only favorite when filter changes", () =>{
        renderWithProviders(<DoctorsPage />);

        let cards = screen.getAllByTestId("doctor-card");
        expect(cards.length).toBe(3);

        const favoritesTab = screen.getByTestId("tab-myspecialists");
        fireEvent.click(favoritesTab);

        cards = screen.getAllByTestId("doctor-card");
        expect(cards.length).toBe(1);
        
        const filteredCards = screen.getAllByTestId("heart-icon");
        filteredCards.forEach(card => expect(card.classList.contains("activated")).toBe(true));
    });
});