<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';

const genres = ref([]);

onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres;
});
</script>
<template>
    <header>
        <HeaderComponent/>
    </header>
    <main>
        <router-view />
    </main>
</template>
<style scoped></style>
