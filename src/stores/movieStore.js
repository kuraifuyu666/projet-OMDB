import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    searchQuery: '',
    movies: [],
    error: null,
    currentPage: 1, // Page actuelle
    totalResults: 0, // Nombre total de résultats
    isLoading: false, // État de chargement
  }),

  getters: {
    movieCount: (state) => state.movies.length,
    totalPages: (state) => Math.ceil(state.totalResults / 10), // Supposer 10 films par page
  },

  actions: {
    async fetchMovies(page = 1) {
      if (this.searchQuery) {
        this.currentPage = page; // Mettez à jour currentPage
      }

      const apiKey = 'ec46c273';
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(this.searchQuery)}&page=${page}`;

      this.isLoading = true; // Démarrer le chargement

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Simule un temps de latence de 3 secondes
      await new Promise(resolve => setTimeout(resolve, 3000));

        if (data.Response === "True") {
          this.movies = data.Search;
          this.totalResults = parseInt(data.totalResults, 10); // Assurez-vous que c'est un nombre
          this.error = null;
        } else {
          this.movies = [];
          this.error = data.Error;
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération des films.';
        console.error(error);
      } finally {
        this.isLoading = false; // Terminer le chargement
      }
    },
  },
});