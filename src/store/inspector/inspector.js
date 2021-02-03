const state = {
  activeNodeVariables: [],
};

const getters = {};

const mutations = {
  setActiveVariables(state, activeVariables) {
    state.activeNodeVariables = activeVariables;
  },
};

const actions = {
  setActiveVariables({ commit }, activeVariables) {
    commit('setActiveVariables', activeVariables);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
