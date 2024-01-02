import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Router'
import store from './store'
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'mosha-vue-toastify/dist/style.css'
import 'bootstrap';
import 'animate.css';

createApp(App).use(router).use(store).mount('#app')
