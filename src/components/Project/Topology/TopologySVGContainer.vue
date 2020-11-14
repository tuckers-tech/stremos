<template>
  <SvgPanZoom
    style="width: 100%; height: 100%;"
    :zoomEnabled="true"
    :fit="false"
    :dblClickZoomEnabled="false"
    :preventMouseEventsDefault="true"
    :center="true"
    :zoomScaleSensitivity="0.2"
    :minZoom="0.5"
    :maxZoom="10"
    :beforeZoom="beforeZoom"
    :onZoom="onZoom"
    :beforePan="beforePan"
    :onPan="onPan"
    @svgpanzoom="registerSvgPanZoom"
  >
    <svg
      :class="{
        topologySVG: true,
        'can-pan': isSpaceDown,
        'is-panning': isPanning
      }"
      style="width: 100%; height: 100%;"
    >
      <SVGBackground
        :majorGridLineSpacing="100"
        :minorGridLineSpacing="20"
        :backgroundGridSize="25"
      />
      <g>
        <TopologyNode />
      </g>
    </svg>
  </SvgPanZoom>
</template>

<script>
import SVGBackground from '@/components/Project/Topology/SVG/SVGBackground/SVGBackground';
import TopologyNode from '@/components/Project/Topology/SVG/Node/TopologyNode';
import SvgPanZoom from 'vue-svg-pan-zoom';
import { mapGetters } from 'vuex';

export default {
  name: 'TopologySVGContainer',
  components: {
    TopologyNode,
    SvgPanZoom,
    SVGBackground
  },
  data() {
    return {
      panZoomReference: null
    };
  },
  computed: {
    ...mapGetters(['isCtrlDown', 'isSpaceDown', 'isPrimaryMouseDown']),
    isPanning() {
      if (this.isSpaceDown && this.isPrimaryMouseDown) {
        return true;
      }
      return false;
    }
  },
  methods: {
    beforeZoom(/* oldZoom, newZoom */) {
      return true;
    },
    onZoom(newZoomScale) {
      console.log('onZoom', newZoomScale);
    },
    beforePan() {
      if (this.isSpaceDown && this.isPrimaryMouseDown) {
        return true;
      }
      return false;
    },
    onPan() {},
    onUpdatedCTM() {},
    registerSvgPanZoom(svgPanZoomRef) {
      this.panZoomReference = svgPanZoomRef;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.topologySVG {
  cursor: crosshair;
}

.can-pan {
  cursor: grab;
}

.is-panning {
  cursor: grabbing;
}
</style>
