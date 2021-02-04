<template>
  <div class="topology-page-container">
    <TopNav />
    <div class="topology-body">
      <BlockFlyout flyoutType="'service'" />
      <TopologyContainer />
      <Inspector />
    </div>
  </div>
</template>

<script>
import BlockFlyout from '@/components/Project/Flyout/BlockFlyout';
import TopologyContainer from '@/components/Project/Topology/TopologyContainer';
import Inspector from '@/components/Navigation/Inspector/Inspector';
import TopNav from '@/components/Project/Topology/TopNav';

export default {
  components: {
    TopologyContainer,
    Inspector,
    BlockFlyout,
    TopNav,
  },
};
</script>

<style lang="scss" scoped>
.topology-body {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  // background-color: blue;
  height: calc(100% - 50px);
  margin-top: 50px;
  z-index: 500;
}
</style>
