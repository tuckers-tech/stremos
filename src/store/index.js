import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/user';
import project from './project/project';
// import projectTopology from './project/projectTopology';
// import projectMetadata from './project/projectMetadata';
import mouseMonitor from './InputMonitor/mouseMonitor';
import keyboardMonitor from './InputMonitor/keyboardMonitor';
// import topologyGraph from './graphs/topologyGraph';
import preferences from './preferences/preferences';
import plugins from './plugins/plugins';
import misc from './misc/misc';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    project,
    // projectTopology,
    // projectMetadata,
    mouseMonitor,
    keyboardMonitor,
    // topologyGraph,
    preferences,
    plugins,
    misc,
  },
});
