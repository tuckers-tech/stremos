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
  },
  watch: {
    availableBlocks(newValue) {
      console.log('blocks', newValue);
    },
    scene(newValue) {
      console.log('scene', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.topology-container {
  display: flex;
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 110px;
}
</style>
