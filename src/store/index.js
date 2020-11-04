import Vue from 'vue';
import Vuex from 'vuex';
// import * as fb from '../auth/firebase';
// import router from '../router/index';
import auth from './auth/auth';
import user from './user/user';
import project from './project/project';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    project
  }
});
