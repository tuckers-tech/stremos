const state = {
  isMouseDown: false,
  activeMouseButton: [],
};

const getters = {
  isPrimaryMouseDown(state) {
    if (!state.isMouseDown) {
      return false;
    }

    if (state.activeMouseButton.includes(0)) {
      return true;
    }

    return false;
  },
};

const mutations = {
  changeMouseDownState(state, isMouseDown) {
    state.isMouseDown = isMouseDown;
  },
  addButtonToActiveMouseButtons(state, button) {
    if (!state.activeMouseButton.includes(button)) {
      state.activeMouseButton.push(button);
    }
  },
  removeButtonFromActiveMouseButtons(state, button) {
    if (state.activeMouseButton.includes(button)) {
      state.activeMouseButton.splice(
        state.activeMouseButton.indexOf(button),
        1,
      );
    }
  },
};

const actions = {
  handleMouseEvent({ commit }, mouseEvent) {
    switch (mouseEvent.type) {
      case 'mouseup':
        commit('changeMouseDownState', false);
        commit('removeButtonFromActiveMouseButtons', mouseEvent.button);
        break;
      case 'mousedown':
        commit('changeMouseDownState', true);
        commit('addButtonToActiveMouseButtons', mouseEvent.button);
        break;
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
