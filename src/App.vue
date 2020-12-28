<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    handleMouseEvent(event) {
      this.$store.dispatch('handleMouseEvent', event);
    },
    handleKeyboardEvents(event) {
      this.$store.dispatch('handleKeyboardEvent', event);
    }
  },
  created() {},
  mounted() {
    window.addEventListener('keydown', event => {
      this.handleKeyboardEvents(event);
    });
    window.addEventListener('keyup', event => {
      this.handleKeyboardEvents(event);
    });
    window.addEventListener('mousedown', event => {
      this.handleMouseEvent(event);
    });
    window.addEventListener('mouseup', event => {
      this.handleMouseEvent(event);
    });
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
