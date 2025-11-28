<script setup>
import { ref, onMounted, computed } from 'vue';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router'
import api from '@/plugins/axios';


const movies = ref([]);
const directors = ref([]);
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
};

const loadAllDirectors = async () => {
  isLoading.value = true;
  const allDirectors = [];

  for (const movie of movies.value) {
    const response = await api.get(`/movie/${movie.id}/credits`, {
      params: { language: 'pt-BR' }
    });

    const directorsFound = response.data.crew.filter(
      person => person.job === "Director"
    );

    allDirectors.push(...directorsFound);
  }

  directors.value = allDirectors;
  isLoading.value = false;
};


const uniqueDirectors = computed(() => {
  const map = new Map();


  directors.value.forEach(director => {
    map.set(director.id, director);
  });

  return [...map.values()];
});


onMounted(async () => {
  isLoading.value = true;
  await listMovies();
  await loadAllDirectors();
  isLoading.value = false;
});


function openDirector(directorId) {
  router.push({ name: 'DirectorDetails', params: { directorId } });
}
</script>


<template>
  <main class="my-15 mt-25">
    <h1 class="font-[Girassol] text-[#f6a233] text-5xl text-center w-full mb-15">Diretores da Era de Ouro</h1>
    <loading v-model:active="isLoading" is-full-page />
    <div class="flex flex-wrap gap-4 mx-12 justify-center">
      <div v-for="director in uniqueDirectors" :key="director.id" class="relative text-white mb-4 group w-52 transition-all duration-300 cursor-pointer
         hover:z-50 hover:scale-105 justify-items-center" @click="openDirector(director.id)">
        <img v-if="director.profile_path" :src="`https://image.tmdb.org/t/p/w185${director.profile_path}`" :alt="director.name"
          class="rounded-xl shadow-lg hover:opacity-80 transition" />
        <div v-else
          class="w-47 h-70 bg-[#0f0f0f] border-2 border-white rounded-xl flex items-center justify-center text-5xl">
          <span class="mdi mdi-account-off"></span>
        </div>
        <p class="font-[Montserrat] text-2xl mb-10 text-white">{{ director.name }}</p>
      </div>
    </div>
  </main>
</template>
