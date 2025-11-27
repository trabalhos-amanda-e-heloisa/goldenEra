<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';

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
