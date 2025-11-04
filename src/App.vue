<script setup>
import { ref, onMounted } from 'vue';
import api from './plugins/axios';

const genres = ref([]);

onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres;
});
</script>

<template>
    <h1>Gêneros</h1>
    <ul>
        <li v-for="genre in genres" :key="genre.id">{{ genre.name }}</li>
    </ul>
</template>

<style scoped></style>
