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
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetailsView.vue'),
    props: true,
  },
  {
    path: '/atores',
    name: 'Atores',
    component: () => import('../views/ActorsView.vue')
  },
  {
    path: '/ator/:actorId',
    name: 'ActorDetails',
    component: () => import('../views/ActorDetailsView.vue'),
    props: true,
  },
  {
    path: '/diretores',
    name: 'Diretores',
    component: () => import('../views/DirectorsView.vue')
  },
  {
    path: '/diretor/:directorId',
    name: 'DirectorDetails',
    component: () => import('../views/DirectorDetailsView.vue'),
    props: true,
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});


export default router;

