<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router'
import { useGenreStore } from '@/stores/genre';
import MovieCardComponent from '@/components/MovieCardComponent.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies1920s = ref([]);
const movies1930s = ref([]);
const movies1940s = ref([]);
const movies1950s = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const loadDecade = async (from, to, array) => {
  const response = await api.get("discover/movie", {
    params: {
      language: "pt-BR",
      sort_by: "popularity.desc",
      "release_date.gte": from,
      "release_date.lte": to,
    },
  });
  array.value = response.data.results;
};

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  await loadDecade("1920-01-01", "1929-12-31", movies1920s);
  await loadDecade("1930-01-01", "1939-12-31", movies1930s);
  await loadDecade("1940-01-01", "1949-12-31", movies1940s);
  await loadDecade("1950-01-01", "1959-12-31", movies1950s);
  isLoading.value = false;
});

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

function onGenreClick(genreId) {
  router.push({ name: 'Filmes', query: { genreId } });
}

</script>
<template>
  <loading v-model:active="isLoading" is-full-page />
  <main class="m-20">
    <div class="mb-20">
      <CarouselComponent title="Filmes da década de 1920" :items="movies1920s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }"/>
      <CarouselComponent title="Filmes da década de 1930" :items="movies1930s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }"/>
      <CarouselComponent title="Filmes da década de 1940" :items="movies1940s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }"/>
      <CarouselComponent title="Filmes da década de 1950" :items="movies1950s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }"/>
    </div>
  </main>
</template>