import { useState } from 'react';
import { searchMovies } from '../services/tmdbAPI';
import MovieCard from '../components/MovieCard';
import './SearchPage.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    const results = await searchMovies(searchQuery);
    setMovies(results);
    setLoading(false);
  };

  const handleRate = (movieId, rating, movie) => {
    // For now, just store in localStorage
    // Later we'll send this to the backend
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    ratings[movieId] = {
      rating,
      movie,
      ratedAt: new Date().toISOString(),
    };
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
    alert(`You rated "${movie.title}" ${rating}/10! Check your library to see it.`);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Search Movies</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      {loading && <div className="loading">Searching...</div>}

      {searched && !loading && movies.length === 0 && (
        <div className="no-results">
          No movies found. Try a different search term.
        </div>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onRate={handleRate} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;