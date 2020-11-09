<template>
  <div class="layout">
    <LeftNav
      :showBuilderTools="showBuilderTools"
      :showProjectTools="showProjectTools"
    />
    <div :class="{ 'main-content-container': true, 'has-padding': hasPadding }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/Navigation/LeftNav';

export default {
  name: 'Layout',
  components: {
    LeftNav
  },
  props: {
    showBuilderTools: Boolean,
    showProjectTools: Boolean,
    hasPadding: Boolean
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.main-content-container {
  flex-grow: 1;
  height: 100%;
}

.has-padding {
  padding: 20px;
}
</style>
