import { getImageUrl } from '../services/tmdbAPI';
import './MovieCard.css';

const MovieCard = ({ movie, onRate }) => {
  const handleRatingClick = (rating) => {
    onRate(movie.id, rating, movie);
  };

  return (
    <div className="movie-card">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </p>
        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}/10</p>
        
        <div className="rating-section">
          <p className="rating-label">Rate this movie:</p>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className="rating-btn"
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;