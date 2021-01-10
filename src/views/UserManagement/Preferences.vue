<template>
  <div class="preferences">
    <Layout
      :showBuilderTools="false"
      :showProjectTools="false"
      :hasPadding="true"
    >
      content
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'Home',
  components: {
    Layout,
  },
};
</script>

<style lang="scss" scoped>
.preferences {
  height: 100%;
}
</style>
