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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;