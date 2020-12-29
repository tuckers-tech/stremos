// import router from '../../router/index';

const state = {
  userProfile: {}
};

const getters = {
  userID(state) {
    return state.userProfile.subject;
  },
  userTokenData(state) {
    return state.userProfile.tokenParsed;
  },
  username(state) {
    return state.userProfile.tokenParsed.preferred_username;
  },
  userFirstName(state) {
    return state.userProfile.tokenParsed.given_name;
  },
  userLastName(state) {
    return state.userProfile.tokenParsed.family_name;
  },
  userRealmAccess(state) {
    return state.userProfile.tokenParsed.realm_access.roles;
  },
  userResourceAccess(state) {
    return state.userProfile.tokenParsed.resource_access.account.roles;
  }
};

const mutations = {
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile;
  }
};

const actions = {
  setUserProfile({ commit }, keycloakData) {
    console.log(keycloakData);
    commit('setUserProfile', keycloakData);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
