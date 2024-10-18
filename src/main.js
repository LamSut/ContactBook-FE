import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import router from './router';


import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

createApp(App)
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app');
