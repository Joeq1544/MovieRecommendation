import { useState, useEffect } from 'react';
import { getImageUrl } from '../services/tmdbAPI';
import './LibraryPage.css';

const LibraryPage = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = () => {
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    const moviesArray = Object.values(ratings);
    
    // Sort by rating (highest first)
    moviesArray.sort((a, b) => b.rating - a.rating);
    
    setRatedMovies(moviesArray);
  };

  const handleRemoveRating = (movieId) => {
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    delete ratings[movieId];
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
    
    loadRatings();
  };

  const handleEditRating = (movieId, newRating) => {
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    if (ratings[movieId]) {
      ratings[movieId].rating = newRating;
      ratings[movieId].ratedAt = new Date().toISOString();
      localStorage.setItem('movieRatings', JSON.stringify(ratings));
      
      loadRatings();
      setEditingMovieId(null);
    }
  };

  if (ratedMovies.length === 0) {
    return (
      <div className="library-page">
        <div className="empty-library">
          <h1>Your Library is Empty</h1>
          <p>Start rating movies to build your library and get personalized recommendations!</p>
          <a href="/" className="go-search-btn">Search Movies</a>
        </div>
      </div>
    );
  }

  const averageRating = (ratedMovies.reduce((sum, item) => sum + item.rating, 0) / ratedMovies.length).toFixed(1);

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>My Library</h1>
        <div className="library-stats">
          <div className="stat">
            <span className="stat-number">{ratedMovies.length}</span>
            <span className="stat-label">Movies Rated</span>
          </div>
          <div className="stat">
            <span className="stat-number">{averageRating}</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>

      <div className="library-grid">
        {ratedMovies.map(({ movie, rating, ratedAt }) => (
          <div key={movie.id} className="library-card">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="library-poster"
            />
            <div className="library-info">
              <h3 className="library-title">{movie.title}</h3>
              <p className="library-year">
                {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
              </p>
              <div className="library-ratings">
                <span className="tmdb-rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
                <span className="user-rating">Your rating: <strong>{rating}/10</strong></span>
              </div>
              <p className="rated-date">
                Rated on {new Date(ratedAt).toLocaleDateString()}
              </p>

              {editingMovieId === movie.id ? (
                <div className="edit-rating-section">
                  <p className="edit-label">Change rating:</p>
                  <div className="edit-rating-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((newRating) => (
                      <button
                        key={newRating}
                        onClick={() => handleEditRating(movie.id, newRating)}
                        className={`edit-rating-btn ${newRating === rating ? 'current' : ''}`}
                      >
                        {newRating}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setEditingMovieId(null)}
                    className="cancel-edit-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="library-actions">
                  <button
                    onClick={() => setEditingMovieId(movie.id)}
                    className="edit-btn"
                  >
                    Edit Rating
                  </button>
                  <button
                    onClick={() => handleRemoveRating(movie.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;