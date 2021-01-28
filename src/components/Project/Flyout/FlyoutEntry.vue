<template>
  <div
    class="flyout-entry-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="box block-box">
      <p class="is-size-5">
        {{ block.name }}
      </p>
    </div>
    <span class="icon has-text-info info-icon" v-if="showInfo">
      <i class="fas fa-info-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FlyoutEntry',
  data() {
    return {
      showInfo: false,
    };
  },
  props: {
    block: Object,
  },
  methods: {
    handleMouseEnter() {
      this.showInfo = true;
    },
    handleMouseLeave() {
      this.showInfo = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.flyout-entry-container {
  position: relative;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
}

.info-icon {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.block-box {
  padding: 5px;

  &:hover {
    cursor: grab;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
