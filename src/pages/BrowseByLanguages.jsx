import React, { useState, useEffect } from 'react';
import { getMoviesByLanguage, getTVShowsByLanguage } from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const BrowseByLanguages = () => {
  const [languageCategories, setLanguageCategories] = useState({
    telugu: [],
    hindi: [],
    tamil: [],
    korean: [],
    spanish: [],
    french: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchByLanguages = async () => {
      try {
        setLoading(true);
        const [telugu, hindi, tamil, korean, spanish, french] = await Promise.all([
          getMoviesByLanguage('te'), // Telugu
          getMoviesByLanguage('hi'), // Hindi
          getMoviesByLanguage('ta'), // Tamil
          getMoviesByLanguage('ko'), // Korean
          getMoviesByLanguage('es'), // Spanish
          getMoviesByLanguage('fr'), // French
        ]);

        setLanguageCategories({
          telugu,
          hindi,
          tamil,
          korean,
          spanish,
          french,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load content. Please try again.');
        setLoading(false);
      }
    };

    fetchByLanguages();
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
        Loading Languages...
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
        <Hero movies={languageCategories.telugu} />
        
        {languageCategories.telugu.length > 0 && (
          <MovieRow 
            title="Telugu Movies & Shows" 
            movies={languageCategories.telugu}
            isLargeRow
          />
        )}
        
        {languageCategories.hindi.length > 0 && (
          <MovieRow 
            title="Hindi Movies & Shows" 
            movies={languageCategories.hindi}
          />
        )}
        
        {languageCategories.tamil.length > 0 && (
          <MovieRow 
            title="Tamil Movies & Shows" 
            movies={languageCategories.tamil}
          />
        )}
        
        {languageCategories.korean.length > 0 && (
          <MovieRow 
            title="Korean Movies & Shows" 
            movies={languageCategories.korean}
          />
        )}
        
        {languageCategories.spanish.length > 0 && (
          <MovieRow 
            title="Spanish Movies & Shows" 
            movies={languageCategories.spanish}
          />
        )}
        
        {languageCategories.french.length > 0 && (
          <MovieRow 
            title="French Movies & Shows" 
            movies={languageCategories.french}
          />
        )}
        
        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default BrowseByLanguages;
