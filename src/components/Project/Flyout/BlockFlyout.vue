<template>
  <aside class="menu p-2 block-flyout">
    <aside class="menu">
      <div class="library" v-for="library in blockLibrary" :key="library.name">
        <p class="menu-label">
          {{ library.name }}
        </p>

        <FlyoutEntry
          v-for="block in library.blocks"
          :key="block.name"
          :block="block"
        />
      </div>
    </aside>
  </aside>
</template>

<script>
import FlyoutEntry from '@/components/Project/Flyout/FlyoutEntry';

export default {
  name: 'BlockFlyout',
  components: {
    FlyoutEntry,
  },
  props: {
    flyoutType: String,
  },
  computed: {
    blockLibrary() {
      return this.$store.getters.getAvailableBlocks('service');
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.block-flyout {
  background-color: #f0f0f0;
  width: 200px;
  min-width: 200px;
  height: 100%;
  position: fixed;
  left: 53px;
  top: 0;
  min-height: 100%;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.library:not(:last-child) {
  margin-bottom: 12px;
}
</style>
