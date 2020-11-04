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
    this.state.projectList = val;
  }
};

const actions = {
  async updateProjects({ commit }) {
    // Wait for 250 ms if page refresh just happened to populate user data
    setTimeout(async () => {
      const currentUser = this.state.user.currentUserID;

      let projectList = await fb.projectsCollection
        .where('owner', '==', currentUser)
        .get();

      let data = [];

      projectList.forEach(element => {
        data.push(element.data());
      });

      commit('setProjectList', data);
    }, 250);
  },
  async addProject({ dispatch }, newProjectData) {
    console.log(dispatch, newProjectData);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
