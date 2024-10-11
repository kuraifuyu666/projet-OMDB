<template>
  <div>
    <h2>Mes Films Favoris ({{ favorites.length }} films) :</h2>
    <div v-if="favorites.length > 0">
      <ul>
        <li v-for="movie in favorites" :key="movie.imdbID">
          <strong>{{ movie.Title }}</strong> ({{ movie.Year }})
          <img :src="movie.Poster" alt="Affiche du film" />
          <button @click="removeFavorite(movie)">Retirer des Favoris</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun film dans vos favoris pour le moment.</p>
    </div>
  </div>
</template>

<script>
import { useFavoriteStore } from '@/stores/favoriteStore'; // Store des favoris
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const favoriteStore = useFavoriteStore(); // Récupérer le store des favoris
    const { favorites } = storeToRefs(favoriteStore);

    const removeFavorite = (movie) => {
      favoriteStore.removeFavorite(movie);
    };

    return {
      favorites,
      removeFavorite,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
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

img {
  width: 200px; /* Ajuste la taille */
}

button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>