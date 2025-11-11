<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useActorStore } from '@/stores/actor';
import Loading from 'vue-loading-overlay';

const router = useRouter();
const actorStore = useActorStore();

const isLoading = ref(false);
const query = ref('');
const actors = ref([]);

const searchActors = async () => {
  if (!query.value.trim()) return;
  isLoading.value = true;
  await actorStore.searchGoldenAgeActors(query.value);
  actors.value = actorStore.actors;
  isLoading.value = false;
};

function openActor(actorId) {
  router.push({ name: 'ActorDetails', params: { actorId } });
}

const getProfileImage = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Foto';
};
</script>

<template>
  <div class="container">
    <h1 class="">Atores e Atrizes da Era de Ouro</h1>

    <div class="search-bar">
      <input
        v-model="query"
        @keyup.enter="searchActors"
        placeholder="Digite o nome do ator/atriz..."
        type="text"
      />
      <button @click="searchActors">Buscar</button>
    </div>

    <loading v-model:active="isLoading" is-full-page />

    <div v-if="actors.length > 0" class="actor-list">
      <div
        v-for="actor in actors"
        :key="actor.id"
        class="actor-card"
        @click="openActor(actor.id)"
      >
        <img :src="getProfileImage(actor.profile_path)" :alt="actor.name" />
        <div class="actor-info">
          <p class="actor-name">{{ actor.name }}</p>
          <p class="known-for">
            <strong>Conhecido(a) por:</strong>
            <span
              v-for="work in actor.known_for.slice(0, 2)"
              :key="work.id"
            >
              {{ work.title || work.name }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <p v-else class="no-results">
      Nenhum ator da Era de Ouro encontrado. Tente outro nome.
    </p>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  text-align: center;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-bar input {
  width: 20rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.search-bar button {
  background-color: #387250;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #4e9e5f;
}

.actor-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.actor-card {
  width: 14rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  cursor: pointer;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
}

.actor-card:hover {
  transform: scale(1.05);
}

.actor-card img {
  width: 100%;
  height: 21rem;
  object-fit: cover;
}

.actor-info {
  padding: 0.5rem;
}

.actor-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.known-for {
  font-size: 0.9rem;
  color: #333;
}

.no-results {
  margin-top: 2rem;
  font-size: 1rem;
  color: #666;
}
</style>
