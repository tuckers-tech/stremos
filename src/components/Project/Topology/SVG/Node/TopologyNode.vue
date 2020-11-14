<template>
  <rect
    width="150"
    height="100"
    :class="{ 'topology-node': true }"
    rx="10"
  ></rect>
</template>

<script>
export default {
  name: 'TopologyNode'
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
