<template>
  <div class="user-data-form">
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label has-text-left">First Name</label>
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="First Name"
              :value="userFirstName"
              @input="updateFirstName($event)"
            />
            <span class="icon is-small is-left">
              <i class="fal fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label has-text-left">Last Name</label>
          <p class="control is-expanded has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Last Name"
              :value="userLastName"
              @input="updateFirstName($event)"
            />
            <span class="icon is-small is-left">
              <i class="fal fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label has-text-left">Email</label>
      <p class="control is-expanded has-icons-left">
        <input
          class="input"
          type="email"
          placeholder="Email"
          :value="userEmail"
          @input="updateFirstName($event)"
        />
        <span class="icon is-small is-left">
          <i class="fal fa-envelope"></i>
        </span>
      </p>
    </div>

    <button v-if="true" class="button is-success" @click="handleUpdateClick">
      Update
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserDataUpdateForm',
  data() {
    return {};
  },
  methods: {
    updateFirstName(event) {
      console.log(event);
    },
    handleUpdateClick() {
      // this.$store.dispatch('synchronizeDataWithDatabase');
    }
  },
  computed: {
    ...mapGetters(['userFirstName', 'userLastName', 'userEmail'])
  }
};
</script>

<style lang="scss" scoped></style>
