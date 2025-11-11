<script setup></script>

<template>
    <header>
        <nav class="m-5 flex gap-10 text-xl font-bold">
            <router-link to="/">Home</router-link>
            <router-link to="/filmes">Filmes</router-link>
            <router-link to="/atores">Atores</router-link>
        </nav>
    </header>
    <main>
        <router-view />
    </main>
</template>

<style scoped>

</style>
