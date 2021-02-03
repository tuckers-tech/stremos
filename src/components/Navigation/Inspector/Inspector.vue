<template>
  <aside class="menu p-2 inspector">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input is-small" type="search" placeholder="Search" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>

    <p class="menu-label has-text-left">
      Metadata
    </p>
    {{ this.$store.getters.getActiveNode }}
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
  width: 200px;
  min-width: 200px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  min-height: 100%;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
