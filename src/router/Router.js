import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar/Sidebar.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/make-quote',
    name: 'Make Quote',
    component: () => import('../views/MakeQuote.vue')
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
  },
  {
    path: '/carriers',
    name: 'Carriers',
    component: () => import('../views/AllCarriers.vue')
  },
  {
    path: '/florida-quotes',
    name: 'Florida-Quotes',
    component: () => import('../views/FloridaQuote.vue')
  },
  {
    path: '/new-do',
    name: 'New DO',
    component: () => import('../views/NewDo.vue')
  },
  {
    path: '/add-quote-fee',
    name: 'Add Quote Fee',
    component: () => import('../views/AddQuoteFee.vue')
  },
  {
    path: '/edit-quote-fee',
    name: 'Edit Quote Fee',
    component: () => import('../views/EditQuoteFee.vue')
  },
  {
    path: '/send-quote',
    name: 'Send Quote',
    component: () => import('../views/SendQuote.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;