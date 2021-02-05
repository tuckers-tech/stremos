<template>
  <div
    class="topology-container"
    @drop="onDrop($event)"
    @dragover="onDragover($event)"
    dropzone
  >
    <VueBlocksContainer
      ref="container"
      @contextmenu.native="showContextMenu"
      @blockSelect="blockSelected"
      @blockDeselect="blockDeselect"
      @blockDblClick="blockDblClick"
      @removeElements="removeElements"
      :blocksContent="availableBlocks"
      :scene.sync="scene"
      class="container"
    />
  </div>
</template>

<script>
import VueBlocksContainer from '@/components/Graph/components/VueBlocksContainer';

export default {
  name: 'GraphContainer',
  components: {
    VueBlocksContainer,
  },
  props: {
    type: String,
  },
  data() {
    return {};
  },
  computed: {
    availableBlocks() {
      return this.$store.getters.getAvailableBlocks(this.type);
    },
    scene: {
      get() {
        if (this.type === 'topology') {
          return this.$store.getters.getTopologyScene;
        }
        return this.$store.getters.getScene;
      },
      set(newScene) {
        this.$store.dispatch('updateTopology', newScene);
      },
    },
  },
  methods: {
    removeElements(removalItems) {
      console.log(removalItems);

      if (this.type === 'topology') {
        removalItems.blocks.forEach(blockID => {
          this.$store.dispatch('topologyDeleteBlock', blockID);
        });

        removalItems.links.forEach(linkID => {
          this.$store.dispatch('topologyRemoveLink', linkID);
        });
      }
    },
    blockDblClick(event) {
      console.log(event);
      if (event.name === 'service') {
        this.$router.push({
          name: 'serviceEdit',
          params: {
            projectID: this.$route.params.projectID,
            serviceID: event.id,
          },
        });
      }
    },
    showContextMenu(event) {
      event.preventDefault();
      console.log('showcontextmenu');
    },
    onDrop(event) {
      event.preventDefault();
      if (this.type === 'topology') {
        this.$store.dispatch(
          'addTopologyBlock',
          JSON.parse(event.dataTransfer.getData('newBlock')),
        );
      }
    },
    onDragover(event) {
      event.preventDefault();
    },
    blockSelected(event) {
      this.$store.dispatch('setActiveNode', event.id);
    },
    blockDeselect() {
      this.$store.dispatch('unsetActiveNode');
    },
  },
  watch: {
    availableBlocks() {
      // console.log('blocks', newValue);
    },
    scene() {
      // this.$store.dispatch('updateScene', newScene);
    },
  },
  created() {
    console.log(this.$route.path);
  },
};
</script>

<style lang="scss" scoped>
.topology-container {
  display: flex;
  margin: 0;
  width: 100%;
  height: calc(100% - 50px);
  position: fixed;
  top: 50px;
  left: 110px;
}
</style>
