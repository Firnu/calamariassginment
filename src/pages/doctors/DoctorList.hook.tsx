import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useScreen } from "../../hooks/useScreen";
import { AppRootState } from "../../redux/store";

export type VirtualizedLayoutData = {
    columnGap: number,
    itemWidth: number,

    itemsCount: number,
    listWidth: number,

    itemsPerRow: number,
    rowCount: number,

    itemHeight: number,
    rowGap: number,
}

export function useDoctorList() {

    const filteredDoctors = useSelector((state: AppRootState) => state.doctors.filteredDoctors);
    const listContainerRef = useRef<HTMLDivElement | null>(null);

    // using callback to rerender the list on window resize so the virtualizer can rerender the 
    // items and keep responsiveness.
    useScreen();

    const columnGap = 31;
    const itemWidth = 323;

    const itemsCount = filteredDoctors.length;
    const listWidth = listContainerRef.current?.clientWidth ?? 1;

    const itemsPerRow = Math.max(Math.floor((listWidth + columnGap) / (itemWidth + columnGap)), 1);
    const rowCount = Math.ceil(itemsCount / itemsPerRow);

    const itemHeight = 454;
    const rowGap = 31;

    const layoutData: VirtualizedLayoutData = {
        columnGap,
        itemHeight,
        itemsCount,
        itemsPerRow,
        itemWidth,
        listWidth,
        rowCount,
        rowGap
    }

    const virtualizer = useWindowVirtualizer({
        count: rowCount,
        estimateSize: () => itemHeight + layoutData.rowGap,
        overscan: 1,
    });

    return { filteredDoctors, listContainerRef, virtualizer, layoutData };
}