<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useActorStore } from '@/stores/actor';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';

const router = useRouter();
const actorStore = useActorStore();
const movies = ref([]);

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

onMounted(async () => {
    await actorStore.getActorDetail(props.actorId);
    await loadActorMovies();
});

const carousel = ref(null);

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

</script>

<template>
    <div class="relative w-full min-h-[600px]">
        <div class="relative z-10 flex gap-20 p-20">
            <img :src="`https://image.tmdb.org/t/p/w300${actorStore.currentActor.profile_path}`"
                :alt="actorStore.currentActor.name" class="w-60 rounded-xl shadow-xl " />
            <div class="text-white max-w-2xl">
                <h1 class="font-[Girassol] text-5xl mb-5">
                    {{ actorStore.currentActor.name }}
                </h1>
                <p class="mb-2 font-[Sen]">
                    <strong>Nascimento:</strong>
                    {{ formatDate(actorStore.currentActor.birthday) }}
                </p>
                <p class="mb-5 font-[Sen]">
                    <strong>Local:</strong>
                    {{ actorStore.currentActor.place_of_birth || "Desconhecido" }}
                </p>
                <p class="mb-10 font-[Sen] leading-relaxed">
                    {{ actorStore.currentActor.biography || "Biografia não disponível." }}
                </p>
            </div>
        </div>
        <h2 class="font-[Girassol] text-white text-3xl ml-20">Filmes em que atuou:</h2>
        <div class="relative">
            <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full">
                <span class="mdi mdi-arrow-left-bold-circle-outline text-white hover:text-[#f6a233] text-5xl"></span>
            </button>
            <div ref="carousel" class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar m-20 py-4 px-1">
                <div v-for="movie in movies" :key="movie.id"
                    class="min-w-[150px] cursor-pointer hover:scale-105 transition" @click="openMovie(movie.id)">
                    <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                        :alt="movie.title" class="rounded-md w-full" />
                    <p class="text-white font-[Girassol] text-lg leading-5">{{ movie.title }}</p>
                </div>
            </div>
            <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full">
                <span class="mdi mdi-arrow-right-bold-circle-outline text-white hover:text-[#f6a233] text-5xl"></span>
            </button>
        </div>
    </div>
</template>
