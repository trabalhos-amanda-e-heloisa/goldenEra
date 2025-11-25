<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router'


const movies = ref([]);
const casts = ref([]);
const isLoading = ref(false);
const router = useRouter()

const listMovies = async () => {
  isLoading.value = true;

  const params = {
    language: 'pt-BR',
    'release_date.gte': '1920-01-01',
    'release_date.lte': '1960-12-31',
  };

  const response = await api.get('discover/movie', { params });
  movies.value = response.data.results;

  isLoading.value = false;
};

const loadAllCasts = async () => {
  const allActors = [];

  for (const movie of movies.value) {
    const response = await api.get(`/movie/${movie.id}/credits`, {
      params: {
        language: 'pt-BR'
      }
    });

    allActors.push(...response.data.cast);
  }

  casts.value = allActors;
};

const uniqueActors = computed(() => {
  const map = new Map();

  casts.value.forEach(actor => {
    map.set(actor.id, actor);
  });

  return [...map.values()];
});

onMounted(async () => {
  isLoading.value = true;
  await listMovies();
  await loadAllCasts();
});

function openActor(actorId) {
  router.push({ name: 'ActorDetails', params: { actorId } });
}
</script>

<template>
  <main class="my-15">
      <h1 class="font-[Girassol] text-[#f6a233] text-center text-2xl w-50">Atores</h1>
      <loading v-model:active="isLoading" is-full-page />
    <div class="flex flex-wrap gap-4 mx-12">
      <div v-for="actor in uniqueActors" :key="actor.id" class="relative mb-4 group w-52 transition-all duration-300 cursor-pointer
         hover:z-50 hover:scale-105">
        <img :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`" :alt="actor.name"
          @click="openActor(actor.id)" class="w-full h-auto rounded-md" />
          <p class="text-white font-[Girassol] text-lg leading-5">{{ actor.name }}</p>
      </div>
    </div>
  </main>
</template>
