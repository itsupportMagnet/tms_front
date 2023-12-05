import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar/Sidebar.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    sidebar: Sidebar
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    sidebar: Sidebar
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;