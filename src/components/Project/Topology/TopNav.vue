<template>
  <div class="breadcrumb-container">
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="{}">
            <span class="icon is-small">
              <i class="fas fa-chart-network" aria-hidden="true"></i>
            </span>
            <span>Topology</span>
          </router-link>
        </li>
        <li class="is-active">
          <a href="#">
            <span class="icon is-small">
              <i class="fas fa-cube" aria-hidden="true"></i>
            </span>
            <span>Service</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="button-group">
      <button class="button  is-small is-success">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>Run</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  height: 50px;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
}

.breadcrumb {
  padding: 12px 0;
}

.button-group {
  padding-top: 10px;

  & > .button:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
