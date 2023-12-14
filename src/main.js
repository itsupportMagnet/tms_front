import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import 'animate.css';

createApp(App).use(router).mount('#app')
