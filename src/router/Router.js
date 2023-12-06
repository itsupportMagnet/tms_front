import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar/Sidebar.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    //  meta: { sidebar: Sidebar }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    // meta: { sidebar: Sidebar }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;