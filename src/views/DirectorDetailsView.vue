<script setup>
import { defineProps, onMounted, ref } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useDirectorStore } from '@/stores/directors';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';
import MovieCardComponent from '@/components/MovieCardComponent.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';

const directorStore = useDirectorStore();
const genreStore = useGenreStore();
const router = useRouter();
const isLoading = ref(false);
const movies = ref([]);

const formatDate = (date) => {
    if (!date) return 'Desconhecida';
    return new Date(date).toLocaleDateString('pt-BR');
};

const props = defineProps({
    directorId: {
        type: Number,
        required: true,
    },
});

function translateDepartment(department) {
    const map = {
        "Acting": "Atuação",
        "Directing": "Direção",
    };
    return map[department] || department;
}

const loadDirectorMovies = async () => {
    const response = await api.get(`/person/${props.directorId}/movie_credits`, {
        params: { language: 'pt-BR' },
    });

    const directedMovies = response.data.crew.filter(person =>
        person.job === "Director"
    );

    movies.value = directedMovies.filter(movie => {
        if (!movie.release_date) return false;

        const year = new Date(movie.release_date).getFullYear();
        return year >= 1920 && year <= 1960;
    });
};

const openMovie = (movieId) => {
    router.push({ name: 'MovieDetails', params: { movieId } });
};

onMounted(async () => {
    isLoading.value = true;
    await directorStore.getDirectorDetail(props.directorId);
    await loadDirectorMovies();
    await genreStore.getAllGenres('movie');
    isLoading.value = false;
});
</script>

<template>
    <main class="relative w-full mt-40 min-h-screen">
        <loading v-model:active="isLoading" is-full-page />
        <div class="relative flex my-15 items-start">
            <div class="text-white w-1/3 justify-items-center">
                <img v-if="directorStore.currentDirector.profile_path" :src="`https://image.tmdb.org/t/p/w185${directorStore.currentDirector.profile_path}`" :alt="directorStore.currentDirector.name" class="w-80 rounded-2xl shadow-xl" />
                <div v-else class="w-95 h-135 bg-[#0f0f0f] border-2 border-white rounded-xl flex items-center justify-center text-5xl">
                    <span class="mdi mdi-account-off"></span>
                </div>
            </div>
            <div class="text-white w-2/3 justify-items-left">
                <h1 class="font-[Girassol] text-[#f6a233] text-5xl mb-6">{{ directorStore.currentDirector.name }}</h1>
                <div class="flex gap-15 mb-8">
                    <ul>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-calendar-month-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Nascimento:</strong>{{ formatDate(directorStore.currentDirector.birthday) }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-map-marker-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Local:</strong>{{ directorStore.currentDirector.place_of_birth || "Desconhecido" }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-movie-open-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Conhecido por:</strong>{{ translateDepartment(directorStore.currentDirector.known_for_department) || "Desconhecido"}}
                        </li>
                    </ul>
                    <ul>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-calendar-remove-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Falecimento:</strong>{{ formatDate(directorStore.currentDirector.deathday) || "Ainda vivo" }}
                        </li>
                        <li class="mb-2 font-[Sen]">
                            <span class="mdi mdi-star-outline text-[#f6a233] text-2xl pr-2"></span>
                            <strong>Popularidade:</strong>{{ directorStore.currentDirector.popularity?.toFixed(2) || "Indisponível" }}
                        </li>
                    </ul>
                </div>
                <h2 class="text-[#f6a233] font-[Girassol] text-bold text-4xl">Biografia:</h2>
                <p class="font-[Sen] leading-relaxed text-white mr-20 mt-5 mb-10 text-justify">{{ directorStore.currentDirector.biography || "Não disponível." }}</p>
            </div>
        </div>
        <div class="m-20">
            <CarouselComponent title="Conhecido(a) por" :items="movies" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }" />
        </div>
    </main>
</template>
