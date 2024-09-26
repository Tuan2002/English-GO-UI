import { useState, useEffect } from 'react';
/**
 * Custom hook to debounce a value or callback function.
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds.
 * @returns The debounced value or function.
 */
// eslint-disable-next-line
function useDebounce<T>(value: T, delay: number): T {
  // State and setter for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
