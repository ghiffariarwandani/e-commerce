<template>
  <div>
    <div class="container d-flex justify-content-center" style="margin-top: 100px">
      <div class="card form" style="width: 23rem; ">
        <div class="card-body">
          <h5 class="card-title" style="text-align: center">Register</h5>
          <form @submit.prevent="submitRegister">
            <div class="form-group" >
              <label style="text-alight:left">Username</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Username"
                required
                autofocus
                v-model="newUser.username"
              />
            </div>
            <div class="form-group">
              <label style="text-align:left">Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autofocus
                v-model="newUser.email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone
                else.
              </small>
            </div>
            <div class="form-group" style="margin: 0px">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                autofocus
                minlength="6"
                v-model="newUser.password"
              />
            </div>
            <div class="form-group" style="margin: 0px">
              <label>Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Phone Number"
                required
                autofocus
                minlength="10"
                v-model="newUser.phone"
              />
            </div>
            <div class="form-group" style="margin: 0px">
              <label>Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Adress"
                required
                autofocus
                minlength="6"
                v-model="newUser.address"
              />
            </div>
            <small>
              already have account?
              <a href="#" @click.prevent="goToLogin">Login</a>
            </small>
            <button
              style="margin-left: 125px; margin-top: 20px"
              type="submit"
              class="btn btn-primary"
            >Submit</button>
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
      newUser: {
        username: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      }
    };
  },
  methods: {
    submitRegister() {
      this.$store.dispatch('register', this.newUser)
      this.newUser = {}
    },
    goToLogin() {
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>