<template>
  <div>
    <NewProjectRow />
    <div v-if="hasNoProjects">
      <NoProjectList />
    </div>
    <div class="project-list-container" v-if="!hasNoProjects">
      <template v-for="project in $store.getters.projectList">
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
    hasNoProjects() {
      console.log(this.$store.getters.projectList);
      return this.$store.getters.projectList.length === 0 ? true : false;
    },
  },
  created() {
    // this.$store.dispatch('updateProjects');
  },
};
</script>

<style lang="scss" scoped>
.project-list-container {
  display: flex;
  flex-direction: row;
}
</style>
