<template>
  <div>
    <v-card class="mx-auto" width="150" max-heigth="200" color="#17678047" dark>
      <v-card-subtitle class="pb-0"> Total Users </v-card-subtitle>
      <v-card-text>
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