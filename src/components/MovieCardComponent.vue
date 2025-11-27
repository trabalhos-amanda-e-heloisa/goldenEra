<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  movie: {type: Object,  required: true},
  genres: {type: Array, required: true},
  formatDate: {type: Function, required: true},
  onGenreClick: {type: Function, required: true},
  onMovieClick: {type: Function, required: true},
  size: {type: String, default: 'small'}
});

function getGenreName(id) {
  const genero = props.genres.find(g => g.id === id);
  return genero ? genero.name : '';
}
</script>

<template>
  <div :class="['relative mb-4 group transition-all duration-300 cursor-pointer hover:z-50 hover:scale-105', size === 'large' ? 'w-60' : 'w-52']" >
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="onMovieClick(movie.id)"  class="w-full h-auto rounded-md"/>
    <div class="absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300 bg-[#0f0f0f] p-3 rounded-b-sm">
      <p class="text-white font-[Girassol] text-lg leading-5"> {{ movie.title }}</p>
      <p class="text-sm text-gray-300"> {{ formatDate(movie.release_date) }}</p>
      <p class="text-[#f6a233] text-sm mt-2">
        <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click.stop="onGenreClick(genre_id)" class="cursor-pointer">  | {{ getGenreName(genre_id) }} </span>
      </p>
    </div>
  </div>
</template>
