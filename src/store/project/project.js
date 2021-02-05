import { requestData } from '../../utilities/ipc';
import projectMetadata from './projectMetadata';
// import projectTopology from './projectTopology';
// import projectServices from './projectServices';

const state = {
  metadata: {},
  dependencies: {},
  topology: {},
  data: {},
  activeNode: null,
};

const getters = {
  metadata(state) {
    return state.currentProject.metadata;
  },
  getActiveNode(state) {
    if (isNaN(parseInt(state.activeNode))) {
      return false;
    }

    let returnVars = state.topology.blocks.filter(
      block => parseInt(block.id) === parseInt(state.activeNode),
    );

    return returnVars[0];
  },

  // TOPOLOGY
  getTopologyScene(state) {
    return {
      blocks: state.topology.blocks,
      links: state.topology.links,
      container: state.topology.container,
    };
  },
  getTopologyBlocks(state) {
    return state.topology.blocks;
  },
  getServices() {
    return state.topology.blocks.filter(block => block.name === 'service');
  },
};

const mutations = {
  setProjectData(state, projectData) {
    state.metadata = projectData.metadata;
    state.data = projectData.data;
    state.dependencies = projectData.dependencies;
    state.topology = projectData.topology;
  },
  setActiveNode(state, targetNodeID) {
    state.activeNode = targetNodeID;
  },

  // TOPOLOGY
  addTopologyBlock(state, newBlock) {
    const idList = state.topology.blocks.map(block => parseInt(block.id));
    const nextID = Math.max(...idList) + 1;

    state.topology.blocks.push({
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
  updateTopologyBlocks(state, newBlocks) {
    state.topology.blocks = newBlocks;
  },
  updateTopologyLinks(state, newLinks) {
    state.topology.links = newLinks;
  },
  updateTopologyContainer(state, newContainer) {
    state.topology.container = newContainer;
  },
  deleteTopologyBlock(state, targetID) {
    state.topology.blocks = state.topology.blocks.filter(
      block => block.id !== targetID,
    );
  },
  removeTopologyLink(state, targetLinkID) {
    state.topology.links = state.topology.links.filter(
      link => link.id !== targetLinkID,
    );
  },
  updateTopologyNode(state, newNodeVersion) {
    let otherNodes = state.topology.blocks.filter(
      block => block.id !== newNodeVersion.id,
    );

    state.topology.blocks = [...otherNodes, newNodeVersion];
  },
};

const actions = {
  async loadProject({ commit }, projectMetadata) {
    return new Promise((resolve, reject) => {
      requestData('project::load', projectMetadata)
        .then(data => {
          commit('setProjectData', data);
          resolve();
        })
        .catch(err => reject(err));
    });
  },
  setActiveNode({ commit }, targetNodeID) {
    commit('setActiveNode', targetNodeID);
  },
  unsetActiveNode({ commit }) {
    commit('setActiveNode', null);
  },

  // TOPOLOGY
  addTopologyBlock({ commit }, blockInfo) {
    commit('addTopologyBlock', blockInfo);
  },
  updateTopology({ commit }, newScene) {
    commit('updateTopologyBlocks', newScene.blocks);
    commit('updateTopologyLinks', newScene.links);
    commit('updateTopologyContainer', newScene.container);
  },
  topologyDeleteBlock({ commit }, targetID) {
    return new Promise(resolve => {
      commit('deleteTopologyBlock', targetID);
      resolve();
    });
  },
  topologyRemoveLink({ commit }, targetLink) {
    return new Promise(resolve => {
      commit('removeTopologyLink', targetLink);
      resolve();
    });
  },
  updateTopologyNode({ state, commit }, nodeUpdate) {
    let targetNode = state.topology.blocks.filter(
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
      let targetNode = state.topology.blocks.filter(
        block => block.id === nodeUpdate.nodeID,
      )[0];

      updatedNode = {
        ...targetNode,
      };

      updatedNode[nodeUpdate.slug] = nodeUpdate.value;
    }

    commit('updateTopologyNode', updatedNode);
  },
};

const modules = {
  projectMetadata,
  // projectTopology,
  // projectServices,
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules,
};
