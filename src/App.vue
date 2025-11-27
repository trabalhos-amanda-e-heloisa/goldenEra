<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

</script>
<template>
    <div class="min-h-screen flex flex-col">
    <header>
      <HeaderComponent/>
    </header>
    <main class="flex-1">
        <router-view />
    </main>
    <footer>
        <FooterComponent/>
    </footer>
    </div>
</template>