import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import { useStore } from 'vuex';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'Home' },
    component: () => import("../layout/DashboardLayout/DashboardLayout.vue"),
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/make-quote',
        name: 'Make Quote',
        component: () => import('../views/MakeQuote.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/all-operations',
        name: 'All Operations',
        component: () => import('../views/AllOperations.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/sale-gross',
        name: 'Sales Gross',
        component: () => import('../views/SalesGross.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/all-quotes',
        name: 'All Quotes',
        component: () => import('../views/AllQuotes.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/clients',
        name: 'All Clients',
        component: () => import('../views/Clients.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/carriers',
        name: 'Carriers',
        component: () => import('../views/Carriers.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/florida-quotes',
        name: 'Florida-Quotes',
        component: () => import('../views/FloridaQuote.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/new-do',
        name: 'New DO',
        component: () => import('../views/NewDo.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/add-quote-fee',
        name: 'Add Quote Fee',
        component: () => import('../views/AddQuoteFee.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/edit-quote-fee',
        name: 'Edit Quote Fee',
        component: () => import('../views/EditQuoteFee.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/send-quote',
        name: 'Send Quote',
        component: () => import('../views/SendQuote.vue'),
        meta: {
          isAuth: true,
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    redirect: { name: 'Login' },
    component: () => import("../layout/NormalLayout/NormalLayout.vue"),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){
    return {top: 0, left: 0, behaviour: 'smooth'}
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    const store = useStore()
    const verifyToken = await store.dispatch('verifyToken')
    if (verifyToken && verifyToken == 'Valid token') {
      if(to.meta.adminAuth){
        if(localStorage.getItem('rol') == 1){
          next()
        }else {
          next('/dashboard')
        }
      }else if(to.meta.userAuth){
        if(localStorage.getItem('rol') == 2){
          next()
        }else{
          next('/dashboard')
        }
      }else{
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router;