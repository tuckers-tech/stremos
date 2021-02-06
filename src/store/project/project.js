import { requestData } from '../../utilities/ipc';
import projectMetadata from './projectMetadata';

const state = {
  metadata: {},
  dependencies: {},
  topology: {},
  data: {},
  services: [],
  activeNode: { serviceID: null, blockID: null },
};

const getters = {
  metadata(state) {
    return state.metadata;
  },
  getActiveNode(state) {
    if (isNaN(parseInt(state.activeNode.serviceID))) {
      if (isNaN(parseInt(state.activeNode.blockID))) {
        return false;
      }

      let returnVars = state.topology.blocks.filter(
        block => parseInt(block.id) === parseInt(state.activeNode.blockID),
      );

      return returnVars[0];
    } else {
      if (isNaN(parseInt(state.activeNode.blockID))) {
        return false;
      }

      let targetService = state.services.filter(
        service => service.id === state.activeNode.serviceID,
      )[0];

      let returnVars = targetService.blocks.filter(
        block => parseInt(block.id) === parseInt(state.activeNode.blockID),
      );

      return returnVars[0];
    }
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
  getServices(state) {
    return state.topology.blocks.filter(block => block.name === 'service');
  },

  // SERVICE
  getServiceScene: state => serviceID => {
    let targetService = state.services.filter(
      service => service.id === serviceID,
    )[0];

    return {
      blocks: targetService.blocks,
      links: targetService.links,
      container: targetService.container,
    };
  },
};

const mutations = {
  setProjectData(state, projectData) {
    state.metadata = projectData.metadata;
    state.data = projectData.data;
    state.dependencies = projectData.dependencies;
    state.topology = projectData.topology;
    state.services = projectData.services;
  },
  setActiveNode(state, targetNodeData) {
    state.activeNode = targetNodeData;
  },
  updateNode(state, newNodeVersion) {
    let otherNodes;
    if (isNaN(parseInt(state.activeNode.serviceID))) {
      otherNodes = state.topology.blocks.filter(
        block => block.id !== newNodeVersion.id,
      );

      state.topology.blocks = [...otherNodes, newNodeVersion];
    } else {
      otherNodes = state.services
        .filter(service => service.id === state.activeNode.serviceID)[0]
        .blocks.filter(block => block.id === newNodeVersion.nodeID);

      state.services.filter(
        service => service.id === state.activeNode.serviceID,
      )[0].blocks = [...otherNodes, newNodeVersion];
    }
  },

  // TOPOLOGY
  addTopologyBlock(state, newBlock) {
    state.topology.blocks.push(newBlock);
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

  // SERVICE
  createService(state, newServiceID) {
    state.services.push({
      id: newServiceID,
      blocks: [],
      container: {
        centerX: 0,
        centerY: 0,
        scale: 0.8,
      },
      links: [],
    });
  },
  addServiceBlock(state, blockInfo) {
    state.services
      .filter(service => service.id === blockInfo.serviceID)[0]
      .blocks.push(blockInfo.block);
  },
  updateServiceBlocks(state, blockData) {
    state.services.filter(
      service => service.id === blockData.serviceID,
    )[0].blocks = blockData.blocks;
  },
  updateServiceLinks(state, blockData) {
    state.services.filter(
      service => service.id === blockData.serviceID,
    )[0].links = blockData.links;
  },
  updateServiceContainer(state, blockData) {
    state.services.filter(
      service => service.id === blockData.serviceID,
    )[0].container = blockData.container;
  },
  deleteServiceBlock(state, deleteData) {
    state.services.filter(
      service => service.id === deleteData.serviceID,
    )[0].blocks = state.services
      .filter(service => service.id === deleteData.serviceID)[0]
      .blocks.filter(block => block.id !== deleteData.blockID);
  },
  deleteServiceLink(state, deleteData) {
    state.services.filter(
      service => service.id === deleteData.serviceID,
    )[0].links = state.services
      .filter(service => service.id === deleteData.serviceID)[0]
      .links.filter(link => link.id !== deleteData.linkID);
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
    commit('setActiveNode', { serviceID: null, blockID: targetNodeID });
  },
  unsetActiveNode({ commit }) {
    commit('setActiveNode', { serviceID: null, blockID: null });
  },
  updateNode({ state, commit }, nodeUpdate) {
    let targetNode;
    if (isNaN(parseInt(state.activeNode.serviceID))) {
      targetNode = state.topology.blocks.filter(
        block => block.id === nodeUpdate.nodeID,
      )[0];
    } else {
      targetNode = state.services
        .filter(service => service.id === state.activeNode.serviceID)[0]
        .blocks.filter(block => block.id === nodeUpdate.nodeID)[0];
    }

    let updateScope = nodeUpdate.slug.split('.');

    let updatedNode;

    // Determine if variable or metadata
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
      // let targetNode = state.topology.blocks.filter(
      //   block => block.id === nodeUpdate.nodeID,
      // )[0];

      updatedNode = {
        ...targetNode,
      };

      updatedNode[nodeUpdate.slug] = nodeUpdate.value;
    }

    commit('updateNode', updatedNode);
  },

  // TOPOLOGY
  addTopologyBlock({ commit, state }, blockInfo) {
    const idList = state.topology.blocks.map(block => parseInt(block.id));
    const nextID = Math.max(...idList) + 1;

    let newBlock = {
      id: isNaN(parseInt(nextID)) ? 0 : nextID,
      x: 0,
      y: 0,
      name: blockInfo.name,
      title: blockInfo.title,
      values: {
        variables: [...blockInfo.variables],
      },
    };

    commit('createService', newBlock.id);

    commit('addTopologyBlock', newBlock);
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

  // SERVICE
  addServiceBlock({ state, commit }, addServiceData) {
    const targetService = state.services.filter(
      service => service.id === addServiceData.serviceID,
    )[0];

    const idList = targetService.blocks.map(block => parseInt(block.id));
    const nextID = Math.max(...idList) + 1;

    let newBlock = {
      id: isNaN(parseInt(nextID)) ? 0 : nextID,
      x: 0,
      y: 0,
      name: addServiceData.node.name,
      title: addServiceData.node.title,
      values: {
        variables: [...addServiceData.node.variables],
      },
    };

    commit('addServiceBlock', {
      serviceID: addServiceData.serviceID,
      block: newBlock,
    });
  },
  updateService({ commit }, newSceneData) {
    commit('updateServiceBlocks', {
      serviceID: newSceneData.serviceID,
      blocks: newSceneData.newScene.blocks,
    });
    commit('updateServiceLinks', {
      serviceID: newSceneData.serviceID,
      links: newSceneData.newScene.links,
    });
    commit('updateServiceContainer', {
      serviceID: newSceneData.serviceID,
      container: newSceneData.newScene.container,
    });
  },
  deleteServiceBlock({ commit }, deleteData) {
    commit('deleteServiceBlock', deleteData);
  },
  deleteServiceLink({ commit }, deleteData) {
    commit('deleteServiceLink', deleteData);
  },
  setServiceNodeActive({ commit }, activeNodeData) {
    commit('setActiveNode', activeNodeData);
  },
};

const modules = {
  projectMetadata,
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules,
};
