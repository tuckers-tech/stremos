<template>
  <div
    class="flyout-entry-container noselect"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @dragstart="dragStart($event)"
    @drag="drag($event)"
    @dragend="dragEnd($event)"
    draggable
  >
    <div class="box block-box">
      <p class="is-size-5">
        {{ block.title }}
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

    dragStart(event) {
      event.dataTransfer.setData('newBlock', JSON.stringify(this.block));
    },
    drag() {},
    dragEnd() {},
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
  padding: 10px 5px;
  border-radius: 4px;
  box-shadow: none;

  &:hover {
    cursor: grab;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
