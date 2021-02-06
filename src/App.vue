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
    },
  },
  created() {
    this.$store.dispatch('setUserProfile', this.$keycloak);

    window.ipc.watch('project-metadata::update', eventData => {
      this.$store.dispatch('setProjectMetadata', eventData);
    });
    this.$store.dispatch('updateProjectMetadata');
    this.$store.dispatch('updatePlugins');
  },
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

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.top-modal {
  z-index: 100000;
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}
</style>
