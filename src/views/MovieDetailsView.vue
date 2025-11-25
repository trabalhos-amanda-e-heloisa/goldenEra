<script setup>
import { onMounted, ref } from 'vue';
import { useMovieStore } from '@/stores/movies'
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const movieStore = useMovieStore();
const router = useRouter();
const actors = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});

const loadMovieActors = async () => {
    const response = await api.get(`/movie/${props.movieId}/credits`, {
        params: { language: 'pt-BR' },
    });

    actors.value = response.data.cast;
}

const openActor = (actorId) => {
    router.push({ name: 'ActorDetails', params: { actorId } });
};

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
    await loadMovieActors();
});
</script>

<template>
    <div class="relative w-full h-[600px]">
        <div>
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.backdrop_path}`"
                :alt="movieStore.currentMovie.title" class="absolute inset-0 w-full h-full object-cover opacity-15 " />
        </div>
        <div class="relative z-10 flex gap-20 p-20 ">
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
                :alt="movieStore.currentMovie.title" class="w-80 h-100 shadow-xl rounded-2xl" />
            <div class="text-white ">
                <h1 class="font-[Girassol] text-5xl mb-5"> {{ movieStore.currentMovie.title || "Sem título" }}</h1>

                <div class="flex gap-5 mb-5">
                    <p class="inline-block border-2 border-white px-2 py-0.5"> {{
                        movieStore.currentMovie.certification }} </p>
                    <p class="text-white text-xl"> | <span class="mdi mdi-clock-outline"></span> {{
                        movieStore.currentMovie.runtime }} min </p>
                </div>
                <p class="mb-5 font-[Sen] text-[#f6a233] text-2xl "> <span class="mdi mdi-star"></span> {{
                    movieStore.currentMovie.vote_average || "Não possui avaliação." }}</p>
                <p><strong> Lançamento: </strong> {{ formatDate(movieStore.currentMovie.release_date) || "Sem Data de Lançamento" }}.</p>
                <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.tagline }}</p>
                <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.overview || "Sem Sinopse" }}</p>
                <p class="mb-5 font-[Sen]"> <strong> Orçamento: </strong> {{ movieStore.currentMovie.budget > 0 ?
                    `$${movieStore.currentMovie.budget}` : "Orçamento não calculado" }}.</p>
            </div>
            <div class="ml-5 w-100">
                <p class="text-white font-[Girassol] text-2xl ">Produtoras</p>
                <div class="text-white mb-5 font-[Sen]" v-for="company in movieStore.currentMovie.production_companies"
                    :key="company.id">
                    <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                        :alt="company.name" />
                    <p v-else>{{ company.name }}</p>
                </div>
            </div>
        </div>
    </div>
    <h2 class="m-20 ml-25 font-[Girassol] text-5xl mb-10 text-white">Elenco</h2>
    <div class="flex flex-wrap gap-4 mx-25">
        <div v-for="actor in actors" :key="actor.id" @click="openActor(actor.id)" class="cursor-pointer text-white w-40">
            <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                :alt="actor.name" class="rounded-xl shadow-lg hover:opacity-80 transition" />
            <div v-else class="w-41 h-60 bg-[#0f0f0f] rounded-xl flex items-center justify-center text-5xl">
                <span class="mdi mdi-account-off"></span>
            </div>
            <p class="font-[Girassol] text-2xl mb-10 text-white">{{ actor.name }}</p>
        </div>
    </div>
</template>
