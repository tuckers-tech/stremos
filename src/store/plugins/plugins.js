import { requestData } from '../../utilities/ipc';

const state = {
  plugins: [],
};

const getters = {
  getAvailableLibraries: state => targetType => {
    const availableLibraries = state.plugins.map(plugin => {
      return {
        name: plugin.name,
        blocks: plugin.blocks.filter(block => block.blockType === targetType),
      };
    });

    console.log(availableLibraries);
    return availableLibraries;
  },
  getAvailableBlocks: state => targetType => {
    const availableBlocks = state.plugins.map(plugin => {
      return plugin.blocks
        .map(block => ({ ...block, pluginName: plugin.name }))
        .filter(block => block.blockType === targetType);
    });

    var resultArray = Array.prototype.concat.apply([], availableBlocks);

    return resultArray;
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
