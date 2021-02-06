// import router from '../../router/index';

const state = {
  isModalOpen: false,
};

const getters = {
  isModalOpen(state) {
    return state.isModalOpen;
  },
};

const mutations = {
  setModalStatus(state, status) {
    state.isModalOpen = status;
  },
};

const actions = {
  setModalStatus({ commit }, status) {
    commit('setModalStatus', status);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
