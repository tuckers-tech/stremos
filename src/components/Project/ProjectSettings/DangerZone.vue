<template>
  <div class="danger-zone-container">
    <h2 class="is-size-3 has-text-left">Danger Zone</h2>

    <div class="danger-zone-content-container">
      <div class="entry">
        <h4 class="is-size-4 has-text-left">
          Delete Project
        </h4>
        <button
          class="button is-danger"
          type="button"
          @click="confirmDeleteProject"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DangerZone',
  methods: {
    confirmDeleteProject() {
      this.$buefy.dialog.confirm({
        title: 'Delete Project',
        message:
          'Are you sure you want to <b>delete</b> this project? This action cannot be undone.',
        confirmText: 'Delete Project',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$buefy.toast.open('project deleted!'),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.danger-zone-container {
  width: 90%;
  margin-left: 5%;
}

.entry {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 2px solid #f14668;
  border-radius: 5px;
  background-color: #f7d1d8;
}
</style>
