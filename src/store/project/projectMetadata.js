import { v4 as uuidv4 } from 'uuid';
import { requestData } from '../../utilites/ipc';

const state = {
  projectMetadata: {},
};

const getters = {
  allProjects(state) {
    return state.projectMetadata.projects;
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
  async createProject(ctx, projectData) {
    console.log(ctx, projectData);
    requestData('project-metadata::create', { ...projectData, id: uuidv4() })
      .then(result => {
        console.log(result);
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
