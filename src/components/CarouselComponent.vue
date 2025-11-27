<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: String,
    items: {type: Array, required: true,},
    card: {type: Object, required: true,},
    cardProps: {type: Object, default: () => ({})}
});
const carousel = ref(null);
const scrollLeft = () => {
    carousel.value?.scrollBy({ left: -300, behavior: 'smooth' });
};
const scrollRight = () => {
    carousel.value?.scrollBy({ left: 300, behavior: 'smooth' });
};
</script>
<template>
    <div class="mb-20">
        <h2 v-if="title" class="font-[Girassol] text-4xl text-[#f6a233] mb-4"> {{ title }} </h2>
        <div class="relative">
            <div class="flex items-center">
                <button @click="scrollLeft" class="z-20 px-3 py-2">
                    <span class="mdi mdi-arrow-left-bold-circle-outline text-white hover:text-[#f6a233] text-4xl"></span>
                </button>
                <div ref="carousel" class="flex gap-4 overflow-x-auto no-scrollbar py-4 px-1 flex-1">
                    <component v-for="item in items" :is="card" :key="item.id" v-bind="cardProps" :actor="item" :movie="item" class="min-w-[210px] h-[300px]" />
                </div>
                <button @click="scrollRight" class="z-20 px-3 py-2">
                    <span class="mdi mdi-arrow-right-bold-circle-outline text-white hover:text-[#f6a233] text-4xl"></span>
                </button>
            </div>
        </div>
    </div>
</template>