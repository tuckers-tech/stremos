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
              :value="currentUser.fname"
              @input="updateLocalUserData($event, 'fname')"
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
              :value="currentUser.lname"
              @input="updateLocalUserData($event, 'lname')"
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
          :value="currentUser.email"
          @input="updateLocalUserData($event, 'email')"
        />
        <span class="icon is-small is-left">
          <i class="fal fa-user"></i>
        </span>
      </p>
    </div>

    <button
      v-if="isDataOutOfSync"
      class="button is-success"
      @click="handleUpdateClick"
    >
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
    updateLocalUserData(e, target) {
      //   this.userDataChange[target] = e.target.value;

      let dataUpdate = {
        ...this.currentUser
      };

      dataUpdate[target] = e.target.value;

      this.$store.dispatch('updateLocalUserStore', dataUpdate);
    },
    handleUpdateClick() {
      this.$store.dispatch('synchronizeDataWithDatabase');
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isDataOutOfSync'])
  }
};
</script>

<style lang="scss" scoped></style>
