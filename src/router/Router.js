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
  },
  {
    path: '/all-operations',
    name: 'All Operations',
    component: () => import('../views/AllOperations.vue')
  },
  {
    path: '/sale-gross',
    name: 'Sales Gross',
    component: () => import('../views/SalesGross.vue')
  },
  {
    path: '/all-quotes',
    name: 'All Quotes',
    component: () => import('../views/AllQuotes.vue')
  },
  {
    path: '/clients',
    name: 'All Clients',
    component: () => import('../views/Clients.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;