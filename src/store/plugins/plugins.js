import { requestData } from '../../utilities/ipc';

const state = {
  plugins: [],
};

const getters = {
  getAvailableBlocks: state => targetType => {
    const availableBlocks = state.plugins.map(plugin => {
      return {
        name: plugin.name,
        blocks: plugin.blocks.filter(block => block.blockType === targetType),
      };
    });

    console.log(availableBlocks);
    return availableBlocks;
  },
};

const mutations = {
  setPlugins(state, updatedPlugins) {
    state.plugins = updatedPlugins;
  },
};

const actions = {
  updatePlugins({ commit }) {
    requestData('plugins::load')
      .then(plugins => {
        console.log(plugins);
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
