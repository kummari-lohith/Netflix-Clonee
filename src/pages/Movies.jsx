import React, { useState, useEffect } from 'react';
import { 
  getTrending,
  getTopRated,
  getPopularMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies
} from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const Movies = () => {
  const [movieCategories, setMovieCategories] = useState({
    trending: [],
    topRated: [],
    popular: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trending, topRated, popular, action, comedy, horror, romance] = await Promise.all([
          getTrending(),
          getTopRated(),
          getPopularMovies(),
          getActionMovies(),
          getComedyMovies(),
          getHorrorMovies(),
          getRomanceMovies(),
        ]);

        setMovieCategories({
          trending,
          topRated,
          popular,
          action,
          comedy,
          horror,
          romance,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        backgroundColor: '#141414', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        Loading Movies...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        backgroundColor: '#141414', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#E50914',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ paddingTop: '68px' }}>
        <Hero movies={movieCategories.trending} />
        
        {movieCategories.trending.length > 0 && (
          <MovieRow 
            title="Trending Movies" 
            movies={movieCategories.trending}
            isLargeRow
          />
        )}
        
        {movieCategories.popular.length > 0 && (
          <MovieRow 
            title="Popular Movies" 
            movies={movieCategories.popular}
          />
        )}
        
        {movieCategories.topRated.length > 0 && (
          <MovieRow 
            title="Top Rated Movies" 
            movies={movieCategories.topRated}
          />
        )}
        
        {movieCategories.action.length > 0 && (
          <MovieRow 
            title="Action Movies" 
            movies={movieCategories.action}
          />
        )}
        
        {movieCategories.comedy.length > 0 && (
          <MovieRow 
            title="Comedies" 
            movies={movieCategories.comedy}
          />
        )}
        
        {movieCategories.horror.length > 0 && (
          <MovieRow 
            title="Horror Movies" 
            movies={movieCategories.horror}
          />
        )}
        
        {movieCategories.romance.length > 0 && (
          <MovieRow 
            title="Romance Movies" 
            movies={movieCategories.romance}
          />
        )}
        
        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default Movies;
