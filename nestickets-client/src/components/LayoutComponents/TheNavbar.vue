<template>
  <div class="mb-5">
    <v-app-bar app>
      <span class="hidden-sm-and-up"> </span>
      <v-toolbar-title class="primary--text">
        <router-link to="/" tag="span" style="cursor: pointer">
          <strong> Nestickets </strong>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-for="(item, i) in menuItemsLoggedIn" :key="i">
        <v-btn
          elevation="0"
          class="primary--text"
          v-if="authenticated && !user.is_admin"
          :key="item.title"
          :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
      <div v-for="(item, i) in menuItemsLoggedOut" :key="'A' + i">
        <v-btn
          elevation="0"
          class="primary--text"
          v-if="!authenticated"
          :key="item.title"
          :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
      <div v-for="(item, i) in menuItemsAdmin" :key="'B' + i">
        <v-btn
          elevation="0"
          class="primary--text"
          v-if="authenticated && user.is_admin"
          :key="item.title"
          :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
      <v-btn
        elevation="0"
        class="primary--text"
        v-if="authenticated"
        @click.prevent="signOutButton"
      >
        <v-icon left dark> mdi-lock-open-outline </v-icon>
        {{ "Log Out" }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheNavbar",
  data() {
    return {
      appTitle: "Nestickets",
      sidebar: false,
      menuItemsLoggedIn: [
        { title: "Concerts", path: "/", icon: "mdi-home" },
        {
          title: "Account",
          path: "/profile",
          icon: "mdi-account-circle-outline",
        },
      ],
      menuItemsLoggedOut: [
        { title: "Concerts", path: "/", icon: "mdi-home" },
        {
          title: "Sign In / Sign Up",
          path: "/signin",
          icon: "mdi-lock-open-outline",
        },
      ],
      menuItemsAdmin: [
        { title: "Concerts", path: "/", icon: "mdi-home" },
        { title: "Admin", path: "/admin", icon: "mdi-security" },
        {
          title: "Account",
          path: "/profile",
          icon: "mdi-account-circle-outline",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["authenticated", "user"]),
  },

  methods: {
    ...mapActions(["signOut"]),

    signOutButton() {
      this.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
</style>