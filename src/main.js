import 'vue-loading-overlay/dist/css/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import "@fontsource/girassol";
import "@fontsource/sen/400.css";
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app');