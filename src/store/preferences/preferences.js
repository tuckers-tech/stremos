// import router from '../../router/index';

const state = {
  preferences: {},
};

const getters = {
  allPreferences(state) {
    return state.preferences;
  },
};

const mutations = {
  setPreferences(state, newPreferences) {
    state.preferences = newPreferences;
  },
};

const actions = {
  async sendPreferenceUpdateRequest() {
    window.ipc.send('preferences::update');
  },
  async setPreferences({ commit }, preferences) {
    commit('setPreferences', preferences);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
