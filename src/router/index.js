import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    },
    {
    path: '/filmes',
    name: 'Filmes',
    component: () => import('../views/MovieView.vue')
    },
    {
      path: '/atores',
      name: 'Atores',
      component: () => import('../views/ActorsView.vue')
    },
    {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetailsView.vue'),
    props: true,
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;