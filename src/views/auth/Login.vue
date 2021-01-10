<template>
  <div class="page-container">
    <section class="login-container">
      <div class="box login-form-container">
        <h1 class="welcome-heading is-size-3">Welcome!</h1>
        <form v-if="showLogin" @submit.prevent="login()">
          <h3 class="welcome-sub-heading is-size-5">Please Log In Below</h3>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="loginForm.email"
                class="input"
                type="email"
                placeholder="Email"
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="loginForm.password"
                class="input"
                type="password"
                placeholder="Password"
                id="password"
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-lock"></i>
              </span>
            </div>
          </div>

          <button class="button is-success" type="submit">Log In</button>
        </form>

        <form v-if="!showLogin" @submit.prevent="register()">
          <h3 class="welcome-sub-heading is-size-5">Please Register Below</h3>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="registerForm.fname"
                class="input"
                type="text"
                placeholder="First Name"
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="registerForm.lname"
                class="input"
                type="text"
                placeholder="Last Name"
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="registerForm.email"
                class="input"
                type="email"
                placeholder="Email"
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="registerForm.password"
                class="input"
                type="password"
                placeholder="Password"
                password-reveal
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input
                v-model.trim="registerForm.passwordConfirm"
                class="input"
                type="password"
                placeholder="Confirm Password"
                password-reveal
                required
              />
              <span class="icon is-small is-left">
                <i class="fal fa-lock"></i>
              </span>
            </div>
          </div>

          <button class="button is-success" type="submit">Register</button>
        </form>

        <div class="buttons">
          <button class="button is-primary is-light is-small">
            Forgot Password
          </button>
          <button
            class="button is-primary is-light is-small"
            @click="toggleAccount"
          >
            {{ getToggleButtonText }}
          </button>
        </div>
      </div>
    </section>
    <b-image
      class="background-img"
      :src="require('@/assets/img/login-background.svg')"
      alt="A random image"
      :rounded="false"
    ></b-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  computed: {
    getToggleButtonText() {
      return this.showLogin ? 'Need An Account?' : 'Already Have An Account?';
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    register() {
      if (this.registerForm.password === this.registerForm.passwordConfirm) {
        this.$store.dispatch('register', {
          fname: this.registerForm.fname,
          lname: this.registerForm.lname,
          email: this.registerForm.email,
          password: this.registerForm.password,
        });
      } else {
        console.error('Passwords Do Not Match!');
      }
    },
    toggleAccount() {
      this.showLogin = !this.showLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome-heading {
  margin-bottom: 10px;
}

.welcome-sub-heading {
  margin-bottom: 10px;
}

.page-container {
  height: 100%;
}

.background-img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.login-container {
  z-index: 1000;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-container {
  width: 50%;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
