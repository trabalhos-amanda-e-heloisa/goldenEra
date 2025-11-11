import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useActorStore = defineStore('actor', () => {
  const state = reactive({
    currentActor: {},
    actors: [],
  });

  const currentActor = computed(() => state.currentActor);
  const actors = computed(() => state.actors);

  const searchGoldenAgeActors = async (query) => {
    const response = await api.get('search/person', {
      params: { query, language: 'pt-BR' },
    });

    const actorsOnly = response.data.results.filter(
      (person) => person.known_for_department === 'Acting'
    );

    const goldenAgeActors = actorsOnly.filter((person) => {
      if (!person.known_for) return false;
      return person.known_for.some((work) => {
        const date = work.release_date || work.first_air_date;
        if (!date) return false;
        const year = parseInt(date.slice(0, 4));
        return year >= 1920 && year <= 1960;
      });
    });

    state.actors = goldenAgeActors;
  };

  const getActorDetail = async (actorId) => {
    const response = await api.get(`person/${actorId}`);
    state.currentActor = response.data;
  };

  return { currentActor, actors, getActorDetail, searchGoldenAgeActors };
});
