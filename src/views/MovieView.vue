<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false);
const genreStore = useGenreStore();
const movies = ref([]);


function getGenreName(id) {
  const genero = genreStore.genres.find((genre) => genre.id === id);
  return genero ? genero.name : '';
}

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  await listMovies();
  isLoading.value = false;

});

const listMovies = async (genreId = null) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const params = {
    language: 'pt-BR',
   'release_date.gte': '1920-01-01',
   'release_date.lte': '1960-12-31',
  }
   if (genreId) {
    params.with_genres = genreId;
  }

  const response = await api.get('discover/movie', { params });
  movies.value = response.data.results
  isLoading.value = false;

};

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

</script>
<template>
  <div class="text-white">

    <h1>Gêneros de filmes</h1>
    <ul>
      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }">
        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />
  </div>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ movie.release_date }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
            {{ getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>