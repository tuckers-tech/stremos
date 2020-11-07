<template>
  <router-link
    :to="{ name: 'projectDetail', params: { projectID: projectData.id } }"
    tag="div"
    class="box project-preview-card"
  >
    <article class="media">
      <div class="media-content">
        <div class="content">
          <h3>{{ projectData.projectName }}</h3>
          <h5>{{ projectData.projectType }}</h5>
          {{ projectData.id }}
        </div>
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'ProjectPreviewCard',
  props: {
    projectData: Object
  }
};
</script>

<style lang="scss" scoped>
.project-preview-card {
  width: 250px;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border-color: #209cee;
  }
}
</style>
