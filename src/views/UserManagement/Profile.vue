<template>
  <div class="profile">
    <Layout :showBuilderTools="false" :showProjectTools="false">
      <div class="columns">
        <div class="column is-one-fifth">
          <b-image
            :src="require('@/assets/img/user.png')"
            alt="A random image"
            ratio="1by1"
            :rounded="true"
          ></b-image>
          <button class="button is-info change-profile-btn">
            Change Profile Picture
          </button>
        </div>
        <div class="column">
          <UserDataUpdateForm />
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout/Layout.vue';
import UserDataUpdateForm from '@/components/Profile/UserDataUpdateForm';

export default {
  name: 'Home',
  components: {
    Layout,
    UserDataUpdateForm
  },
  data() {
    return {
      userData: {
        fname: '',
        lname: '',
        email: ''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.profile {
  height: 100%;
}

.change-profile-btn {
  margin-top: 10px;
}
</style>
