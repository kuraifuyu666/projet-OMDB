<script setup>
import { RouterLink, RouterView } from 'vue-router'
import component from './components/Component.vue'
</script>

<template>
    <div>
    <!-- Navigation avec Vue Router -->
    <nav>
      <router-link to="/">Rechercher des Films</router-link>
      <router-link to="/favorites">Mes Favoris</router-link>
    </nav>
<!-- Vue Router va afficher le composant correspondant à la route -->
    <router-view />
    </div>
  <footer class="text-center">
    AH !!! YAH !!! © 2024  
  </footer>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

router-link {
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

router-link:hover {
  background-color: #0056b3;
}

router-link-active {
  font-weight: bold;
  background-color: #0056b3;
}
</style>
