import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_DELAY = 300;

/**
 * Custom hook to debounce a value
 * @param {*} value - Input value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {*} debouncedValue
 */
const useDebounce = (value, delay = DEFAULT_DEBOUNCE_DELAY) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        try {
            // Validate delay
            const safeDelay =
                typeof delay === "number" && delay >= 0
                    ? delay
                    : DEFAULT_DEBOUNCE_DELAY;

            const timer = setTimeout(() => {
                setDebouncedValue(value);
            }, safeDelay);

            return () => clearTimeout(timer);
        } catch (error) {
            logger.error("useDebounce error", error);
        }
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;