import { useEffect, useState } from "react";

/**
 * Returns the window screen and tracks the changes to the window.screen object.
 * WARNING: Will cause a rerender of the component that uses it anytime the screen changes
 * so keep that in mind.
 */
export function useScreen() {
    const [screen, setScreen] = useState<Screen>(window.screen);

    function onResize() {
        setScreen({
            ...window.screen,
        });
    }

    useEffect(() =>{
        window.addEventListener("resize", onResize);

        return () =>{
            window.removeEventListener("resize", onResize);
        }
    }, [])

    return screen;
}