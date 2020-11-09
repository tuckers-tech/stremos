const state = {
  isKeyDown: false,
  activeKeyboardButtons: []
};

const getters = {
  isCtrlDown(state) {
    if (!state.isKeyDown) {
      return false;
    }

    if (
      state.activeKeyboardButtons.includes('ControlLeft') ||
      state.activeKeyboardButtons.includes('ControlRight')
    ) {
      return true;
    }

    return false;
  },
  isSpaceDown(state) {
    if (!state.isKeyDown) {
      return false;
    }

    if (state.activeKeyboardButtons.includes('Space')) {
      return true;
    }

    return false;
  }
};

const mutations = {
  changeKeyboardDownState(state, isKeyDown) {
    state.isKeyDown = isKeyDown;
  },
  addKeyToActiveKeyboardButtons(state, key) {
    if (!state.activeKeyboardButtons.includes(key)) {
      state.activeKeyboardButtons.push(key);
    }
  },
  removeKeyFromActiveKeyboardButtons(state, key) {
    if (state.activeKeyboardButtons.includes(key)) {
      state.activeKeyboardButtons.splice(
        state.activeKeyboardButtons.indexOf(key),
        1
      );
    }
  }
};

const actions = {
  handleKeyboardEvent({ commit }, keyboardEvent) {
    switch (keyboardEvent.type) {
      case 'keyup':
        commit('changeKeyboardDownState', false);
        commit('removeKeyFromActiveKeyboardButtons', keyboardEvent.code);
        break;
      case 'keydown':
        commit('changeKeyboardDownState', true);
        commit('addKeyToActiveKeyboardButtons', keyboardEvent.code);
        break;
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
