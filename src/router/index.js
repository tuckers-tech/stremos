import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import { auth } from '../config/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:projectID',
    component: () =>
      import(
        /* webpackChunkName: "projectDetail" */ '../views/Project/ProjectDetail.vue'
      ),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'projectDashboard',
        component: () =>
          import(
            /* webpackChunkName: "projectDashboard" */ '../components/ProjectDetail/ProjectDashboard.vue'
          )
      },
      {
        path: 'settings',
        name: 'projectSettings',
        component: () =>
          import(
            /* webpackChunkName: "projectSettings" */ '../components/ProjectDetail/ProjectSettings.vue'
          )
      },
      {
        path: 'billing',
        name: 'projectBilling',
        component: () =>
          import(
            /* webpackChunkName: "projectBilling" */ '../components/ProjectDetail/ProjectBilling.vue'
          )
      },
      {
        path: 'topology',
        name: 'projectTopology',
        component: () =>
          import(
            /* webpackChunkName: "projectTopology" */ '../components/ProjectDetail/ProjectTopology.vue'
          )
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/preferences',
    name: 'preferences',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "preferences" */ '../views/UserManagement/Preferences.vue'
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "profile" */ '../views/UserManagement/Profile.vue'
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
