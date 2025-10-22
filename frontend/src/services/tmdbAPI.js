import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Search for movies by title
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Get popular movies (for homepage before user has ratings)
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Helper function to get full image URL
export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : '/placeholder-movie.png';
};