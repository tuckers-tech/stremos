<template>
  <VueBlocksContainer
    ref="container"
    @contextmenu.native="showContextMenu"
    :blocksContent="blocks"
    :scene.sync="scene"
    class="container"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import VueBlocksContainer from '@/components/Graph/components/VueBlocksContainer';

export default {
  name: 'TopologyContainer',
  components: {
    VueBlocksContainer
  },
  data() {
    return {
      blocks: [
        {
          name: 'test',
          title: 'Test block',
          family: 'Test',
          description: 'Description text',
          fields: [
            {
              name: 'in1',
              type: 'event',
              attr: 'input'
            },
            {
              name: 'out1',
              type: 'event',
              attr: 'output'
            },
            {
              name: 'out2',
              type: 'event',
              attr: 'output'
            }
          ]
        }
      ],
      scene: {
        blocks: [
          {
            id: 1,
            x: 0,
            y: 0,
            name: 'test',
            title: 'Test block',
            values: {
              property: [
                {
                  name: 'message',
                  type: 'string'
                }
              ]
            }
          },
          {
            id: 2,
            x: 0,
            y: 100,
            name: 'test',
            title: 'Test block 2',
            values: {
              property: [
                {
                  name: 'message',
                  type: 'string'
                }
              ]
            }
          }
        ],
        links: [],
        container: {
          centerX: 0,
          centerY: 0,
          scale: 1
        }
      }
    };
  },
  computed: {
    ...mapGetters(['isCtrlDown', 'isSpaceDown', 'isPrimaryMouseDown'])
  },
  methods: {
    showContextMenu(event) {
      event.preventDefault();
      console.log('showcontextmenu');
    }
  },
  mounted() {},
  watch: {
    blocks(newValue) {
      console.log('blocks', newValue);
    },
    scene(newValue) {
      console.log('scene', newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
