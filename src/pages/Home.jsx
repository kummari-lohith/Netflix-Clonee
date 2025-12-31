import React from 'react';
import { useMovies } from '../context/MoviesContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const Home = () => {
  const { movieCategories, loading, error } = useMovies();

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
        Loading...
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
      
      {/* Add padding top to account for fixed navbar */}
      <div style={{ paddingTop: '68px' }}>
        <Hero />
        
        {/* Multiple Movie Rows with real data */}
        {movieCategories.netflixOriginals.length > 0 && (
          <MovieRow 
            title="Netflix Originals" 
            movies={movieCategories.netflixOriginals}
            isLargeRow
          />
        )}
        
        {movieCategories.trending.length > 0 && (
          <MovieRow 
            title="Trending Now" 
            movies={movieCategories.trending}
          />
        )}
        
        {movieCategories.topRated.length > 0 && (
          <MovieRow 
            title="Top Rated" 
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
        
        {movieCategories.documentaries.length > 0 && (
          <MovieRow 
            title="Documentaries" 
            movies={movieCategories.documentaries}
          />
        )}
        
        {movieCategories.romance.length > 0 && (
          <MovieRow 
            title="Romance" 
            movies={movieCategories.romance}
          />
        )}
        
        {movieCategories.telugu.length > 0 && (
          <MovieRow 
            title="Telugu Movies" 
            movies={movieCategories.telugu}
          />
        )}
        
        <Footer />
      </div>

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default Home;
