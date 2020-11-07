import * as fb from '../../config/firebase';

const state = {
  projectList: []
};

const getters = {
  projectList(state) {
    return state.projectList;
  }
};

const mutations = {
  setProjectList(state, val) {
    this.state.project.projectList = val;
  }
};

const actions = {
  async updateProjects({ commit }) {
    // Wait for 250 ms if page refresh just happened to populate user data
    setTimeout(() => {
      const currentUser = this.state.user.currentUserID;

      fb.projectMetadata
        .where('owner', '==', currentUser)
        .get()
        .then(function(querySnapshot) {
          let data = [];
          querySnapshot.forEach(function(doc) {
            data.push({ ...doc.data(), id: doc.id });
          });
          commit('setProjectList', data);
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    }, 250);
  },
  addProject({ dispatch }, newProjectData) {
    return new Promise((resolve, reject) => {
      fb.projectMetadata
        .add({
          ...newProjectData,
          owner: this.state.user.currentUserID
        })
        .then(result => {
          dispatch('updateProjects');
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
