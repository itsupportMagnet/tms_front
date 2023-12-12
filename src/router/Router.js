import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar/Sidebar.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/florida-quotes',
    name: 'Florida-Quotes',
    component: () => import('../views/FloridaQuote.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;