<template>
  <div>
    <div class="container d-flex justify-content-center" style="margin-top: 200px">
      <div style="margin-right: 20px;">
        <h2 style="text-align: center; padding-top: 80px; padding-bottom: 0px;">MUSICXYZ</h2>
        <img
          id="logo-pic"
          src="https://images.vexels.com/media/users/3/144117/isolated/preview/b37cdf9a9b5ebc1554ffe1a7825939fc-music-doodle-earphones-by-vexels.png"
          alt="logo"
          style="width:200px;height:200px"
        />
      </div>
      <div class="card w-35">
        <div class="card-body">
          <h5 class="card-title" style="text-align: center">Login</h5>
          <form @submit.prevent="submitLogin">
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autofocus
                v-model="loginForm.email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone
                else.
              </small>
            </div>
            <div class="form-group" style="margin-bottom: 0px">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                autofocus
                v-model="loginForm.password"
              />
            </div>
            <div style="padding-bottom: 10px">
              <small>
                not a member?
                <a href="#" @click.prevent="goToRegister">Register</a>
              </small>
            </div>
            <button style="margin-left: 93px" type="submit" class="btn btn-primary">Submit</button>

            <div class="d-flex justify-content-center" style="margin-top:10px">
              <div id="google-signin-button"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    submitLogin() {
      this.$store.dispatch("login", this.loginForm);
      this.loginForm = {}
    }
  }
};
</script>

<style>
</style>