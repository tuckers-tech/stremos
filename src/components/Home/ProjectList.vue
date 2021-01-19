<template>
  <div>
    <NewProjectRow />
    <div v-if="hasNoProjects">
      <NoProjectList />
    </div>
    <div class="project-list-container" v-if="!hasNoProjects">
      <template v-for="project in recentProjects">
        <ProjectPreviewCard :key="project.id" :projectData="project" />
      </template>
    </div>
  </div>
</template>

<script>
import NoProjectList from '@/components/Home/NoProjectList';
import NewProjectRow from '@/components/Home/NewProjectRow';
import ProjectPreviewCard from '@/components/Home/ProjectPreviewCard';

export default {
  name: 'ProjectList',
  components: {
    NoProjectList,
    NewProjectRow,
    ProjectPreviewCard,
  },
  computed: {
    recentProjects() {
      return this.$store.getters['allProjects'];
    },
    hasNoProjects() {
      let allProjects = this.$store.getters['allProjects'];

      if (!allProjects) {
        return null;
      } else {
        if (this.$store.getters['allProjects'].length === 0) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.project-list-container {
  display: flex;
  flex-direction: row;
}
</style>
