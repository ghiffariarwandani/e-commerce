<template>
  <div id="app">
    <Navbar @logout="logout" v-if="!isLoginForm"></Navbar>
    <router-view></router-view>
    <Footer v-if="!isLoginForm"></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Swal from 'sweetalert2'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    isLoginForm() {
      return this.$store.getters.isLoginForm;
    }
  },
  methods: {
    logout() {
      console.log("masuk app");
      localStorage.clear();
      this.$store.commit('setIsLogin', false)
      this.$store.isUser = {};
      this.$store.isLoginForm = false
      Swal.fire({
        type: "success",
        title: "Logout Success",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 1800);
    }
  },
  created() {
    if (localStorage.token) {
      this.$store.dispatch("setUserData")
      this.$store.commit("setIsLogin", true);
      this.$store.commit("setIsLoginForm", false);
    } else {
      this.$store.commit("setIsLogin", false);
      this.$store.commit("setIsLoginForm", false);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
