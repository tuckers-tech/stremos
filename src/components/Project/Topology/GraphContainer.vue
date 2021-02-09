<template>
  <div
    ref="topContainer"
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
import { getMousePosition } from '@/components/Graph/helpers/mouse';

export default {
  name: 'GraphContainer',
  components: {
    VueBlocksContainer,
  },
  props: {
    type: String,
    targetID: Number,
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
        } else if (this.type === 'service') {
          return this.$store.getters.getServiceScene(this.targetID);
        }
        return false;
      },
      set(newScene) {
        if (this.type === 'topology') {
          this.$store.dispatch('updateTopology', newScene);
        } else if (this.type === 'service') {
          this.$store.dispatch('updateService', {
            serviceID: this.targetID,
            newScene,
          });
        }
      },
    },
  },
  methods: {
    removeElements(removalItems) {
      if (this.type === 'topology') {
        removalItems.blocks.forEach(blockID => {
          this.$store.dispatch('topologyDeleteBlock', blockID);
        });

        removalItems.links.forEach(linkID => {
          this.$store.dispatch('topologyRemoveLink', linkID);
        });
      } else if (this.type === 'service') {
        removalItems.blocks.forEach(blockID => {
          this.$store.dispatch('deleteServiceBlock', {
            serviceID: this.targetID,
            blockID,
          });
        });

        removalItems.links.forEach(linkID => {
          this.$store.dispatch('deleteServiceLink', {
            serviceID: this.targetID,
            linkID,
          });
        });
      }
    },
    blockDblClick(event) {
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
    },
    onDrop(event) {
      const dropCords = getMousePosition(event.target.parentElement, event);

      const {
        height,
        width,
      } = event.target.parentElement.getBoundingClientRect();

      event.preventDefault();
      if (this.type === 'topology') {
        this.$store.dispatch('addTopologyBlock', {
          ...JSON.parse(event.dataTransfer.getData('newBlock')),
          x: dropCords.x - 0.5 * width,
          y: dropCords.y - 0.5 * height,
        });
      } else if (this.type === 'service') {
        this.$store.dispatch('addServiceBlock', {
          ...JSON.parse(event.dataTransfer.getData('newBlock')),
          x: dropCords.x - 0.5 * width,
          y: dropCords.y - 0.5 * height,
        });
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
