import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';


export const useDirectorStore = defineStore('director', () => {
  const state = reactive({
    currentDirector: {},
  });


  const currentDirector = computed(() => state.currentDirector);


  const getDirectorDetail = async (directorId) => {
    const response = await api.get(`/person/${directorId}`);
    state.currentDirector = response.data;
  };


  return { currentDirector, getDirectorDetail };
});