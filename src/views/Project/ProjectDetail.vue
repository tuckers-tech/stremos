<template>
  <div class="project-detail">
    <Layout :showBuilderTools="false" :showProjectTools="true">
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/Layout';

export default {
  components: {
    Layout
  }
};
</script>

<style lang="scss" scoped>
.project-detail {
  height: 100%;
}
</style>
