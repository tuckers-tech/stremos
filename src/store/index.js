import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/user';
import project from './project/project';
import projectTopology from './project/projectTopology';
import mouseMonitor from './InputMonitor/mouseMonitor';
import keyboardMonitor from './InputMonitor/keyboardMonitor';
import topologyGraph from './graphs/topologyGraph';
import preferences from './preferences/preferences';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    project,
    projectTopology,
    mouseMonitor,
    keyboardMonitor,
    topologyGraph,
    preferences,
  },
});
