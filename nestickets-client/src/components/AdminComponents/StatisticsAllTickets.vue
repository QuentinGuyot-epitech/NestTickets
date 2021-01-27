<template>
  <div>
    <v-card class="mx-auto" width="150" max-heigth="200" color="primary" dark>
      <v-card-subtitle class="pb-0"> Total Tickets Sold</v-card-subtitle>
      <v-card-text>
        <div>
          <p>{{ TotalTickets }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticsAllTickets",
  computed: {
    ...mapGetters(["getAllUsers"]),

    TotalTickets() {
      let tickets = this.getAllUsers.map(({ tickets }) => tickets)
        let ticketsnum = 0
        let ticketsTotal = 0
        for (let i = 0; i < tickets.length; i++){
            ticketsnum = tickets[i].length
            ticketsTotal = ticketsnum + ticketsTotal
        }
        return ticketsTotal
    },
  },
};
</script>

<style>
</style>