const state = {
  blocks: [
    {
      id: 1,
      x: -550,
      y: 0,
      name: 'serverEntry',
      title: 'Server Entry',
      values: {
        property: [
          {
            name: 'message',
            type: 'string',
          },
        ],
      },
    },
    {
      id: 2,
      x: -250,
      y: 0,
      name: 'router',
      title: 'Router',
      values: {
        property: [
          {
            name: 'message',
            type: 'string',
          },
        ],
      },
    },
    {
      id: 3,
      x: 0,
      y: -150,
      name: 'getByID',
      title: 'GET',
      values: {
        property: [
          {
            name: 'id',
            type: 'string',
          },
        ],
      },
    },
    {
      id: 4,
      x: 250,
      y: -150,
      name: 'getDataByQuery',
      title: 'Get Data',
      values: {
        property: [
          {
            name: 'id',
            type: 'string',
          },
        ],
      },
    },
    {
      id: 5,
      x: 500,
      y: -150,
      name: 'sendResponse',
      title: 'Send Response',
      values: {
        property: [
          {
            name: 'id',
            type: 'string',
          },
        ],
      },
    },
    {
      id: 6,
      x: 500,
      y: -75,
      name: 'sendResponse',
      title: 'Send Response',
      values: {
        property: [
          {
            name: 'id',
            type: 'string',
          },
        ],
      },
    },
  ],
  links: [
    {
      id: 1,
      originID: 1,
      originSlot: 0,
      targetID: 2,
      targetSlot: 0,
    },
    {
      id: 2,
      originID: 2,
      originSlot: 0,
      targetID: 3,
      targetSlot: 0,
    },
    {
      id: 3,
      originID: 3,
      originSlot: 0,
      targetID: 4,
      targetSlot: 0,
    },
    {
      id: 4,
      originID: 4,
      originSlot: 0,
      targetID: 5,
      targetSlot: 0,
    },
    {
      id: 5,
      originID: 3,
      originSlot: 1,
      targetID: 6,
      targetSlot: 0,
    },
  ],
  container: {
    centerX: 0,
    centerY: 0,
    scale: 1,
  },
};

const getters = {
  getScene(state) {
    return {
      blocks: state.blocks,
      links: state.links,
      container: state.container,
    };
  },
  getBlocks(state) {
    return state.blocks;
  },
};

const mutations = {
  addBlock(state, newBlock) {
    console.log(newBlock);
    const idList = state.blocks.map(block => parseInt(block.id));
    const nextID = Math.max(...idList) + 1;

    state.blocks.push({
      id: nextID,
      x: 0,
      y: 0,
      name: newBlock.name,
      title: newBlock.title,
      values: {
        property: [
          {
            name: 'message',
            type: 'string',
          },
        ],
      },
    });
  },
  updateBlocks(state, newBlocks) {
    state.blocks = newBlocks;
  },
  updateLinks(state, newLinks) {
    state.links = newLinks;
  },
  updateContainer(state, newContainer) {
    state.container = newContainer;
  },
  deleteBlock(state, targetID) {
    state.blocks = state.blocks.filter(block => block.id !== targetID);
  },
  removeLink(state, targetLinkID) {
    state.links = state.links.filter(link => link.id !== targetLinkID);
  },
};

const actions = {
  addBlock({ commit }, blockInfo) {
    console.log(blockInfo);
    commit('addBlock', blockInfo);
  },
  updateScene({ commit }, newScene) {
    commit('updateBlocks', newScene.blocks);
    commit('updateLinks', newScene.links);
    commit('updateContainer', newScene.container);
  },
  deleteBlock({ commit }, targetID) {
    return new Promise(resolve => {
      commit('deleteBlock', targetID);
      resolve();
    });
  },
  removeLink({ commit }, targetLink) {
    return new Promise(resolve => {
      commit('removeLink', targetLink);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
