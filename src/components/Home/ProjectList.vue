<template>
  <div>
    <NewProjectRow />
    <div v-if="hasNoProjects">
      <NoProjectList />
    </div>
    <div v-if="!hasNoProjects">
      Content
    </div>
  </div>
</template>

<script>
import NoProjectList from '@/components/Home/NoProjectList';
import NewProjectRow from '@/components/Home/NewProjectRow';

export default {
  name: 'ProjectList',
  components: {
    NoProjectList,
    NewProjectRow
  },
  computed: {
    hasNoProjects() {
      return this.$store.getters.projectList.length === 0 ? true : false;
    }
  },
  created() {
    this.$store.dispatch('updateProjects');
  }
};
</script>

<style lang="scss" scoped></style>
