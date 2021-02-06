<template>
  <div class="header-row">
    <h2 class="is-size-4">Projects</h2>
    <div class="spacer"></div>
    <button class="button is-success" @click="openNewProjectModal">
      <i class="fal fa-plus"></i
      ><span class="add-button-text">Add Project</span>
    </button>
  </div>
</template>

<script>
import NewProjectForm from '@/components/Home/NewProjectForm';

export default {
  name: 'NewProjectRow',
  components: {},
  methods: {
    openNewProjectModal() {
      this.$store.dispatch('setModalStatus', true);
      let modal = this.$buefy.modal.open({
        parent: this,
        component: NewProjectForm,
        hasModalCard: true,
        customClass: 'top-modal',
        trapFocus: true,
        width: 500,
      });

      modal.$on('close', function() {
        this.$store.dispatch('setModalStatus', false);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.spacer {
  flex-grow: 1;
}

.add-button-text {
  margin-left: 5px;
}
</style>
