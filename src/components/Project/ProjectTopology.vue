<template>
  <div class="topology-page-container">
    <BlockFlyout flyoutType="'service'" />
    <TopologyContainer />
    <Inspector />
  </div>
</template>

<script>
import BlockFlyout from '@/components/Project/Flyout/BlockFlyout';
import TopologyContainer from '@/components/Project/Topology/TopologyContainer';
import Inspector from '@/components/Navigation/Inspector/Inspector';
export default {
  components: {
    TopologyContainer,
    Inspector,
    BlockFlyout,
  },
};
</script>

<style lang="scss" scoped>
.topology-page-container {
  height: 100%;
  width: 100%;
  position: relative;
  // background-color: blue;
}

.inspector-container {
  width: 60px;
  min-width: 60px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  min-height: 100%;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
