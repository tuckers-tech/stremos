<template>
  <g
    ref="node"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @click="handleClick"
  >
    <rect
      width="150"
      height="100"
      :x="nodeData.location.x"
      :y="nodeData.location.y"
      :class="{ 'topology-node': true }"
      rx="10"
    ></rect>
    <circle
      :cx="nodeData.location.x + 15"
      :cy="nodeData.location.y + 15"
      r="25"
      :class="{ 'topology-icon': true }"
    />
  </g>
</template>

<script>
import * as SVGHelpers from '@/components/Helpers/SVG/svgHelpers';

export default {
  name: 'TopologyNode',
  props: {
    nodeData: Object,
  },
  data() {
    return {
      isDragging: false,
    };
  },
  methods: {
    handleClick(event) {
      console.log(event);
    },
    handleMouseDown(event) {
      if (event.button === 0) {
        this.isDragging = true;
      }
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        const newCords = SVGHelpers.convertScreenToSVGCoords(
          this.svgElement,
          event.clientX,
          event.clientY,
        );

        console.log(newCords);

        // console.log(this.nodeData.id);

        // console.log(this.$refs.node.getBoundingClientRect());
      }
    },
    handleMouseUp(event) {
      if (event.button === 0) {
        this.isDragging = false;
      }
    },
  },
  computed: {
    svgElement() {
      return this.$parent.$parent.$parent.$refs.svgEl;
    },
  },
};
</script>

<style lang="scss" scoped>
.topology-node {
  fill: #dadada;
  stroke-width: 2;
  stroke: rgb(0, 0, 0);
  cursor: all-scroll;
}
.topology-icon {
  fill: #ffffff;
  stroke-width: 2;
  stroke: rgb(0, 0, 0);
  cursor: all-scroll;
}
</style>
