import axios from 'axios';

// TMDB API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Request interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('TMDB API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Genre mapping
export const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// Image URL helpers
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path) => getImageUrl(path, 'w500');
export const getBackdropUrl = (path) => getImageUrl(path, 'original');
export const getProfileUrl = (path) => getImageUrl(path, 'w185');

// Helper to get genre names from IDs
export const getGenreNames = (genreIds) => {
  if (!genreIds) return [];
  return genreIds.map(id => GENRES[id]).filter(Boolean);
};

// API Endpoints

/**
 * Get trending movies/shows for the week
 */
export const getTrending = async () => {
  try {
    const response = await tmdbApi.get('/trending/all/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    throw error;
  }
};

/**
 * Get Netflix Originals (TV shows from Netflix network)
 */
export const getNetflixOriginals = async () => {
  try {
    const response = await tmdbApi.get('/discover/tv', {
      params: {
        with_networks: 213, // Netflix network ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Netflix Originals:', error);
    throw error;
  }
};

/**
 * Get top rated movies
 */
export const getTopRated = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated:', error);
    throw error;
  }
};

/**
 * Get action movies
 */
export const getActionMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 28, // Action genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching action movies:', error);
    throw error;
  }
};

/**
 * Get comedy movies
 */
export const getComedyMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 35, // Comedy genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    throw error;
  }
};

/**
 * Get horror movies
 */
export const getHorrorMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 27, // Horror genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    throw error;
  }
};

/**
 * Get documentaries
 */
export const getDocumentaries = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 99, // Documentary genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching documentaries:', error);
    throw error;
  }
};

/**
 * Get romance movies
 */
export const getRomanceMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 10749, // Romance genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching romance movies:', error);
    throw error;
  }
};

/**
 * Get Telugu movies
 */
export const getTeluguMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_original_language: 'te', // Telugu language code
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Telugu movies:', error);
    throw error;
  }
};

/**
 * Get movie details with videos and credits
 */
export const getMovieDetails = async (id, mediaType = 'movie') => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Search for movies
 */
export const searchMovies = async (query) => {
  try {
    if (!query) return [];
    const response = await tmdbApi.get('/search/multi', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Fetch all movie categories in parallel
 */
export const fetchAllCategories = async () => {
  try {
    const [
      trending,
      netflixOriginals,
      topRated,
      action,
      comedy,
      horror,
      documentaries,
      romance,
      telugu,
    ] = await Promise.all([
      getTrending(),
      getNetflixOriginals(),
      getTopRated(),
      getActionMovies(),
      getComedyMovies(),
      getHorrorMovies(),
      getDocumentaries(),
      getRomanceMovies(),
      getTeluguMovies(),
    ]);

    return {
      trending,
      netflixOriginals,
      topRated,
      action,
      comedy,
      horror,
      documentaries,
      romance,
      telugu,
    };
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

export default {
  getTrending,
  getNetflixOriginals,
  getTopRated,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getDocumentaries,
  getRomanceMovies,
  getTeluguMovies,
  getMovieDetails,
  searchMovies,
  fetchAllCategories,
  getImageUrl,
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  getGenreNames,
};

