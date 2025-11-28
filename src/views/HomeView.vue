<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router'
import { useGenreStore } from '@/stores/genre';
import MovieCardComponent from '@/components/MovieCardComponent.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies1920s = ref([]);
const movies1930s = ref([]);
const movies1940s = ref([]);
const movies1950s = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const decade = async (from, to, array) => {
	const response = await api.get("discover/movie", {
		params: {
			language: "pt-BR",
			sort_by: "popularity.desc",
			"release_date.gte": from,
			"release_date.lte": to,
		},
	});
	array.value = response.data.results;
};

onMounted(async () => {
	isLoading.value = true;
	await genreStore.getAllGenres('movie');
	await decade("1920-01-01", "1929-12-31", movies1920s);
	await decade("1930-01-01", "1939-12-31", movies1930s);
	await decade("1940-01-01", "1949-12-31", movies1940s);
	await decade("1950-01-01", "1959-12-31", movies1950s);
	isLoading.value = false;
});

function openMovie(movieId) {
	router.push({ name: 'MovieDetails', params: { movieId } });
}

function onGenreClick(genreId) {
	router.push({ name: 'Filmes', query: { genreId } });
}

</script>
<template>
	<loading v-model:active="isLoading" is-full-page />
	<main class="m-20 mt-25 items-center justify-between">
		<div class="h-120 flex gap-20 mx-10">
			<div class="flex-1">
				<h1 class="font-[Girassol] text-8xl text-white mt-25 mb-10 tracking-wider">GoldenEra</h1>
				<p class="text-white font-[Sen] text-3xl w-170">Seu local de encontro com os maiores clássicos da Era de Ouro do Cinema!</p>
			</div>
			<div class="mr-20">
				<img src="/images/goldenEra_banner.svg" alt="GoldenEra Banner" class="opacity-0 scale-120 transition-all duration-1500" onload="this.classList.remove('opacity-0','scale-120')">
			</div>
		</div>
		<div class="mb-20">
			<CarouselComponent title="Filmes da década de 1920" :items="movies1920s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }" />
			<CarouselComponent title="Filmes da década de 1930" :items="movies1930s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }" />
			<CarouselComponent title="Filmes da década de 1940" :items="movies1940s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }" />
			<CarouselComponent title="Filmes da década de 1950" :items="movies1950s" :card="MovieCardComponent" :cardProps="{ formatDate, onMovieClick: openMovie, genres: genreStore.genres, onGenreClick }" />
		</div>
	</main>
</template>