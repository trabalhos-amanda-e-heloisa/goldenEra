<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router'
import MovieCardComponent from '@/components/MovieCardComponent.vue';

const router = useRouter()
const isLoading = ref(false);
const genreStore = useGenreStore();
const movies = ref([]);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

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
  <main class="my-10">
    <h1 class="font-[Girassol] text-[#f6a233] text-5xl text-center w-full mb-15">Filmes da Era de Ouro</h1>
    <div class="flex">
      <div class="ml-20 justify-center w-60">
        <h2 class="font-[Girassol] text-[#f6a233] text-2xl w-50">Gêneros de filmes</h2>
        <ul class="justify-left flex-wrap list-none p-0">
          <li class="rounded-sm px-1 py-1 w-30 my-2 font-[Sen] text-[#f6a233] hover:text-black hover:bg-[#f6a233]"
            v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)"
            :class="{ 'bg-[#f6a233] text-black': genre.id === genreStore.currentGenreId }">
            {{ genre.name }}
          </li>
        </ul>
        <loading v-model:active="isLoading" is-full-page />
      </div>
      <div class="flex flex-wrap gap-4 mx-12">
        <p v-if="!isLoading && movies.length === 0" class="text-white"> Nenhum filme encontrado com esse gênero.</p>
        <MovieCardComponent v-for="movie in movies" :key="movie.id" :movie="movie" :genres="genreStore.genres" :formatDate="formatDate" :onGenreClick="listMovies" :onMovieClick="openMovie" />
      </div>
    </div>
  </main>
</template>