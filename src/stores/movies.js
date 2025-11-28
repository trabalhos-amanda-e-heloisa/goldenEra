import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
  });

  const currentMovie = computed(() => state.currentMovie);

  const getMovieDetail = async (movieId) => {
    const { data: movie } = await api.get(`movie/${movieId}?append_to_response=credits`);
    const { data: releases } = await api.get(`movie/${movieId}/release_dates`);

    let certification = "Não classificado";

    const br = releases.results.find(r => r.iso_3166_1 === "BR");
    const us = releases.results.find(r => r.iso_3166_1 === "US")

    const selected = br?.release_dates?.[0] || us?.release_dates?.[0];

    if (selected?.certification) {
      certification = selected.certification;
    }
    state.currentMovie = {
      ...movie,
      certification,
      runtime: movie.runtime,  
    };
  };

  return { currentMovie, getMovieDetail };
})
