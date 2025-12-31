import React, { useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import { getMovieDetails, getBackdropUrl, getPosterUrl, getProfileUrl } from '../services/api';
import styles from './Modal.module.css';

const Modal = () => {
  const { selectedMovie, isModalOpen, closeModal } = useMovies();
  const [movieDetails, setMovieDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (selectedMovie && isModalOpen) {
      setLoading(true);
      const mediaType = selectedMovie.media_type || (selectedMovie.first_air_date ? 'tv' : 'movie');
      
      getMovieDetails(selectedMovie.id, mediaType)
        .then(details => {
          setMovieDetails(details);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching movie details:', error);
          setLoading(false);
        });
    }
  }, [selectedMovie, isModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen || !selectedMovie) {
    return null;
  }

  const title = selectedMovie.title || selectedMovie.name || 'Unknown';
  const backdrop = getBackdropUrl(selectedMovie.backdrop_path);
  const voteAverage = selectedMovie.vote_average || 0;
  const matchPercentage = Math.round(voteAverage * 10);
  const releaseYear = selectedMovie.release_date?.split('-')[0] || selectedMovie.first_air_date?.split('-')[0] || '';

  // Get trailer
  const trailer = movieDetails?.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Get cast (first 5)
  const cast = movieDetails?.credits?.cast?.slice(0, 5) || [];

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeModal}>
          ✕
        </button>

        {/* Hero Section */}
        <div 
          className={styles.modalHero}
          style={{
            backgroundImage: backdrop 
              ? `linear-gradient(to top, #181818, transparent 50%), url(${backdrop})`
              : undefined
          }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.modalTitle}>{title}</h1>
            <div className={styles.heroButtons}>
              <button className={styles.playButton}>
                <span>▶</span> Play
              </button>
              <button className={styles.iconButton}>+</button>
              <button className={styles.iconButton}>👍</button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className={styles.modalDetails}>
          {loading ? (
            <div className={styles.loading}>Loading details...</div>
          ) : (
            <>
              <div className={styles.detailsGrid}>
                <div className={styles.mainDetails}>
                  <div className={styles.metadata}>
                    <span className={styles.match}>{matchPercentage}% Match</span>
                    {releaseYear && <span>{releaseYear}</span>}
                    {movieDetails?.runtime && (
                      <span>{Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m</span>
                    )}
                  </div>

                  <p className={styles.overview}>
                    {selectedMovie.overview || 'No description available.'}
                  </p>

                  {trailer && (
                    <div className={styles.trailerSection}>
                      <h3>Trailer</h3>
                      <a 
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.trailerLink}
                      >
                        Watch on YouTube →
                      </a>
                    </div>
                  )}
                </div>

                <div className={styles.sideDetails}>
                  {cast.length > 0 && (
                    <div className={styles.castSection}>
                      <h4>Cast:</h4>
                      <div className={styles.castList}>
                        {cast.map(actor => (
                          <div key={actor.id} className={styles.castMember}>
                            {actor.profile_path && (
                              <img 
                                src={getProfileUrl(actor.profile_path)} 
                                alt={actor.name}
                                className={styles.castImage}
                              />
                            )}
                            <span>{actor.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {movieDetails?.genres && (
                    <div className={styles.genresSection}>
                      <h4>Genres:</h4>
                      <p>{movieDetails.genres.map(g => g.name).join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
