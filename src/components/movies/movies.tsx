import { useState, useEffect } from 'react';
import { MovieDetails } from '../movieDetails';
import { getMovies, getMovieImage } from '../../api/movies';
import { IMovie } from '../../interfaces/IMovie';
import { getFavorites } from '../../helpers/localStorage';


export function Movies() {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>(undefined);

  const [showfavorite, setShowFavorite] = useState(false);
  const [favorites, setFavorites] = useState<IMovie[]>(getFavorites());

  useEffect(() => {
    fetchRemoteMovies();
    updateFavorites();
  }, [showfavorite]);

  //fetch movies from api
  const fetchRemoteMovies = () => {
    if (currentPage + 1 <= totalPages) {
      getMovies(currentPage + 1).then(({ page, results, total_pages }) => {
        setMovies(rendered => [...rendered, ...results]);
        setTotalPages(total_pages);
        setCurrentPage(page);
      });
    }
  }

  //update favorites list retreived from localStorage
  const updateFavorites = () => {
    setFavorites(getFavorites());
  }

  //set a movie as selected
  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  }

  //deselect a movie
  const onClose = () => {
    setSelectedMovie(undefined);
  }

  return (
    <div>
      {/* website logo */}
      <h1><span style={{ fontSize: 23 }}>Best</span><span style={{ fontWeight: 200 }}>movies®</span></h1>
      
      {/* switch to favorites/all buttons */}
      <div className='movies-buttons'>
        <button onClick={() => { setShowFavorite(false) }}>All Movies 🎬</button>
        <button onClick={() => { setShowFavorite(true) }}>Favorite Movies ❤️</button>
      </div>

      {/* list of movies cards */}
      <section className='movies-container'>
        {
          (showfavorite ? favorites : movies).map(movie => (
            <div className='movie-card' key={movie.id} onClick={() => handleMovieClick(movie)}>
              <img className='movie-card__image' src={getMovieImage(movie.poster_path)} alt={movie.title} />
              <h1 className='movie-card__title'>{movie.title}</h1>
            </div>
          ))
        }
        {
          showfavorite && favorites.length === 0 &&
          <h1 style={{ backgroundColor: '#fffb', padding: 40, borderRadius: 10 }}>No favorites yet 🥲 </h1>
        }
      </section>

      {/* load more button */}
      {!showfavorite && currentPage &&
        <div className='load-more-button' onClick={fetchRemoteMovies}>Load More</div>
      }

      {/* movie details modal */}
      <MovieDetails
        movie={selectedMovie}
        onClose={onClose}
        onFavoriteUpdate={updateFavorites}
      />

    </div>
  );
}
