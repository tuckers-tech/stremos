import * as fb from '../../config/firebase';
import router from '../../router/index';

const state = {
  currentUserID: '',
  userProfile: {},
  dataOutOfSyncWithDB: false
};

const getters = {
  currentUser(state) {
    return state.userProfile;
  },
  isDataOutOfSync(state) {
    return state.dataOutOfSyncWithDB;
  }
};

const mutations = {
  setUserProfile(state, val) {
    state.userProfile = val;
  },
  setSyncStatus(state, val) {
    state.dataOutOfSyncWithDB = val;
  },
  setCurrentUserID(state, val) {
    state.currentUserID = val;
  }
};

const actions = {
  async fetchUserProfile({ commit }, user) {
    // fetch user profile
    const userProfile = await fb.usersCollection.doc(user.uid).get();

    // set user profile in state
    commit('setUserProfile', userProfile.data());
    commit('setCurrentUserID', user.uid);

    // change route to dashboard
    if (router.currentRoute.path === '/login') {
      router.push('/');
    }
  },
  updateLocalUserStore({ commit }, payload) {
    commit('setUserProfile', payload);
    commit('setSyncStatus', true);
  },
  async synchronizeDataWithDatabase({ commit }) {
    await fb.usersCollection
      .doc(state.currentUserID)
      .set(state.userProfile, { merge: true });

    commit('setSyncStatus', false);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
