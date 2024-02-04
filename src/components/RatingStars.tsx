import React from "react";
import { useRatingStars } from "./RatingStars.hook";
import "./ratingstars.scss";

type RatingStarsProps = {
    initialValue: number | null;
    onRatingChanged?: (newRating: number) => void;
}

export function RatingStars({ initialValue, onRatingChanged }: RatingStarsProps) {
    const { onStarClick, isStarInSelection } = useRatingStars(initialValue, onRatingChanged);

    return <div className="stars-container">
        {
            Array.from({ length: 5 }, (_, index) =>
                <button
                    key={index}
                    className={`star${isStarInSelection(index + 1) ? " selected" : ""}`}
                    onClick={() => onStarClick(index + 1)}
                    data-testid="rating-star" />)
        }
    </div>
}