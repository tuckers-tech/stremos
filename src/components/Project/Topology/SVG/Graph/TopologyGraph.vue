<template>
  <g v-if="topologyGraph">
    <TopologyNode v-for="node in getNodes" :key="node.id" :nodeData="node" />
  </g>
</template>

<script>
import TopologyNode from '@/components/Project/Topology/SVG/Node/TopologyNode';
import { mapGetters } from 'vuex';

export default {
  name: 'TopologyGraph',
  components: {
    TopologyNode
  },
  props: {
    translationData: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['topologyGraph']),
    getNodes() {
      return this.topologyGraph.nodes;
    },
    getConnections() {
      return this.topologyGraph.connections;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
