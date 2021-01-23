<template>
  <div class="content-container">
    <div class="columns" v-if="this.metadata">
      <div class="column">
        <h2 class="title is-2 has-text-left	">
          <span class="title is-3 label">Project Name:</span>
          {{ this.metadata.name }}
        </h2>
        <h2 class="title is-2 has-text-left	">
          <span class="title is-3 label">ID:</span>
          {{ this.metadata.id }}
        </h2>
        <h2 class="title is-2 has-text-left	">
          <span class="title is-3 label">Type:</span>
          {{ this.metadata.type }}
        </h2>
        <h2 class="title is-2 has-text-left	">
          <span class="title is-3 label">Description:</span>
          {{ this.metadata.description }}
        </h2>
      </div>
      <div class="column">
        {{ this.metadata }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['metadata']),
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  padding: 15px 25px;
}
.label {
  color: #a5a5a5;
}
</style>
