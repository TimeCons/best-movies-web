import { IMovie } from "../interfaces/IMovie";

//add to favorite
export const addToFavorites = (movie: IMovie) => {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    const favoritesArray = JSON.parse(favorites);
    favoritesArray.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  } else {
    localStorage.setItem('favorites', JSON.stringify([movie]));
  }
}

//remove from favorites
export const removeFromFavorites = (movie: IMovie) => {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    const favoritesArray = JSON.parse(favorites);
    const newFavoritesArray = favoritesArray.filter((fav: IMovie) => fav.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(newFavoritesArray));
  }
}

//return true if the movie is in the favorites
export const isFavorite = (movie: IMovie) => {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    const favoritesArray = JSON.parse(favorites);
    return favoritesArray.some((fav: IMovie) => fav.id === movie.id);
  }
  return false;
}

//get the favorites from localStorage
export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(favorites);
  }
  return [];
}