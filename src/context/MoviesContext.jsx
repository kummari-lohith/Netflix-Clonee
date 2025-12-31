import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/api';

// Create Context
const MoviesContext = createContext();

// Custom hook to use the MoviesContext
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

// MoviesProvider Component
export const MoviesProvider = ({ children }) => {
  const [state, setState] = useState({
    featuredMovie: null,
    movieCategories: {
      trending: [],
      netflixOriginals: [],
      topRated: [],
      action: [],
      comedy: [],
      horror: [],
      documentaries: [],
      romance: [],
      telugu: [],
    },
    selectedMovie: null,
    isModalOpen: false,
    loading: true,
    error: null,
  });

  // Fetch all movie categories on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const categories = await fetchAllCategories();
        
        // Pick a random movie from Netflix Originals or Trending for featured
        const featuredSource = categories.netflixOriginals.length > 0 
          ? categories.netflixOriginals 
          : categories.trending;
        const randomIndex = Math.floor(Math.random() * Math.min(5, featuredSource.length));
        const featured = featuredSource[randomIndex];

        setState(prev => ({
          ...prev,
          featuredMovie: featured,
          movieCategories: categories,
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load movies. Please try again later.',
        }));
      }
    };

    fetchMovies();
  }, []);

  // Set featured movie (for auto-rotation)
  const setFeaturedMovie = (movie) => {
    setState(prev => ({ ...prev, featuredMovie: movie }));
  };

  // Open modal with selected movie
  const openModal = (movie) => {
    setState(prev => ({
      ...prev,
      selectedMovie: movie,
      isModalOpen: true,
    }));
  };

  // Close modal
  const closeModal = () => {
    setState(prev => ({
      ...prev,
      selectedMovie: null,
      isModalOpen: false,
    }));
  };

  const value = {
    ...state,
    setFeaturedMovie,
    openModal,
    closeModal,
  };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
