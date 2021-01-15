const state = {
  projectMetadata: {},
};

const getters = {
  recentProjects(state) {
    return state.projectMetadata;
  },
};

const mutations = {
  setProjectMetadata(state, newProjectMetadata) {
    state.projectMetadata = newProjectMetadata;
  },
};

const actions = {
  async updateProjectMetadata() {
    window.ipc.send('project-metadata::update');
  },
  async setProjectMetadata({ commit }, newProjectMetadata) {
    commit('setProjectMetadata', newProjectMetadata);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
