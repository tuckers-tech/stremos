import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/project/:projectID',
    component: () =>
      import(
        /* webpackChunkName: "projectDetail" */ '../views/Project/ProjectDetail.vue'
      ),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'projectDashboard',
        component: () =>
          import(
            /* webpackChunkName: "projectDashboard" */ '../components/Project/ProjectDashboard.vue'
          ),
      },
      {
        path: 'data',
        name: 'projectData',
        component: () =>
          import(
            /* webpackChunkName: "projectData" */ '../components/Project/ProjectData.vue'
          ),
      },
      {
        path: 'settings',
        name: 'projectSettings',
        component: () =>
          import(
            /* webpackChunkName: "projectSettings" */ '../components/Project/ProjectSettings.vue'
          ),
      },
      {
        path: 'billing',
        name: 'projectBilling',
        component: () =>
          import(
            /* webpackChunkName: "projectBilling" */ '../components/Project/ProjectBilling.vue'
          ),
      },
      {
        path: 'service/:serviceID',
        name: 'serviceEdit',
        component: () =>
          import(
            /* webpackChunkName: "serviceEdit" */ '../components/Project/Service/ServiceEdit.vue'
          ),
      },
      {
        path: 'topology',
        component: () =>
          import(
            /* webpackChunkName: "projectTopologyContainer" */ '../components/Project/ProjectTopologyContainer.vue'
          ),
        children: [
          {
            path: '/',
            name: 'projectTopology',
            component: () =>
              import(
                /* webpackChunkName: "projectTopology" */ '../components/Project/ProjectTopology.vue'
              ),
          },
        ],
      },
    ],
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
      requiresAuth: true,
    },
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
      requiresAuth: true,
    },
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
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth) {
    console.log('auth failed');

    next();
  } else {
    next();
  }
});

export default router;
