const state = {
  projectList: [
    {
      id: 'a47a0993-d1f6-4753-8ae1-138cc9876f2b',
      projectName: 'Another Project',
      projectType: 'desktop',
    },
    {
      id: '78172015-496e-4b32-94a2-e27b8d501cc2',
      projectName: 'Example Project',
      projectType: 'web',
    },
  ],
};

const getters = {
  projectList(state) {
    return state.projectList;
  },
};

const mutations = {};

const actions = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
