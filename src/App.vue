<template lang='pug'>
v-app
  v-navigation-drawer(
    app,
    mobile-breakpoint="835",
    width="300px",
    color="#4d89a5"
  )
    Menu.h-100

  v-app-bar(app, :value="isVisible", color="#4d89a5")

  v-main
    router-view
</template>

<script>
import Login from "@/components/common/Login";
import Menu from "@/components/menu/Menu.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isVisible: false,
      showLogin: false,
    };
  },
  components: {
    Menu,
    Login,
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
    ...mapState("auth", ["user"]),
  },
  watch: {
    loggedIn(val) {
      if (val) {
        this.showLogin = false;
      } else {
        this.showLogin = true;
      }
    },
  },
  mounted() {
    const matchMedia = window.matchMedia("(min-width: 835px)");
    const visible = () => {
      if (matchMedia.matches) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    };
    visible();
    matchMedia.addListener(visible);
  },
};
</script>

<style lang="sass">
.v-application
  a
    text-decoration: none
.w-100
  width: 100%
.h-100
  height: 100%
.vh-100
  height: 100vh

.loginWrapper
  display: flex
  align-items: center
  height: 90vh
</style>
