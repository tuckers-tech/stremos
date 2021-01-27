import { requestData } from '../../utilities/ipc';

const state = {
  plugins: [],
};

const getters = {};

const mutations = {
  setPlugins(state, updatedPlugins) {
    state.plugins = updatedPlugins;
  },
};

const actions = {
  updatePlugins({ commit }) {
    requestData('plugins::load')
      .then(plugins => {
        commit('setPlugins', plugins);
      })
      .catch(err => console.log(err));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
