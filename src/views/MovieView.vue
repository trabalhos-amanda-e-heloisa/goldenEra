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
  <main class="flex my-15">
    <div class="ml-20 justify-center w-60">
      <h1 class="font-[Girassol] text-[#f6a233] text-2xl w-50">Gêneros de filmes</h1>
      <ul class="justify-left flex-wrap list-none p-0">
        <li class="rounded-sm px-1 py-1 w-30 my-2 font-[Sen] text-[#f6a233] hover:text-black hover:bg-[#f6a233]"
          v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)"
          :class="{ active: genre.id === genreStore.currentGenreId }">
          {{ genre.name }}
        </li>
      </ul>
      <loading v-model:active="isLoading" is-full-page />
    </div>
    <div class="flex flex-wrap gap-4 mx-12">
      <p v-if="!isLoading && movies.length === 0" class="text-white">Nenhum filme encontrado com esse gênero.</p>
      <div v-for="movie in movies" :key="movie.id" class="relative mb-4 group w-52 transition-all duration-300 cursor-pointer
         hover:z-50 hover:scale-105">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
          @click="openMovie(movie.id)" class="w-full h-auto rounded-md" />
        <div class="absolute left-0 right-0 bottom-0 opacity-0
           group-hover:opacity-100 group-hover:translate-y-0
           transition-all duration-300 bg-[#0f0f0f] p-3 rounded-b-sm">
          <p class="text-white font-[Girassol] text-lg leading-5">{{ movie.title }}</p>
          <p class="text-sm text-gray-300">{{ formatDate(movie.release_date) }}</p>
          <p class="text-[#f6a233] text-sm mt-2">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
              | {{ getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>

  </main>
</template>