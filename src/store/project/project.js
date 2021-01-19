import { requestData } from '../../utilites/ipc';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async loadProject(_, projectMetadata) {
    return new Promise((resolve, reject) => {
      requestData('project::load', projectMetadata)
        .then(data => {
          console.log(data);
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
