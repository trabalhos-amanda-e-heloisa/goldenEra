<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movies'
const movieStore = useMovieStore();

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
    <div class="relative w-full h-[600px]">
        <div>
        <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.backdrop_path}`"
            :alt="movieStore.currentMovie.title" class="absolute inset-0 w-full h-full object-cover opacity-15 "/>
        </div>
    <div class="relative z-10 flex gap-20 p-20 ">
        <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
            :alt="movieStore.currentMovie.title" class="w-80 h-100 shadow-xl rounded-2xl"/>
        <div class="text-white">
            <h1 class="font-[Girassol] text-5xl mb-10"> {{ movieStore.currentMovie.title }}</h1>
            <p><strong> Data de lançamento: </strong> {{ formatDate(movieStore.currentMovie.release_date) }}</p>
            <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.tagline }}</p>
            <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.overview }}</p>
            <p class="mb-5 font-[Sen]"> <strong> Orçamento: </strong> ${{ movieStore.currentMovie.budget }}.</p>
            <p class="mb-5 font-[Sen]"> <strong> Avaliação: </strong> {{ movieStore.currentMovie.vote_average }}.</p>
        </div>
        <div>
            <p class="text-white font-[Girassol] text-2xl ">Produtoras</p>
            <div class="text-white mb-5 font-[Sen]" v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
                <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                    :alt="company.name" />
                <p v-else>{{ company.name }}</p>
            </div>
        </div>
    </div>
    </div>
</template>
