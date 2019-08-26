<template>
  <div>
    <b-container>
      <b-row class="text-center">
        <b-col class="d-flex align-items-center" style="font-size: 25px">musicxyz</b-col>
        <b-col cols="8">
          <img
            src="https://i.pinimg.com/originals/2c/fb/88/2cfb88b064e2919bfa44d5eedadca6bd.jpg"
            alt="logo"
            style="height:150px"
          />
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    <b-container class="d-flex justify-content-center">
      <b-navbar variant="faded" type="light" style="border-bottom: 0.5px solid rgba(0,0,0,0.4); align-items: center">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="nav-items">
            <b-nav-item href="#">
              <router-link to="/" style="color: #414a4c">Home</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/albums" style="color: #414a4c">Album</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link to="/Cart" style="color: #414a4c">Cart</router-link>
            </b-nav-item>
            <b-nav-item
              v-if="!isLogin"
              href="#"
              style="color: black"
              @click.prevent="clickLogin"
            >Login</b-nav-item>
            <b-dropdown v-else size="sm" text="profile" class="m-2" variant="none" style="color: #414a4c; padding-top:0px">
              <b-dropdown-item href="#" style="font-size:14px" @click.prevent="clickDashboardUser">{{isUser.username}}</b-dropdown-item>
              <b-dropdown-item href="#" style="font-size:14px" @click.prevent="clickLogout">Logout</b-dropdown-item>
              <b-dropdown-item href="#" style="font-size:14px" disabled>get cupon for discount here!</b-dropdown-item>
            </b-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapState(['isUser']),
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    clickLogout() {
      this.$emit("logout");
    },
    clickLogin() {
      this.$router.push("/login");
      this.$store.state.isLoginForm = true;
    },
    clickDashboardUser() {
      this.$router.push('/dashboard-user')
    }
  }
};
</script>

<style>
img {
  width: 200px;
  height: 200px;
}
* {
  font-family: "Oswald", sans-serif;
  color: black;
}
</style>