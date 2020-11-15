<template>
  <rect
    width="150"
    height="100"
    :x="nodeData.location.x"
    :y="nodeData.location.y"
    :class="{ 'topology-node': true }"
    rx="10"
  ></rect>
</template>

<script>
import * as SVGHelpers from '@/components/Helpers/SVG/svgHelpers';

export default {
  name: 'TopologyNode',
  props: {
    nodeData: Object
  },
  data() {
    return {};
  },
  computed: {
    svgElement() {
      return this.$parent.$parent.$parent.$refs.svgEl;
    }
  },
  mounted() {
    console.log(this.svgElement);
    console.log(SVGHelpers.convertScreenToSVGCoords(this.svgElement, 100, 100));
  }
};
</script>

<style lang="scss" scoped>
.topology-node {
  fill: #dadada;
  stroke-width: 2;
  stroke: rgb(0, 0, 0);
  cursor: all-scroll;
}
</style>
