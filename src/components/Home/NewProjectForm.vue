<template>
  <form class="new-project-form" @action.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Project</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Project Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Project Name"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Project Type</label>
          <div class="control is-full-width">
            <div class="select is-full-width">
              <select class="is-full-width" required>
                <option value="null">Select A Project Type</option>
                <option value="web">Web</option>
                <option value="desktop" disabled>Desktop</option>
                <option value="embed" disabled>Embedded</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Close
        </button>
        <button class="button is-success">Add Project</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'NewProjectForm'
};
</script>

<style lang="scss" scoped>
.new-project-form {
  width: 450px;
}

.is-full-width {
  width: 100%;
}
</style>
