import { requestData } from '../../utilities/ipc';

const state = {
  currentProject: {},
};

const getters = {
  metadata(state) {
    return state.currentProject.metadata;
  },
};

const mutations = {
  setProjectData(state, projectData) {
    state.currentProject = projectData;
  },
};

const actions = {
  async loadProject({ commit }, projectMetadata) {
    return new Promise((resolve, reject) => {
      requestData('project::load', projectMetadata)
        .then(data => {
          commit('setProjectData', data);
          resolve();
        })
        .catch(err => reject(err));
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
