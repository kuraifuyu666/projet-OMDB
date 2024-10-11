import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favoriteStore', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Charger depuis localStorage
  }),
  actions: {
    addFavorite(movie) {
      if (!this.favorites.some(fav => fav.imdbID === movie.imdbID)) {
        this.favorites.push(movie);
        this.saveFavorites();
      }
    },
    removeFavorite(movie) {
      this.favorites = this.favorites.filter(fav => fav.imdbID !== movie.imdbID);
      this.saveFavorites();
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
});