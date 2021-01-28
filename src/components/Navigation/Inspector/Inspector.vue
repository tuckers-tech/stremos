<template>
  <aside class="inspector">
    Inspector
  </aside>
</template>

<script>
export default {
  name: 'Inspector',
};
</script>

<style lang="scss" scoped>
.inspector {
  background-color: #f0f0f0;
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
