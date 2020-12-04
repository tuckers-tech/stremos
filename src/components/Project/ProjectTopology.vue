<template>
  <div class="topology-container">
    <TopologyContainer />
  </div>
</template>

<script>
import TopologyContainer from '@/components/Project/Topology/TopologyContainer';
export default {
  components: {
    TopologyContainer
  }
};
</script>

<style lang="scss" scoped>
.topology-container {
  height: 100%;
}
</style>
