<template>
  <div class="menu-item">
    <router-link
      :to="{ name: navigateTo }"
      tag="div"
      class="box menu-item-link"
      v-if="itemData.isLink"
    >
      <article class="media">
        <div class="media-left">
          <div class="icon is-large">
            <i :class="['fal', `fa-${itemData.icon}`, 'fa-2x']"></i>
          </div>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ itemData.label }}</strong>
              <br />
              {{ itemData.description }}
            </p>
          </div>
        </div>
      </article>
    </router-link>

    <div class="box menu-item-draggable no-select" v-if="itemData.isDraggable">
      <article class="media">
        <div class="media-left">
          <div class="icon is-large">
            <i :class="['fal', `fa-${itemData.icon}`, 'fa-2x']"></i>
          </div>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ itemData.label }}</strong>
              <br />
              {{ itemData.description }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <div
      class="box menu-item-action no-select"
      v-if="!itemData.isDraggable && !itemData.isLink"
    >
      <article class="media" @click="sendAction(itemData.actionName)">
        <div class="media-left">
          <div class="icon is-large">
            <i :class="['fal', `fa-${itemData.icon}`, 'fa-2x']"></i>
          </div>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ itemData.label }}</strong>
              <br />
              {{ itemData.description }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    itemData: Object,
  },
  computed: {
    navigateTo() {
      let splitAction = this.itemData.actionName.split('::');

      return splitAction[1];
    },
  },
  methods: {
    sendAction(actionName) {
      this.$store.dispatch(actionName.split('::')[1]);
    },
  },
  created() {
    console.log(this.itemData);
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  margin-bottom: 10px;
}

.menu-item-link {
  border: 2px solid transparent;

  &:hover {
    border-color: #209cee;
    cursor: pointer;
  }
}

.menu-item-action {
  border: 2px solid transparent;

  &:hover {
    border-color: #209cee;
    cursor: pointer;
  }
}

.menu-item-draggable {
  border: 2px solid transparent;

  &:hover {
    border-color: #209cee;
    cursor: move;
  }
}
</style>
