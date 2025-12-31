import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to add delay to hover state
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {object} { isHovered, handleMouseEnter, handleMouseLeave }
 */
export const useHoverDelay = (delay = 500) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default useHoverDelay;
