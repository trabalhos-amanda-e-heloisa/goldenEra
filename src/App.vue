<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import axios from 'axios';


const genres = ref([]);


onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
});


</script>


<template>
    <header>
        <div>
            <nav class="py-3 ml-5 flex gap-15 text-xl text-[#f6a233]">
                <router-link to="/" class="w-10"><img src="/images/golden_era.svg" alt="logo GoldenEra"></router-link>
                <router-link to="/" class="hover:text-white font-[Girassol] tracking-widest">Home</router-link>
                <router-link to="/filmes" class="hover:text-white font-[Girassol] tracking-widest">Filmes</router-link>
                <router-link to="/atores" class="hover:text-white font-[Girassol] tracking-widest">Atores</router-link>
                <router-link to="/diretores" class="hover:text-white font-[Girassol] tracking-widest">Diretores</router-link>
            </nav>
        </div>
    </header>
    <router-view />


</template>


<style scoped></style>