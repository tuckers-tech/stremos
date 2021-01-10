<template>
  <div class="no-project-list">
    <h3 class="is-size-4">
      Opportunity awaits!
    </h3>
    <br />
    <h3 class="is-size-5">
      Click on the button above to add a project.
    </h3>
    <br />
    <h3 class="is-size-5">
      Once you have one it will show up here.
    </h3>
  </div>
</template>

<script>
export default {
  name: 'NoProjectList',
};
</script>

<style lang="scss" scoped>
.no-project-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  border-radius: 15px;
  background-color: #eeeeee;
  border: 2px dashed #a8aab1;
  color: #787879;
}
</style>
