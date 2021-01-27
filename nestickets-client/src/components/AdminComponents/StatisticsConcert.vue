<template>
  <div class="d-flex justify-space-between align-center">
    <v-card class="mx-auto" width="150" max-heigth="200" color="primary" dark>
      <v-card-subtitle class="pb-0"> Concerts planned </v-card-subtitle>
      <v-card-text>
        <p>{{ TotalConcerts }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticsConcert",
  computed: {
    ...mapGetters(["getAllConcerts"]),

    TotalConcerts() {
      return this.getAllConcerts.length;
    },
  },
};
</script>

<style>
</style>