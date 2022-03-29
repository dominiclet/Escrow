import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Setup interval
    useEffect(() => {
        if (delay != null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => {
                clearInterval(id);
            }
        }
    }, [callback, delay]);
}

export default useInterval;