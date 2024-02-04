import React from "react";
import { DoctorCard } from "./DoctorCard";
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from "../../utils/test.utils";
import '@testing-library/jest-dom';

describe("Doctor card", () => {
    test("displays full name", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);
        expect(screen.getByText("Dean Winchester")).toBeInTheDocument();
    });

    test("displays specialization", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);
        expect(screen.getByText("Demon Hunter")).toBeInTheDocument();
    })

    test("displays initials", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);
        expect(screen.getByText("DW")).toBeInTheDocument();
    })

    test("visually toggles favorites", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);

        const heartToggle = screen.getByTestId("heart");
        const heartIcon = screen.getByTestId("heart-icon");

        expect(heartToggle).toBeInTheDocument();
        expect(heartIcon).toBeInTheDocument();

        expect(heartIcon.classList.contains("activated")).toBe(false);

        fireEvent.click(heartToggle);

        expect(heartIcon.classList.contains("activated")).toBe(true);
    });

    test("changes stars visual state", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);

        const stars = screen.getAllByTestId("rating-star");
        expect(stars.length).toBe(5);

        stars.forEach((star) => {
            expect(star.classList.contains("selected")).toBe(false);
        })

        fireEvent.click(stars[2]);

        stars.forEach((star, index) => {
            const isSelected = index <= 2;
            expect(star.classList.contains("selected")).toBe(isSelected);
        })
    })

    test("changes average rating display", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);

        const stars = screen.getAllByTestId("rating-star");
        expect(stars.length).toBe(5);

        const ratingDisplay = screen.getByTestId("average-rating");
        expect(ratingDisplay.textContent).toContain("5.0");

        fireEvent.click(stars[2]);

        expect(ratingDisplay.textContent).toContain("4.5");
    });

    test("changes how many ratings were made", () => {
        renderWithProviders(<DoctorCard doctorId={0} />);

        const stars = screen.getAllByTestId("rating-star");
        expect(stars.length).toBe(5);

        const ratingCounter = screen.getByTestId("rating-counter");
        expect(ratingCounter.textContent).toContain(("3"));

        fireEvent.click(stars[2]);

        expect(ratingCounter.textContent).toContain(("4"));
    })
});