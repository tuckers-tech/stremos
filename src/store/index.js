import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth';
import user from './user/user';
import project from './project/project';
import projectTopology from './project/projectTopology';
import mouseMonitor from './InputMonitor/mouseMonitor';
import keyboardMonitor from './InputMonitor/keyboardMonitor';
import topologyGraph from './graphs/topologyGraph';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    project,
    projectTopology,
    mouseMonitor,
    keyboardMonitor,
    topologyGraph
  }
});
