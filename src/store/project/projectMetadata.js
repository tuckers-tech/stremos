import { v4 as uuidv4 } from 'uuid';
import { requestData } from '../../utilities/ipc';

const state = {
  projectMetadata: {},
};

const getters = {
  allProjects(state) {
    return state.projectMetadata.projects;
  },
  projectMetadataByID: state => targetID => {
    return state.projectMetadata.projects.filter(
      project => project.id === targetID,
    );
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
    return new Promise(resolve => {
      let newProjectData = { ...projectData, id: uuidv4() };

      requestData('project-metadata::create', newProjectData)
        .then(() => {
          resolve(newProjectData);
        })
        .catch(err => console.log(err));
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
