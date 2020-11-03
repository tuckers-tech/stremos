import * as fb from '../../config/firebase';
import router from '../../router/index';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async login({ dispatch }, form) {
    // sign user in
    const { user } = await fb.auth.signInWithEmailAndPassword(
      form.email,
      form.password
    );

    // fetch user profile and set in state
    dispatch('fetchUserProfile', user);
  },
  async register({ dispatch }, form) {
    // sign user up
    const { user } = await fb.auth.createUserWithEmailAndPassword(
      form.email,
      form.password
    );

    // create user profile object in userCollections
    await fb.usersCollection.doc(user.uid).set({
      fname: form.fname,
      lname: form.lname,
      email: form.email
    });

    // fetch user profile and set in state
    dispatch('fetchUserProfile', user);
  },
  async logout({ commit }) {
    await fb.auth.signOut();

    // clear userProfile and redirect to /login
    commit('setUserProfile', {});

    router.push('/login');
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
