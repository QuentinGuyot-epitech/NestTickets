<template>
  <v-app>
    <TheNavbar />
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import TheNavbar from "@/components/LayoutComponents/TheNavbar.vue";

export default {
  name: "App",

  components: {
    TheNavbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fdfdfd;
  background-color: #176780;
}
body {
  font-family: 'Avenir';
}
</style>
