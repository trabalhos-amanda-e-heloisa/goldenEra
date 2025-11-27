<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useActorStore } from '@/stores/actor';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';


const actorStore = useActorStore();
const isLoading = ref(false);
const router = useRouter();
const movies = ref([]);
const carousel = ref(null);


const formatDate = (date) => {
    if (!date) return 'Desconhecida';
    return new Date(date).toLocaleDateString('pt-BR');
};


const props = defineProps({
    actorId: {
        type: Number,
        required: true,
    },
});


const loadActorMovies = async () => {
    const response = await api.get(`/person/${props.actorId}/movie_credits`, {
        params: { language: 'pt-BR' },
    });


    movies.value = response.data.cast;
};


const openMovie = (movieId) => {
    router.push({ name: 'MovieDetails', params: { movieId } });
};


const scrollLeft = () => {
    carousel.value.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
};


const scrollRight = () => {
    carousel.value.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
};


onMounted(async () => {
    isLoading.value = true;
    await actorStore.getActorDetail(props.actorId);
    await loadActorMovies();
    isLoading.value = false;
});
</script>


<template>
    <main class="relative w-full h-[600px] mt-25 mb-90">
        <loading v-model:active="isLoading" is-full-page />
        <div class="relative flex my-15 items-start">
            <div class="text-white w-1/3 justify-items-center">
                <img v-if="actorStore.currentActor.profile_path"
                    :src="`https://image.tmdb.org/t/p/w185${actorStore.currentActor.profile_path}`"
                    :alt="actorStore.currentActor.name" class="w-80 rounded-2xl shadow-xl" />
                <div v-else
                    class="w-95 h-135 bg-[#0f0f0f] border-2 border-white rounded-xl flex items-center justify-center text-5xl">
                    <span class="mdi mdi-account-off"></span>
                </div>
            </div>




            <div class="text-white w-2/3 justify-items-left">
                <h1 class="font-[Girassol] text-[#f6a233] text-5xl mb-6">
                    {{ actorStore.currentActor.name }}
                </h1>
                <div class="flex gap-15 mb-8">
                    <ul>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-calendar-month-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Nascimento:</strong>
                            {{ formatDate(actorStore.currentActor.birthday) }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-map-marker-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Local:</strong>
                            {{ actorStore.currentActor.place_of_birth || "Desconhecido" }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-movie-open-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Conhecido por:</strong>
                            {{ actorStore.currentActor.known_for_department || "Desconhecido" }}
                        </li>
                    </ul>
                    <ul>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-calendar-remove-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Falecimento:</strong>
                            {{ formatDate(actorStore.currentActor.deathday) || "Ainda vivo" }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-star-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Popularidade:</strong>
                            {{ actorStore.currentActor.popularity?.toFixed(2) || "Indisponível" }}
                        </li>
                    </ul>
                </div>
                <h2 class="text-[#f6a233] font-[Girassol] text-bold text-4xl">Biografia:</h2>
                <p class="font-[Sen] leading-relaxed text-white mr-20 mt-5 mb-10 text-justify">
                    {{ actorStore.currentActor.biography || "Não disponível." }}
                </p>
            </div>
        </div>
        <h2 class="font-[Girassol] text-[#f6a233] text-4xl ml-20">Filmes em que atuou:</h2>
        <div class="relative mb-30">
            <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full">
                <span class="mdi mdi-arrow-left-bold-circle-outline text-white hover:text-[#f6a233] text-5xl"></span>
            </button>
            <div ref="carousel"
                class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar ml-20 mr-20 mb-15 mt-10 py-4 px-1">
                <div v-for="movie in movies" :key="movie.id"
                    class="min-w-[150px] cursor-pointer hover:scale-105 transition" @click="openMovie(movie.id)">
                    <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                        :alt="movie.title" class="rounded-md w-full" />
                    <p class="text-white text-center font-[Girassol] text-lg leading-5">{{ movie.title }}</p>
                </div>
            </div>
            <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full">
                <span class="mdi mdi-arrow-right-bold-circle-outline text-white hover:text-[#f6a233] text-5xl"></span>
            </button>
        </div>
    </main>
</template>
