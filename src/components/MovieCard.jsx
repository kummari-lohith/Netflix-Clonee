import React from 'react';
import { useMovies } from '../context/MoviesContext';
import { useMyList } from '../context/MyListContext';
import { getPosterUrl, getGenreNames } from '../services/api';
import { useHoverDelay } from '../hooks/useHoverDelay';
import styles from './MovieCard.module.css';

const MovieCard = React.memo(({ movie, isLargeRow = false }) => {
  const { openModal } = useMovies();
  const { isInMyList, toggleMyList } = useMyList();
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverDelay(500);

  if (!movie) return null;

  const title = movie.title || movie.name || 'Unknown';
  const posterPath = movie.poster_path || movie.backdrop_path;
  const imageUrl = getPosterUrl(posterPath);
  const voteAverage = movie.vote_average || 0;
  const matchPercentage = Math.round(voteAverage * 10);
  const releaseYear = movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || '';
  const genres = getGenreNames(movie.genre_ids?.slice(0, 2) || []);
  const inMyList = isInMyList(movie.id);

  const cardClass = isLargeRow 
    ? `${styles.movieCard} ${styles.largeCard}` 
    : styles.movieCard;

  const handleAddToList = (e) => {
    e.stopPropagation();
    toggleMyList(movie);
  };

  return (
    <div 
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => openModal(movie)}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title}
          className={styles.movieImage}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder}>
          {title}
        </div>
      )}
      
      {isHovered && (
        <div className={styles.overlay}>
          <div className={styles.movieTitle}>{title}</div>
          <div className={styles.movieInfo}>
            <span className={styles.match}>{matchPercentage}% Match</span>
            {releaseYear && <span>• {releaseYear}</span>}
          </div>
          {genres.length > 0 && (
            <div className={styles.genres}>
              {genres.join(' • ')}
            </div>
          )}
          <div className={styles.actions}>
            <button className={styles.actionBtn} title="Play">▶</button>
            <button 
              className={`${styles.actionBtn} ${inMyList ? styles.inList : ''}`}
              title={inMyList ? "Remove from list" : "Add to list"}
              onClick={handleAddToList}
            >
              {inMyList ? '✓' : '+'}
            </button>
            <button className={styles.actionBtn} title="Like">👍</button>
            <button className={styles.actionBtn} title="More info">ⓘ</button>
          </div>
        </div>
      )}
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
