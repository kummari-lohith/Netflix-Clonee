import React, { useRef, useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieRow.module.css';

const MovieRow = ({ title, movies, isLargeRow = false }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll by 5 cards (approximately 1250px for normal cards, 1500px for large)
  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = isLargeRow ? 1500 : 1250;
      const scrollTo = direction === 'left' 
        ? rowRef.current.scrollLeft - scrollAmount
        : rowRef.current.scrollLeft + scrollAmount;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });

      // Check position after scroll animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFocused) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scroll('left');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scroll('right');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  return (
    <div 
      className={styles.movieRow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      {/* Category Title */}
      <h2 className={styles.title}>
        {title}
      </h2>

      {/* Row Container with Arrows */}
      <div style={{ position: 'relative' }}>
        {/* Left Arrow */}
        {showLeftArrow && isHovered && (
          <button 
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {/* Scrollable Movie Row */}
        <div 
          className={styles.scrollContainer}
          ref={rowRef}
          onScroll={checkScrollPosition}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              isLargeRow={isLargeRow}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && isHovered && (
          <button 
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
