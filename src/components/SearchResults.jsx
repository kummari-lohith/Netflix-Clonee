import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosterUrl } from '../services/api';
import styles from './SearchResults.module.css';

const SearchResults = ({ results, loading, onClose }) => {
  const navigate = useNavigate();

  const handleResultClick = (item) => {
    const mediaType = item.media_type || 'movie';
    navigate(`/watch/${mediaType}/${item.id}`);
    onClose();
  };

  if (loading) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.loading}>Searching...</div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.noResults}>No results found</div>
      </div>
    );
  }

  // Filter out results without poster and limit to 8 results
  const filteredResults = results
    .filter(item => item.poster_path)
    .slice(0, 8);

  if (filteredResults.length === 0) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.noResults}>No results found</div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      {filteredResults.map((item) => {
        const title = item.title || item.name;
        const year = item.release_date || item.first_air_date;
        const displayYear = year ? new Date(year).getFullYear() : '';

        return (
          <div
            key={item.id}
            className={styles.resultItem}
            onClick={() => handleResultClick(item)}
          >
            <img
              src={getPosterUrl(item.poster_path)}
              alt={title}
              className={styles.poster}
            />
            <div className={styles.info}>
              <div className={styles.title}>{title}</div>
              {displayYear && (
                <div className={styles.year}>{displayYear}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
