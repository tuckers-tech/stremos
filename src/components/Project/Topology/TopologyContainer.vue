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
      :blocksContent="availableBlocks"
      :scene.sync="scene"
      class="container"
    />
  </div>
</template>

<script>
import VueBlocksContainer from '@/components/Graph/components/VueBlocksContainer';

export default {
  name: 'TopologyContainer',
  components: {
    VueBlocksContainer,
  },
  data() {
    return {};
  },
  computed: {
    availableBlocks() {
      return this.$store.getters.getAvailableBlocks('service');
    },
    scene: {
      get() {
        return this.$store.getters.getScene;
      },
      set(newScene) {
        this.$store.dispatch('updateScene', newScene);
      },
    },
  },
  methods: {
    showContextMenu(event) {
      event.preventDefault();
      console.log('showcontextmenu');
    },
    onDrop(event) {
      event.preventDefault();
      this.$store.dispatch(
        'addBlock',
        JSON.parse(event.dataTransfer.getData('newBlock')),
      );
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
      // console.log('scene', newValue);
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
