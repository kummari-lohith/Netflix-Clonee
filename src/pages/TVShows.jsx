import React, { useState, useEffect } from 'react';
import { 
  getTrendingTVShows, 
  getTopRatedTVShows, 
  getPopularTVShows,
  getTVShowsByGenre 
} from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const TVShows = () => {
  const [tvCategories, setTvCategories] = useState({
    trending: [],
    topRated: [],
    popular: [],
    drama: [],
    comedy: [],
    sciFi: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const [trending, topRated, popular, drama, comedy, sciFi] = await Promise.all([
          getTrendingTVShows(),
          getTopRatedTVShows(),
          getPopularTVShows(),
          getTVShowsByGenre(18), // Drama
          getTVShowsByGenre(35), // Comedy
          getTVShowsByGenre(10765), // Sci-Fi & Fantasy
        ]);

        setTvCategories({
          trending,
          topRated,
          popular,
          drama,
          comedy,
          sciFi,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load TV shows. Please try again.');
        setLoading(false);
      }
    };

    fetchTVShows();
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
        Loading TV Shows...
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
        <Hero movies={tvCategories.trending} />
        
        {tvCategories.trending.length > 0 && (
          <MovieRow 
            title="Trending TV Shows" 
            movies={tvCategories.trending}
            isLargeRow
          />
        )}
        
        {tvCategories.topRated.length > 0 && (
          <MovieRow 
            title="Top Rated TV Shows" 
            movies={tvCategories.topRated}
          />
        )}
        
        {tvCategories.popular.length > 0 && (
          <MovieRow 
            title="Popular TV Shows" 
            movies={tvCategories.popular}
          />
        )}
        
        {tvCategories.drama.length > 0 && (
          <MovieRow 
            title="Drama Series" 
            movies={tvCategories.drama}
          />
        )}
        
        {tvCategories.comedy.length > 0 && (
          <MovieRow 
            title="Comedy Series" 
            movies={tvCategories.comedy}
          />
        )}
        
        {tvCategories.sciFi.length > 0 && (
          <MovieRow 
            title="Sci-Fi & Fantasy" 
            movies={tvCategories.sciFi}
          />
        )}
        
        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default TVShows;
