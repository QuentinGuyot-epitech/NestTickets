<template>
  <v-card width="650" min-height="350" class="ml-4 mb-6 text-left card-outter">
    <v-img
      :src="concert.band.picture ? concert.band.picture : fallback"
      height="150px"
    ></v-img>
    <div class="d-flex justify-space-between align-center">
      <div>
        <v-card-title>
          {{ concert.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ concert.band.name }}
        </v-card-subtitle>
      </div>
      <div>
        <v-card-text class="py-1">
          <v-icon color="primary darken-2"> mdi-calendar-blank-outline </v-icon>
          {{
            concert.start_datetime
              ? new Date(concert.start_datetime).toLocaleDateString(
                  undefined,
                  options
                )
              : "Unknown"
          }}
        </v-card-text>
        <v-card-text class="py-1">
          <v-icon color="red darken-2"> mdi-map-marker </v-icon>
          {{ concert.location || "Unknown" }}
        </v-card-text>
        <v-card-text class="py-1">
          <v-icon color="red darken-2"> mdi-account-multiple </v-icon>
          <p>Total tickets : {{concert.qty_tickets}}</p>
        </v-card-text>
        <v-card-text class="py-1">
          <v-icon color="red darken-2"> mdi-account-multiple </v-icon>
          <p>Sold Tickets : {{count[concert._id]}}</p>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticsConcertCard",
  props: ["concert", "count"],
  data() {
    return {
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  computed: {
    ...mapGetters(["getAllUsers"]),
    // ticketsSold(){
    //     let tickets = this.getAllUsers.map(({ tickets }) => tickets)
    //     let ticketsPerUser = [];
    //     for (let i = 0; i < tickets.length; i++){
    //         // console.log(tickets[i])
    //         if (tickets[i].length > 0){
    //             ticketsPerUser.push(tickets[i])
    //         }
    //     }
    //     let allTickets=[]
    //     ticketsPerUser.forEach(e=>e.forEach(f=>allTickets.push(f._id)))
    //     // console.log(allTickets)
    //     var count = {}
    //     allTickets.forEach(function(i) { count[i] = (count[i]||0) + 1;})
    //     console.log(count)
    //     return true
    // }
  },
  
};
</script>

<style>
</style>