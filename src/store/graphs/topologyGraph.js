// import * as fb from '../../config/firebase';

const state = {
  topologyGraph: {
    nodes: [
      {
        id: '40cc0253-bff6-4e25-a12e-4992a85dd347',
        name: 'User API',
        ports: {
          input: [],
          output: []
        },
        location: {
          x: 0,
          y: 0
        }
      }
    ],
    connections: [{}]
  }
};

const getters = {
  topologyGraph(state) {
    return state.topologyGraph;
  }
};

const mutations = {};

const actions = {};

export default {
  state,
  mutations,
  actions,
  getters
};
