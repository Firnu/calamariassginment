import React, { HTMLAttributes } from "react";
import "./DoctorCard.scss";
import { RatingStars } from "../../../components/RatingStars";
import { useDoctorCard } from "./DoctorCard.hook";

interface DoctorCardProps extends HTMLAttributes<React.ReactNode> {
    doctorId: number,
}

export function DoctorCard({ doctorId }: DoctorCardProps) {
    const { doctor, doctorInitials, toggleHeart, selectStar, logInput } = useDoctorCard(doctorId);

    return <article className="doctor-card flex column" data-testid="doctor-card">
        <section className="top-buttons-container">
            <button className="icon-button top-button secondary-on-hover" aria-label="More" onClick={() => logInput("more")}>
                <div className="icon kick-on-click more-button" />
            </button>
            <button className={`icon-button top-button`} aria-label="Favorite" onClick={toggleHeart} data-testid="heart">
                <div className={`icon kick-on-click heart-button${doctor.isFavorite ? " activated" : ""}`} data-testid="heart-icon" />
            </button>
        </section>
        <section className="flex column align-center avatar-container">
            <div className="doctor-pic-background">
                {
                    doctor.avatarSrc ?
                        <div className="avatar" style={{ backgroundImage: `url("${doctor.avatarSrc}")` }} /> :
                        <span className="initials">{doctorInitials}</span>
                }
            </div>
            <h2 className="name-label">{doctor.name + " " + doctor.lastName}</h2>
            <h3 className="specialization-label">{doctor.specialization}</h3>
        </section>
        <div className="grow"></div>
        <section className="middle-buttons-container">
            <button className="icon-button middle-button" aria-label="Notify" onClick={() => logInput("bell")}>
                <div className="icon kick-on-click grow bell-button" />
            </button>
            <button className="icon-button middle-button" aria-label="Schedule" onClick={() => logInput("calendar")}>
                <div className="icon kick-on-click grow calendar-button" />
            </button>
            <button className="icon-button middle-button" aria-label="Contact" onClick={() => logInput("mail")}>
                <div className="icon kick-on-click grow mail-button" />
            </button>
        </section>
        <section className="rating-container">
            <div className="flex align-center">
                <RatingStars initialValue={doctor.userRating} onRatingChanged={selectStar} />
            </div>
            <div className="flex column align-center justify-center">
                <span className="average-rating" data-testid="average-rating">{doctor.ratingCount > 0 ? (doctor.ratingSum / doctor.ratingCount).toFixed(1) : "-"}</span>
                <span className="rating-counter" data-testid="rating-counter">({doctor.ratingCount === 0 ? "n/d" : doctor.ratingCount})</span>
            </div>
        </section>
        <section className="flex row bottom-buttons-container">
            <button className="bottom-button" aria-label="Open profile" onClick={() => logInput("profile")}><span>PROFILE</span></button>
            <button className="bottom-button" aria-label="Book appointment" onClick={() => logInput("book")}><span>BOOK A VISIT</span></button>
        </section>
    </article >
}