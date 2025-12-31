import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import { getBackdropUrl } from '../services/api';
import styles from './Hero.module.css';

const Hero = () => {
  const { featuredMovie, movieCategories, setFeaturedMovie, openModal } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate featured content every 8 seconds
  useEffect(() => {
    if (!movieCategories.netflixOriginals.length && !movieCategories.trending.length) {
      return;
    }

    const interval = setInterval(() => {
      const source = movieCategories.netflixOriginals.length > 0 
        ? movieCategories.netflixOriginals 
        : movieCategories.trending;
      
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % Math.min(5, source.length);
        setFeaturedMovie(source[nextIndex]);
        return nextIndex;
      });
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [movieCategories, setFeaturedMovie]);

  if (!featuredMovie) {
    return null;
  }

  const title = featuredMovie.title || featuredMovie.name || 'Featured Content';
  const description = featuredMovie.overview || 'No description available.';
  const backgroundImage = getBackdropUrl(featuredMovie.backdrop_path);

  // Truncate description to 150 characters
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;

  return (
    <div 
      className={styles.hero}
      style={{
        backgroundImage: backgroundImage 
          ? `linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 50%), linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%), url(${backgroundImage})`
          : undefined
      }}
    >
      <div className={styles.content}>
        {/* Movie Title */}
        <h1 className={styles.title}>
          {title}
        </h1>

        {/* Movie Description */}
        <p className={styles.description}>
          {truncatedDescription}
        </p>

        {/* Action Buttons */}
        <div className={styles.buttons}>
          <button className={styles.playButton}>
            <span className={styles.icon}>▶</span>
            Play
          </button>
          <button 
            className={styles.infoButton}
            onClick={() => openModal(featuredMovie)}
          >
            <span className={styles.icon}>ℹ</span>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
