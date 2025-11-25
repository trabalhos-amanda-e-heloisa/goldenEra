import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useActorStore = defineStore('actor', () => {
  const state = reactive({
    currentActor: {},
  });

  const currentActor = computed(() => state.currentActor);

  const getActorDetail = async (actorId) => {
    const response = await api.get(`/person/${actorId}`);
    state.currentActor = response.data;
  };

  return { currentActor, getActorDetail };
});