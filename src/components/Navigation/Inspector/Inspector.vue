<template>
  <div class="menu p-2 inspector">
    <aside class="menu">
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-small" type="search" placeholder="Search" />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>

      <div v-if="activeNode">
        <InspectorForm :activeNode="activeNode" />
      </div>
      <div v-else class="no-node-container">
        Select A Node
      </div>
    </aside>
  </div>
</template>

<script>
import InspectorForm from '@/components/Navigation/Inspector/InspectorForm';

export default {
  name: 'Inspector',
  components: {
    InspectorForm,
  },
  computed: {
    activeNode() {
      return this.$store.getters.getActiveNode;
    },
  },
};
</script>

<style lang="scss" scoped>
.inspector {
  background-color: #f0f0f0;
  width: 200px;
  min-width: 200px;
  height: calc(100% - 50px);
  position: fixed;
  right: 0;
  top: 50px;
  min-height: 100%;
  z-index: 10;
  overflow-y: auto;
  padding-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.no-node-container {
  padding: 25px;
}
</style>
