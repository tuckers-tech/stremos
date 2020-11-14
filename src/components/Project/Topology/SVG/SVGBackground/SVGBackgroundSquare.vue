<template>
  <g>
    <template v-for="x in minorGridLineCount">
      <rect
        v-for="y in minorGridLineCount"
        :key="`${x}-${y}`"
        class="minorGridLine"
        :x="minorGridLineSpacing * (x - 1) + globalX"
        :y="minorGridLineSpacing * (y - 1) + globalY"
        :width="minorGridLineSpacing"
        :height="minorGridLineSpacing"
      />
    </template>
    <rect
      class="majorGridLine"
      :width="majorGridLineSpacing"
      :height="majorGridLineSpacing"
      :x="globalX"
      :y="globalY"
    />
  </g>
</template>

<script>
export default {
  name: 'SVGBackgroundSquare',
  props: {
    majorGridLineSpacing: Number,
    minorGridLineSpacing: Number,
    globalX: Number,
    globalY: Number
  },
  data() {
    return {
      minorGridLineCount: this.majorGridLineSpacing / this.minorGridLineSpacing
    };
  }
};
</script>

<style lang="scss" scoped>
.majorGridLine {
  stroke-width: 2;
  stroke: #dddddd;
  fill: transparent;
}
.minorGridLine {
  stroke-width: 1;
  stroke: #dddddd;
  fill: transparent;
}
</style>
