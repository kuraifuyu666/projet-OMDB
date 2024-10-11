<template>
  <div>
    <form @submit.prevent="fetchMovies(1)">
      <label for="searchQuery">Rechercher un film :</label>
      <input type="text" id="searchQuery" v-model="searchQuery" required />
      <button type="submit">Rechercher</button>
    </form>

    <div v-if="isLoading" class="loader-container"> <!-- Affiche le loader -->
      <span class="loader"></span>
    </div>

    <div v-else-if="movies.length > 0">
      <h2>Résultats ({{ movieCount }} films) :</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.imdbID">
          <strong>{{ movie.Title }}</strong> ({{ movie.Year }})
          <img :src="movie.Poster" alt="Affiche du film" />
        
      <!-- Bouton Favoris -->
      <button @click="toggleFavorite(movie)">
            {{ isFavorite(movie) ? 'Retirer des Favoris' : 'Ajouter aux Favoris' }}
          </button>
        </li>
      </ul>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          @click="fetchMovies(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Précédent
        </button>

        <span>Page {{ currentPage }} sur {{ totalPages }}</span>

        <button 
          @click="fetchMovies(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Suivant
        </button>
        
        <input 
          type="number" 
          v-model="pageInput" 
          min="1" 
          :max="totalPages" 
          @change="goToPage"
          class="page-input"
          placeholder="Aller à la page"
        />
      </div>
    </div>

    <div v-else-if="error">
      <p style="color: red;">Erreur : {{ error }}</p>
    </div>

    <div v-else>
      <p>Entre un titre de film pour commencer ta recherche.</p>
      <p>Enfin .... si il te revient 🤔</p>
      <p>Sinon google est ton ami 😌🙌</p>
    </div>
  </div>
</template>

<script>
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useFavoriteStore } from '@/stores/favoriteStore'; // Store des favoris

export default {
  setup() {
    const movieStore = useMovieStore();
    const favoriteStore = useFavoriteStore(); // Récupérer le store des favoris
    const { searchQuery, movies, error, movieCount, currentPage, totalPages, isLoading } = storeToRefs(movieStore);
    const { favorites } = storeToRefs(favoriteStore); // Utiliser les favoris du store
    const fetchMovies = movieStore.fetchMovies;

    const pageInput = ref(1);

    const goToPage = () => {
      const page = parseInt(pageInput.value);
      if (page >= 1 && page <= totalPages.value) {
        fetchMovies(page);
      }
    };

    // Fonction pour ajouter ou retirer des favoris
    const toggleFavorite = (movie) => {
      if (isFavorite(movie)) {
        favoriteStore.removeFavorite(movie);
      } else {
        favoriteStore.addFavorite(movie);
      }
    };

    // Vérifie si le film est dans les favoris
    const isFavorite = (movie) => {
      return favorites.value.some(fav => fav.imdbID === movie.imdbID);
    };

    return {
      searchQuery,
      movies,
      error,
      fetchMovies,
      movieCount,
      currentPage,
      totalPages,
      isLoading, 
      pageInput,
      goToPage,
      toggleFavorite,
      isFavorite,
    };
  },
};
</script>

<style scoped>

div {
  margin-bottom: 1rem;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input{
  width: 30%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
  text-align: center;
}

img {
  width: 200px; /* Ajuste la taille */
}
form {
  margin-bottom: 20px;
  text-align: center;
}
ul {
  list-style-type: none; /* Enlève les puces de la liste */
  padding: 0; /* Enlève le padding par défaut */
  display: flex; /* Utilise Flexbox */
  flex-wrap: wrap; /* Permet aux éléments de passer à la ligne si nécessaire */
  justify-content: center; /* Centre les éléments horizontalement */
  gap: 20px; /* Espace entre les films */
}
li {
  margin-bottom: 0; /* Enlève l'espace entre les films (déjà géré par le gap) */
  width: calc(20% - 20px); /* Ajustez la largeur selon vos besoins (5 films par ligne) */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ajoute une ombre pour un effet de profondeur */
  border-radius: 4px; /* Coins arrondis */
  overflow: hidden; /* Cache tout débordement */
  background-color: #ffffff00; /* Couleur de fond blanche */
  text-align: center; /* Centre le texte dans l'élément li */
}


button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

/* Style pour la pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 0 10px;
  cursor: pointer;
}

.pagination-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-btn:hover:not([disabled]) {
  background-color: #218838;
}

.page-input {
  width: 80px; 
  text-align: center;
  background-color: #28a745;
  font-weight: bold;
  color: white;
}

.loader-container {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */
  height: 100vh;           /* Prend toute la hauteur de la vue */
}

.loader {
  position: relative;
  width: 108px;
  display: flex;
  justify-content: space-between;
}

.loader::after, .loader::before {
  content: '';
  display: inline-block;
  width: 48px;
  height: 48px;
  background-color: #FFF;
  background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
  background-repeat: no-repeat;
  border-radius: 50%;
  animation: eyeMove 10s infinite, blink 10s infinite;
}

@keyframes eyeMove {
  0%, 10% {
    background-position: 0px 0px;
  }
  13%, 40% {
    background-position: -15px 0px;
  }
  43%, 70% {
    background-position: 15px 0px;
  }
  73%, 90% {
    background-position: 0px 15px;
  }
  93%, 100% {
    background-position: 0px 0px;
  }
}

@keyframes blink {
  0%, 10%, 12%, 20%, 22%, 40%, 42%, 60%, 62%, 70%, 72%, 90%, 92%, 98%, 100% {
    height: 48px;
  }
  11%, 21%, 41%, 61%, 71%, 91%, 99% {
    height: 18px;
  }
}

</style>