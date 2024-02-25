import { useEffect } from "react";

/**
 * Will debounce a callback function as long as the provided value changes.
 * @param value That controls the debounce.
 * @param callback Function to be called when debounce fired after the specified time.
 * @param delay The time window in milliseconds for the debounce (500 default).
 */
export function useDebouncedCallback<T>(value: T, callback: () => void, delayMs?: number) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            callback();
        }, delayMs ?? 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delayMs])
}