<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    actor: {type: Object, required: true}
});

const openActor = () => {
    router.push({ name: 'ActorDetails', params: { actorId: props.actor.id } });
};
</script>
<template>
    <div @click="openActor" class="cursor-pointer text-white mt-10">
        <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`" :alt="actor.name" class="rounded-xl shadow-lg hover:opacity-80 transition w-50 h-70 object-cover"/>
        <div v-else class="w-47 h-70 bg-[#0f0f0f] border-2 border-white rounded-xl flex items-center justify-center text-5xl"><span class="mdi mdi-account-off"></span></div>
        <p class="font-[Girassol] text-2xl text-center text-ellipsis w-40">{{ actor.name }}</p>
    </div>
</template>