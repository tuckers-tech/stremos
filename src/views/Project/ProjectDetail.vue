<template>
  <div class="project-detail">
    <Layout
      :showBuilderTools="false"
      :showProjectTools="true"
      :hasPadding="false"
    >
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/Layout';

export default {
  components: {
    Layout,
  },
  computed: {
    targetProject() {
      let matchingProjects = this.$store.getters.projectMetadataByID(
        this.$route.params.projectID,
      );

      if (matchingProjects.length > 0) {
        return matchingProjects[0];
      }

      return null;
    },
  },
  created() {
    this.$store.dispatch('loadProject', this.targetProject);
  },
};
</script>

<style lang="scss" scoped>
.project-detail {
  height: 100%;
}
</style>
