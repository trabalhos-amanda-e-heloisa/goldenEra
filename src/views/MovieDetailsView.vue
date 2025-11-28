<script setup>
import { onMounted, ref } from 'vue';
import { useMovieStore } from '@/stores/movies'
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import ActorCardComponent from '@/components/ActorCardComponent.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';

const movieStore = useMovieStore();
const isLoading = ref(false);
const router = useRouter();
const actors = ref([]);
const director = ref(null);

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
    director.value = response.data.crew.find(member => member.job?.toLowerCase() === "director");
}

const openActor = (actorId) => {
    router.push({ name: 'ActorDetails', params: { actorId } });
};

onMounted(async () => {
    isLoading.value = true;
    await movieStore.getMovieDetail(props.movieId);
    await loadMovieActors();
    isLoading.value = false;
});
</script>
<template>
    <loading v-model:active="isLoading" is-full-page />
    <main class="relative w-full h-[650px] mt-10 mb-130">
        <div>
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.backdrop_path}`"
                :alt="movieStore.currentMovie.title" class="absolute inset-0 w-full h-full object-cover opacity-15 " />
        </div>
        <div class="relative z-10 flex gap-20 p-20">
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
                :alt="movieStore.currentMovie.title" class="w-80 h-100 shadow-xl rounded-2xl" />
            <div class="text-white ">
                <h1 class="font-[Girassol] text-5xl mb-5"> {{ movieStore.currentMovie.title || "Sem título" }}</h1>
                <div class="flex gap-5 mb-5">
                    <p class="inline-block border-2 border-white px-2 py-0.5 text-[#f6a233]">
                        {{ movieStore.currentMovie.certification }}</p>
                    <p class="text-white text-xl"> | <span class="mdi mdi-clock-outline text-[#f6a233]"></span> {{
                        movieStore.currentMovie.runtime }} min </p>
                </div>
                <p class="mb-5 font-[Sen] text-[#f6a233] text-xl"> <span class="mdi mdi-star-outline"></span>
                    {{ movieStore.currentMovie.vote_average || "Não possui avaliação." }}</p>
                <p class="text-lg mb-2"><span
                        class="mdi mdi-calendar-range text-[#f6a233] text-2xl pr-2"></span><strong> Lançamento:
                    </strong> {{ formatDate(movieStore.currentMovie.release_date) || "Sem Data de Lançamento" }}.</p>
                <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.tagline }}</p>
                <p class="mb-5  font-[Sen]">{{ movieStore.currentMovie.overview || "Sem Sinopse" }}</p>
                <p class="mb-5 text-lg font-[Sen]">
                    <span class="mdi mdi-cash-multiple text-[#f6a233] text-2xl pr-2"></span> <strong> Orçamento:
                    </strong> {{
                        movieStore.currentMovie.budget > 0 ?
                            `$${movieStore.currentMovie.budget}` : "Orçamento não calculado" }}.
                </p>
            </div>
            <div class="ml-5 w-100">
                <p class="text-white font-[Girassol] text-2xl">Produtoras:</p>
                <div class="text-white mb-5 font-[Sen]" v-for="company in movieStore.currentMovie.production_companies"
                    :key="company.id">
                    <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                        :alt="companyname">
                    <p v-else>{{ company.name }}</p>
                    <p class="text-white font-[Girassol] text-2xl mt-20">Diretor:</p>
                    <div v-if="director" class=" justify-centeritems-center mb-5">
                        <img v-if="director.profile_path" :src="`https://image.tmdb.org/t/p/w185${director.profile_path}`" :alt="director.name" class="w-30 h-40 rounded-md" />
                        <div v-else class="w-30 h-40 bg-[#0f0f0f] border-2 border-white rounded-xl flex items-center justify-center text-5xl"><span class="mdi mdi-account-off"></span></div>
                        <p class="text-white font-[Montserrat] text-xl">
                            {{ director.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-20">
            <CarouselComponent title="Elenco" :items="actors" :card="ActorCardComponent" />
        </div>
    </main>
</template>
