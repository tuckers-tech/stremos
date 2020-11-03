import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './config/firebase';

Vue.config.productionTip = false;

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-pro/js/all';
import store from './store';

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fal'
});

let app;
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }

  if (user) {
    store.dispatch('fetchUserProfile', user);
  }
});

window.addEventListener('message', e => {
  if (
    e.data &&
    typeof e.data === 'string' &&
    e.data.match(/webpackHotUpdate/)
  ) {
    location.reload();
    console.clear();
  }
});
