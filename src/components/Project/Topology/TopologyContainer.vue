<template>
  <div class="container">
    <VueBlocksContainer
      ref="container"
      @contextmenu.native="showContextMenu"
      :blocksContent="blocks"
      :scene.sync="scene"
      class="container"
    />
    <button @click="createServer">Create Server</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueBlocksContainer from '@/components/Graph/components/VueBlocksContainer';
import * as axios from 'axios';

export default {
  name: 'TopologyContainer',
  components: {
    VueBlocksContainer
  },
  data() {
    return {
      blocks: [
        {
          name: 'entry',
          title: 'Server Entry Point',
          family: 'Server',
          description: 'Entry Point for Server',
          fields: [
            {
              name: 'Request',
              type: 'request',
              attr: 'output'
            }
          ]
        },
        {
          name: 'router',
          title: 'Router',
          family: 'Server',
          description: 'Routes requests to the right blocks',
          fields: [
            {
              name: 'Request',
              type: 'request',
              attr: 'input'
            },
            {
              name: 'Request',
              type: 'request',
              attr: 'output'
            }
          ]
        },
        {
          name: 'routeHandler',
          title: 'Route Handler',
          family: 'Server',
          description: 'Handles Requests To Route',
          fields: [
            {
              name: 'Request',
              type: 'request',
              attr: 'input'
            }
          ]
        },
        {
          name: 'getById',
          title: 'GET Element By ID',
          family: 'Server',
          description: 'Gets a piece of data by ID',
          fields: [
            {
              name: 'Request',
              type: 'request',
              attr: 'input'
            },
            {
              name: 'ID',
              type: 'string',
              attr: 'output'
            },
            {
              name: 'ERROR',
              type: 'error',
              attr: 'output'
            }
          ]
        },
        {
          name: 'getDataElement',
          title: 'Get Data Element',
          family: 'Server',
          description: 'Gets a piece of data by ID',
          fields: [
            {
              name: 'ID || Query',
              type: 'any',
              attr: 'input'
            },
            {
              name: 'Element[]',
              type: 'elementArr',
              attr: 'output'
            }
          ]
        },
        {
          name: 'sendResponse',
          title: 'Get Data Element',
          family: 'Server',
          description: 'Gets a piece of data by ID',
          fields: [
            {
              name: 'Element[]',
              type: 'any',
              attr: 'input'
            }
          ]
        },
        {
          name: 'postHandler',
          title: 'POST Handler',
          family: 'Server',
          description: 'Handles POST Request',
          fields: [
            {
              name: 'Request',
              type: 'request',
              attr: 'input'
            },
            {
              name: 'Data',
              type: 'any',
              attr: 'output'
            }
          ]
        }
      ],
      scene: {
        blocks: [
          {
            id: 1,
            x: -550,
            y: 0,
            name: 'entry',
            title: 'Server Entry',
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
            x: -250,
            y: 0,
            name: 'router',
            title: 'Router',
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
            id: 3,
            x: 0,
            y: -150,
            name: 'getById',
            title: 'GET',
            values: {
              property: [
                {
                  name: 'id',
                  type: 'string'
                }
              ]
            }
          },
          {
            id: 4,
            x: 250,
            y: -150,
            name: 'getDataElement',
            title: 'Get Data',
            values: {
              property: [
                {
                  name: 'id',
                  type: 'string'
                }
              ]
            }
          },
          {
            id: 5,
            x: 500,
            y: -150,
            name: 'sendResponse',
            title: 'Send Response',
            values: {
              property: [
                {
                  name: 'id',
                  type: 'string'
                }
              ]
            }
          },
          {
            id: 6,
            x: 500,
            y: -75,
            name: 'sendResponse',
            title: 'Send Response',
            values: {
              property: [
                {
                  name: 'id',
                  type: 'string'
                }
              ]
            }
          },
          {
            id: 7,
            x: 0,
            y: 0,
            name: 'postHandler',
            title: 'POST',
            values: {
              property: [
                {
                  name: 'id',
                  type: 'string'
                }
              ]
            }
          }
        ],
        links: [
          {
            id: 1,
            originID: 1,
            originSlot: 0,
            targetID: 2,
            targetSlot: 0
          },
          {
            id: 2,
            originID: 2,
            originSlot: 0,
            targetID: 3,
            targetSlot: 0
          },
          {
            id: 3,
            originID: 3,
            originSlot: 0,
            targetID: 4,
            targetSlot: 0
          },
          {
            id: 4,
            originID: 4,
            originSlot: 0,
            targetID: 5,
            targetSlot: 0
          },
          {
            id: 5,
            originID: 3,
            originSlot: 1,
            targetID: 6,
            targetSlot: 0
          },
          {
            id: 6,
            originID: 2,
            originSlot: 0,
            targetID: 7,
            targetSlot: 0
          }
        ],
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
    createServer() {
      axios
        .post('http://localhost:3000/generate-server', this.scene)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

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
