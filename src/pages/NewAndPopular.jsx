import React, { useState, useEffect } from 'react';
import { 
  getUpcomingMovies,
  getNowPlayingMovies,
  getTrending,
  getPopularMovies
} from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const NewAndPopular = () => {
  const [categories, setCategories] = useState({
    upcoming: [],
    nowPlaying: [],
    trending: [],
    popular: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [upcoming, nowPlaying, trending, popular] = await Promise.all([
          getUpcomingMovies(),
          getNowPlayingMovies(),
          getTrending(),
          getPopularMovies(),
        ]);

        setCategories({
          upcoming,
          nowPlaying,
          trending,
          popular,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load content. Please try again.');
        setLoading(false);
      }
    };

    fetchContent();
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
        Loading New & Popular...
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
        <Hero movies={categories.trending} />
        
        {categories.upcoming.length > 0 && (
          <MovieRow 
            title="Coming Soon" 
            movies={categories.upcoming}
            isLargeRow
          />
        )}
        
        {categories.nowPlaying.length > 0 && (
          <MovieRow 
            title="Now Playing in Theaters" 
            movies={categories.nowPlaying}
          />
        )}
        
        {categories.trending.length > 0 && (
          <MovieRow 
            title="Trending This Week" 
            movies={categories.trending}
          />
        )}
        
        {categories.popular.length > 0 && (
          <MovieRow 
            title="Popular Right Now" 
            movies={categories.popular}
          />
        )}
        
        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default NewAndPopular;
