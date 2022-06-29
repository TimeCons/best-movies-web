import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieImage } from '../../api/movies';
import { addToFavorites, isFavorite, removeFromFavorites } from '../../helpers/localStorage';
import { IMovie, IMovieDetails } from '../../interfaces/IMovie';

export function MovieDetails({ movie, onClose: close, onFavoriteUpdate: updateFavorites }: { movie: IMovie | undefined } & { onClose: () => void } & { onFavoriteUpdate: () => void }) {

  const [movieDetails, setMovieDetails] = useState<IMovieDetails | undefined>(undefined);
  const [inFavorite, setInFavorite] = useState(false);

  useEffect(() => {
    if (movie) {
      getMovieDetails(movie.id).then(setMovieDetails);
      setInFavorite(isFavorite(movie));
    }
  }, [movie]);

  //add or remove from favorites
  const handleFavoriteClick = () => {
    if (!movie) { return; }

    if (inFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }

    setInFavorite(!inFavorite);
    updateFavorites()
  }


  return (
    <div className={`movie-details-carpet ${movie ? 'visible' : ''}`} >
      {movieDetails && (
        <div className='movie-details-container'>
          <span className='movie-details__close-button ' onClick={close}> ⓧ </span>
          <img className='movie-details__image' src={getMovieImage(movieDetails.poster_path)} alt={movieDetails.title} />
          <div className='movie-details__text'>
            <h1>{movieDetails.title}</h1>
            <p>🗓 {movieDetails.release_date}  -   ⭐️ {movieDetails.vote_average}</p>
            <p>{movieDetails.overview}</p>
            <p onClick={handleFavoriteClick}><span className='movie-details__add-favorite-button'>{!inFavorite ? ('Add To Favorites') : ('Remove From Favorite')} </span>  💛</p>
          </div>
        </div>
      )}
    </div>
  );
}

