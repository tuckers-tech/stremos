<template>
  <div class="topology-page-container">
    <!-- <div class="leftbar-flyout">
      <BlockFlyout flyoutType="'service'" />
    </div> -->
    <div class="topology-container">
      <TopologyContainer />
    </div>
  </div>
</template>

<script>
// import BlockFlyout from '@/components/Project/Flyout/BlockFlyout';
import TopologyContainer from '@/components/Project/Topology/TopologyContainer';
export default {
  components: {
    TopologyContainer,
    // BlockFlyout,
  },
};
</script>

<style lang="scss" scoped>
.topology-page-container {
  height: 100%;
}

.leftbar-flyout {
  background-color: #f0f0f0;
  width: 300px;
  min-width: 300px;
  // position: fixed;
  // top: 0;
  // left: 53px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.topology-container {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
