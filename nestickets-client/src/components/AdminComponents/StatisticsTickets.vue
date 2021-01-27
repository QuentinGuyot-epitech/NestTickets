<template>
  <div>
    <v-card class="mx-auto" max-width="200" max-heigth="200">
      <v-card-subtitle class="pb-0"> Total Tickets </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>
          <p>{{ TotalUsers }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticsUsers",
  computed: {
    ...mapGetters(["getAllUsers"]),

    TotalUsers() {
      return this.getAllUsers.length;
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 20px;
}
</style>