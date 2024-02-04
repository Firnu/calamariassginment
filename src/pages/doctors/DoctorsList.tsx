import { VirtualItem } from "@tanstack/react-virtual";
import React from "react";
import { DoctorCard } from "./DoctorCard";
import { useDoctorList } from "./DoctorList.hook";
import "./DoctorsList.scss"

export function DoctorsList() {
    const {
        filteredDoctors,
        listContainerRef,
        virtualizer,
        layoutData } = useDoctorList();

    function renderRow(virtualRow: VirtualItem) {
        const rowCards = [];
        const fromIndex = virtualRow.index * layoutData.itemsPerRow;
        const toIndex = Math.min(fromIndex + layoutData.itemsPerRow, layoutData.itemsCount);

        for (let i = fromIndex; i < toIndex; i++) {
            const doctor = filteredDoctors[i];
            rowCards.push(<DoctorCard key={doctor.id} doctorId={doctor.id} />);
        }

        return (
            <div
                key={virtualRow.index}
                className="list-row"
                style={{
                    height: layoutData.itemHeight,
                    gap: `${layoutData.columnGap}px`,
                    transform: `translateY(${virtualRow.start}px)`
                }}>{
                    rowCards.map((card) => card)
                }
            </div>
        )
    }

    return <div
        className="doctor-cards-container"
        ref={listContainerRef}
        style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
        }}> {
            virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => renderRow(virtualRow))
        }
    </div>
}