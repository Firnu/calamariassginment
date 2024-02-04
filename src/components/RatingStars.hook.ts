import { useState } from "react";

export function useRatingStars(
    initialValue: number | null,
    onRatingChanged?: (newRating: number) => void) {

    const [currentRating, setCurrentRating] = useState<number | null>(null);
    const usedRating = currentRating ?? initialValue;

    function onStarClick(starValue: number) {
        if (currentRating === starValue) {
            return;
        }

        setCurrentRating(starValue);

        if (onRatingChanged) {
            onRatingChanged(starValue);
        }
    }

    function isStarInSelection(starValue: number): boolean {
        if (usedRating === null) {
            return false;
        }

        return usedRating >= starValue;
    }

    return { onStarClick, isStarInSelection } as const;
}