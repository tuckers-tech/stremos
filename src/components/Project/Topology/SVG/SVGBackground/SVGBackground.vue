<template>
  <g>
    <template v-for="x in backgroundGridSize">
      <SVGBackgroundSquare
        v-for="y in backgroundGridSize"
        :key="`${x}-${y}`"
        :majorGridLineSpacing="majorGridLineSpacing"
        :minorGridLineSpacing="minorGridLineSpacing"
        :globalX="x * majorGridLineSpacing + startCoords"
        :globalY="y * majorGridLineSpacing + startCoords"
      />
    </template>
  </g>
</template>

<script>
import SVGBackgroundSquare from '@/components/Project/Topology/SVG/SVGBackground/SVGBackgroundSquare';

export default {
  name: 'SVGBackground',
  components: {
    SVGBackgroundSquare
  },
  props: {
    majorGridLineSpacing: Number,
    minorGridLineSpacing: Number,
    backgroundGridSize: Number
  },
  computed: {
    startCoords() {
      return (this.backgroundGridSize / 2) * this.majorGridLineSpacing * -1;
    }
  }
};
</script>

<style lang="scss" scoped></style>
