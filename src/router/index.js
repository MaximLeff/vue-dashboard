import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import AdminViews from '../views/AdminView.vue'
import DashboardView from '../views/adminViews/DashboardView.vue'
import HeaderView from '../views/adminViews/HeaderView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/:pathMatch(.*)', 
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'SignIn',
      component: () => import('../views/SignInView.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/admin',
      name: 'header',
      component: AdminViews,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'header',
          component: HeaderView,
          
        },
        {
          path: 'dashboard',
          component: DashboardView,
        }
      ]
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
              removeListener();
              resolve(user);
          },
          reject
      );
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (await getCurrentUser()) {
          next();
      } else {
          alert("you don't have access!");
          next("/")
      }
  } else {
      next();
  }
});

export default router
