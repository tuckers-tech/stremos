<template>
  <div class="home">
    <Layout
      :showBuilderTools="false"
      :showProjectTools="false"
      :hasPadding="true"
    >
      <ProjectList />
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout/Layout';
import ProjectList from '@/components/Home/ProjectList';

export default {
  name: 'Home',
  components: {
    Layout,
    ProjectList,
  },
  created() {
    window.ipc.watch('project-metadata::update', eventData => {
      this.$store.dispatch('setProjectMetadata', eventData);
    });
    this.$store.dispatch('updateProjectMetadata');
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
