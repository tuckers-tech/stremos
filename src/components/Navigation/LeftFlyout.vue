<template>
  <aside class="menu p-2">
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="text" placeholder="Search" />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="scroll-parent" v-if="menuType === 'menu'">
      <p class="menu-label">Navigation</p>
      <ul class="menu-list">
        <MenuItem
          v-for="menuItem in menuData.hamburger"
          :key="menuItem.label"
          :itemData="menuItem"
        />
      </ul>
    </div>

    <div v-if="menuType === 'profile'">
      <p class="menu-label">Profile</p>
      <ul class="menu-list">
        <MenuItem
          v-for="menuItem in menuData.profile"
          :key="menuItem.label"
          :itemData="menuItem"
        />
      </ul>
    </div>

    <div v-if="menuType === 'layout'">
      <div>
        <div class="menu-label-container">
          <p class="menu-label">Custom Layout Elements</p>
          <button class="button is-small is-success">
            <i class="fal fa-plus"></i>
          </button>
        </div>
        <p class="menu-label">Default Layout Elements</p>
        <ul class="menu-list">
          <MenuItem
            v-for="menuItem in menuData.layout"
            :key="menuItem.label"
            :itemData="menuItem"
          />
        </ul>
      </div>
    </div>

    <div v-if="menuType === 'components'">
      <div>
        <div class="menu-label-container">
          <p class="menu-label">Custom Components</p>
          <button class="button is-small is-success">
            <i class="fal fa-plus"></i>
          </button>
        </div>
        <p class="menu-label">Default Components</p>
        <ul class="menu-list">
          <MenuItem
            v-for="menuItem in menuData.components"
            :key="menuItem.label"
            :itemData="menuItem"
          />
        </ul>
      </div>
    </div>

    <div v-if="menuType === 'settings'">
      <div>
        <p class="menu-label">Settings</p>
        <ul class="menu-list">
          <MenuItem
            v-for="menuItem in menuData.settings"
            :key="menuItem.label"
            :itemData="menuItem"
          />
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import MenuItem from '@/components/Navigation/Menu/MenuItem';

export default {
  name: 'LeftFlyout',
  components: {
    MenuItem,
  },
  props: {
    menuType: String,
  },
  data() {
    return {
      menuData: {
        hamburger: [
          {
            label: 'Home',
            description: 'Go to application home.',
            icon: 'house',
            iconType: 'icon-fa',
            actionName: 'navigate::home',
            actionTrigger: ['click'],
            isLink: true,
            isDraggable: false,
            to: '/',
          },
        ],
        layout: [
          {
            label: 'Row',
            description: 'Creates a row of content',
            icon: 'arrows-h',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
          {
            label: 'Column',
            description: 'Layout content with columns.',
            icon: 'columns',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
          {
            label: 'Column Group',
            description: 'Group columns together.',
            icon: 'columns',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
          {
            label: 'Spacer',
            description: 'Push Elements Apart.',
            icon: 'arrows',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
        ],
        components: [
          {
            label: 'Text',
            description: 'Add some text to your page!',
            icon: 'text',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
          {
            label: 'Image',
            description: 'Add An Image to your page!',
            icon: 'image',
            iconType: 'icon-fa',
            actionName: 'drag::columns',
            actionTrigger: ['drag'],
            isLink: false,
            isDraggable: true,
          },
        ],
        settings: [],
        profile: [
          {
            label: 'Profile',
            description: 'Change Data About Yourself!',
            icon: 'user-crown',
            iconType: 'icon-fa',
            actionName: 'navigate::profile',
            actionTrigger: ['click'],
            isLink: true,
            isDraggable: false,
            to: 'profile',
          },
          {
            label: 'Preferences',
            description: 'Change user preferences.',
            icon: 'tasks',
            iconType: 'icon-fa',
            actionName: 'navigate::preferences',
            actionTrigger: ['click'],
            isLink: true,
            isDraggable: false,
            to: 'preferences',
          },
          {
            label: 'Logout',
            description: 'Log out of the app!',
            icon: 'sign-out',
            iconType: 'icon-fa',
            actionName: 'auth::logout',
            actionTrigger: ['click'],
            isLink: false,
            isDraggable: false,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  min-height: 100vh;
  padding: 15px;
  box-sizing: border-box;
  padding-bottom: 10px;
}

.menu-label-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}

.menu-label {
  text-align: left;
}

.input {
  margin-bottom: 10px;
}

.menu-list {
  margin-top: 10px;
}
</style>
