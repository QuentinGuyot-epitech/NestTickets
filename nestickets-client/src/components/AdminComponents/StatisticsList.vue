<template>
  <div class="container">
    <h1 class="text-center">Statistics</h1>
    <div class="d-flex flex-wrap justify-center align-center">
      <StatisticsConcert class="mr-3"></StatisticsConcert>
      <StatisticsAllTickets class="mr-3"></StatisticsAllTickets>
      <StatisticsUsers></StatisticsUsers>
    </div>
    <div class="d-flex flex-wrap mt-8">
      <StatisticsConcertCard
        v-for="concert in getAllConcerts"
        :key="concert._id"
        v-bind:concert="concert"
        :count="count"
      ></StatisticsConcertCard>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StatisticsConcertCard from "./StatisticsConcertCard.vue";
import StatisticsConcert from "./StatisticsConcert.vue";
import StatisticsUsers from "./StatisticsUsers.vue";
import StatisticsAllTickets from "./StatisticsAllTickets.vue";

export default {
  name: "StatisticsList",
  components: {
    StatisticsConcertCard,
    StatisticsConcert,
    StatisticsUsers,
    StatisticsAllTickets,
  },
  props: ["concert"],
  data() {
    return {
      count: {},
    };
  },
  computed: {
    ...mapGetters(["getAllConcerts", "getAllUsers"]),
  },
  methods: {
    ...mapActions(["fetchAllConcerts"]),
  },
  created() {
    this.fetchAllConcerts();
    let tickets = this.getAllUsers.map(({ tickets }) => tickets);
    let ticketsPerUser = [];
    for (let i = 0; i < tickets.length; i++) {
      // console.log(tickets[i])
      if (tickets[i].length > 0) {
        ticketsPerUser.push(tickets[i]);
      }
    }
    let allTickets = [];
    ticketsPerUser.forEach((e) => e.forEach((f) => allTickets.push(f._id)));
    // console.log(allTickets)
    var count = {};
    allTickets.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    this.count = count;
    // console.log(count["5fe1ec601b7e6fd07399f6c4"])
  },
};
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1385px;
  }
}
</style>