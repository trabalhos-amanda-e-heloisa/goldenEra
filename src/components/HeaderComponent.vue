<template>
    <header>
        <div>
            <nav class="py-3 ml-5 flex gap-15 text-xl text-[#f6a233]">
                <router-link to="/" class="w-10"><img src="/images/golden_era.svg" alt="logo GoldenEra"></router-link>
                <router-link to="/" class="hover:text-white font-[Girassol] tracking-widest" active-class="bg-[#f6a233] text-black px-4 h-8 rounded-sm"><span class="mdi mdi-home-outline"></span>Home</router-link>
                <router-link to="/filmes" class="hover:text-white font-[Girassol] tracking-widest" active-class="bg-[#f6a233] text-black px-4 h-8 rounded-sm"><span class="mdi mdi-movie-open-outline"></span>Filmes</router-link>
                <router-link to="/atores" class="hover:text-white font-[Girassol] tracking-widest" active-class="bg-[#f6a233] text-black px-4 h-8 rounded-sm"><span class="mdi mdi-drama-masks"></span>Atores</router-link>
            </nav>
        </div>
    </header>
</template>