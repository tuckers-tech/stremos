<template>
  <div class="topology-container">
    <TopologySVGContainer />
  </div>
</template>

<script>
import TopologySVGContainer from '@/components/Project/Topology/TopologySVGContainer';
export default {
  components: {
    TopologySVGContainer
  }
};
</script>

<style lang="scss" scoped>
.topology-container {
  height: 100%;
}
</style>
