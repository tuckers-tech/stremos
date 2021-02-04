<template>
  <div class="leftnav-container">
    <div class="left-icon-container">
      <div
        :class="{
          icon: true,
          'is-large': true,
          active: leftbarType === 'menu',
        }"
        @click="toggleLeftFlyout('menu')"
      >
        <i class="fal fa-bars fa-lg"></i>
      </div>

      <div class="spacer" v-if="showBuilderTools"></div>

      <div class="icon-group" v-if="showBuilderTools">
        <div
          :class="{
            icon: true,
            'is-large': true,
            active: leftbarType === 'layout',
          }"
          @click="toggleLeftFlyout('layout')"
        >
          <i class="fal fa-columns fa-lg"></i>
        </div>
        <div
          :class="{
            icon: true,
            'is-large': true,
            active: leftbarType === 'components',
          }"
          @click="toggleLeftFlyout('components')"
        >
          <i class="fal fa-rectangle-wide fa-lg"></i>
        </div>

        <div
          :class="{
            icon: true,
            'is-large': true,
            active: leftbarType === 'settings',
          }"
          @click="toggleLeftFlyout('settings')"
        >
          <i class="fal fa-cog fa-lg"></i>
        </div>
      </div>

      <div class="spacer" v-if="showProjectTools"></div>

      <div class="icon-group" v-if="showProjectTools">
        <router-link
          :to="{
            name: 'projectDashboard',
            params: { projectID: $route.params.projectID },
          }"
          tag="div"
          class="icon is-large"
          :exact="true"
        >
          <i class="fal fa-home fa-lg"></i>
        </router-link>

        <router-link
          :to="{
            name: 'projectData',
            params: { projectID: $route.params.projectID },
          }"
          tag="div"
          class="icon is-large"
        >
          <i class="fal fa-database fa-lg"></i>
        </router-link>

        <router-link
          :to="{
            name: 'projectTopology',
            params: { projectID: $route.params.projectID },
          }"
          tag="div"
          class="icon is-large"
        >
          <i class="fal fa-chart-network fa-lg"></i>
        </router-link>

        <router-link
          :to="{
            name: 'projectBilling',
            params: { projectID: $route.params.projectID },
          }"
          tag="div"
          class="icon is-large"
        >
          <i class="fal fa-money-bill-alt fa-lg"></i>
        </router-link>

        <router-link
          :to="{
            name: 'projectSettings',
            params: { projectID: $route.params.projectID },
          }"
          tag="div"
          class="icon is-large"
        >
          <i class="fal fa-cog fa-lg"></i>
        </router-link>
      </div>

      <div class="spacer"></div>

      <div
        :class="{
          icon: true,
          'is-large': true,
          active: leftbarType === 'profile',
        }"
        @click="toggleLeftFlyout('profile')"
      >
        <i class="fal fa-user fa-lg"></i>
      </div>
    </div>
    <div class="leftbar-flyout" v-if="isLeftbarOpen">
      <LeftFlyout :menuType="leftbarType" />
    </div>
  </div>
</template>

<script>
import LeftFlyout from '@/components/Navigation/LeftFlyout';

export default {
  name: 'LeftNav',
  components: {
    LeftFlyout,
  },
  props: {
    showBuilderTools: Boolean,
    showProjectTools: Boolean,
  },
  data() {
    return {
      isLeftbarOpen: false,
      leftbarType: '',
    };
  },
  methods: {
    toggleLeftFlyout(type) {
      if (this.isLeftbarOpen) {
        if (this.leftbarType === type) {
          this.isLeftbarOpen = false;
          this.leftbarType = '';
          return;
        }
      }
      this.leftbarType = type;
      this.isLeftbarOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.leftnav-container {
  display: flex;
  z-index: 10000;
}

.left-icon-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px 0 5px 5px;
  background-color: #d4d4d4;
  z-index: 20;
  position: relative;
}

.shadowed {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.spacer {
  flex-grow: 1;
}

.icon-group {
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 2rem;
  }
}

.icon {
  padding-right: 5px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border: 2px solid transparent;

  &:hover {
    background-color: #f0f0f0;
    border-left-color: #209cee;
    border-top-color: #209cee;
    border-bottom-color: #209cee;
    cursor: pointer;
  }
}

.active {
  background-color: #f0f0f0;
}

.leftbar-flyout {
  background-color: #f0f0f0;
  width: 300px;
  min-width: 300px;
  // position: fixed;
  // top: 0;
  // left: 53px;
  height: 100%;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.router-link-active {
  background-color: #ffffff;
}
</style>
