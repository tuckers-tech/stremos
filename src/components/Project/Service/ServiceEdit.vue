<template>
  <div class="topology-page-container">
    <TopNav :links="topNavLinks" />
    <div class="topology-body">
      <BlockFlyout :key="'service'" :flyoutType="'service'" />
      <GraphContainer :type="'service'" />
      <Inspector />
    </div>
  </div>
</template>

<script>
import BlockFlyout from '@/components/Project/Flyout/BlockFlyout';
import GraphContainer from '@/components/Project/Topology/GraphContainer';
import Inspector from '@/components/Navigation/Inspector/Inspector';
import TopNav from '@/components/Project/Topology/TopNav';

export default {
  components: {
    GraphContainer,
    Inspector,
    BlockFlyout,
    TopNav,
  },
  data() {
    return {
      topNavLinks: [
        {
          label: 'Topology',
          icon: 'chart-network',
          isActive: false,
          to: {
            name: 'projectTopology',
            params: { projectID: this.$route.params.projectID },
          },
        },
        {
          label: 'Service',
          icon: 'cube',
          isActive: true,
          to: {
            name: 'serviceEdit',
            params: {
              projectID: this.$route.params.projectID,
              serviceID: this.$route.params.serviceID,
            },
          },
        },
      ],
    };
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
