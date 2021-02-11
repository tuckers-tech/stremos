const state = {
  blocks: [],
  links: [],
  container: {
    centerX: 0,
    centerY: 0,
    scale: 0.8,
  },
  activeNode: null,
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
  getServices() {
    return state.blocks.filter(block => block.name === 'service');
  },
  getActiveNode(state) {
    if (isNaN(parseInt(state.activeNode))) {
      return false;
    }

    let returnVars = state.blocks.filter(
      block => parseInt(block.id) === parseInt(state.activeNode),
    );

    return returnVars[0];
  },
};

const mutations = {
  addBlock(state, newBlock) {
    const idList = state.blocks.map(block => parseInt(block.id));
    const nextID = Math.max(...idList) + 1;

    state.blocks.push({
      id: isNaN(parseInt(nextID)) ? 0 : nextID,
      x: 0,
      y: 0,
      name: newBlock.name,
      title: newBlock.title,
      values: {
        variables: [...newBlock.variables],
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
  setActiveNode(state, targetNodeID) {
    state.activeNode = targetNodeID;
  },
  updateNode(state, newNodeVersion) {
    let otherNodes = state.blocks.filter(
      block => block.id !== newNodeVersion.id,
    );

    state.blocks = [...otherNodes, newNodeVersion];
  },
};

const actions = {
  addBlock({ commit }, blockInfo) {
    console.log(blockInfo);
    commit('addBlock', blockInfo);
  },
  updateTopology({ commit }, newScene) {
    commit('updateBlocks', newScene.blocks);
    commit('updateLinks', newScene.links);
    commit('updateContainer', newScene.container);
  },
  topologyDeleteBlock({ commit }, targetID) {
    return new Promise(resolve => {
      console.log(targetID);
      commit('deleteBlock', targetID);
      resolve();
    });
  },
  topologyRemoveLink({ commit }, targetLink) {
    return new Promise(resolve => {
      commit('removeLink', targetLink);
      resolve();
    });
  },
  setActiveNode({ commit, state }, targetNodeID) {
    console.log('active node:', state);
    commit('setActiveNode', targetNodeID);
  },
  unsetActiveNode({ commit }) {
    commit('setActiveNode', null);
  },
  updateNode({ state, commit }, nodeUpdate) {
    let targetNode = state.blocks.filter(
      block => block.id === nodeUpdate.nodeID,
    )[0];

    let updateScope = nodeUpdate.slug.split('.');

    let updatedNode;

    if (updateScope[0] === 'variable') {
      let oldVariables = targetNode.values.variables;

      let targetEntry = oldVariables.filter(
        variable => variable.slug === updateScope[1],
      )[0];
      targetEntry.value = nodeUpdate.value;

      let newVariables = [
        ...oldVariables.filter(variable => variable.slug !== updateScope[1]),
        targetEntry,
      ];

      updatedNode = {
        ...targetNode,
        values: {
          variables: newVariables,
        },
      };
    } else {
      let targetNode = state.blocks.filter(
        block => block.id === nodeUpdate.nodeID,
      )[0];

      updatedNode = {
        ...targetNode,
      };

      updatedNode[nodeUpdate.slug] = nodeUpdate.value;
    }

    commit('updateNode', updatedNode);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
