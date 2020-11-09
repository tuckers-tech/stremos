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
    ProjectList
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
