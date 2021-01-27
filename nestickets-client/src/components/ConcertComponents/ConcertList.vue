<template>
  <div class="container d-flex flex-wrap mt-8">
    <concert-filter
      :genres="genres"
      :bands="bands"
      v-on:filterChange="filterChange"
      v-on:filterDate="filterDate"
      :filter_genre="filter_genre"
      :filter_band="filter_band"
    />
    <v-btn color="error" class="ma-8" @click="resetFilters"
      >Reset Filters</v-btn
    >
    <concert-notifications :concerts="getAllConcerts"></concert-notifications>
    <div v-for="concert in filteredConcerts" :key="concert._id">
      <concert-card
        :concert="concert"
        v-if="
          (new Date(concert.start_datetime) >= Date.now() &&
            !is_date_filtered) ||
          (new Date(concert.start_datetime).getMonth() ===
            new Date(filter_date).getMonth() &&
            is_date_filtered)
        "
      >
      </concert-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConcertCard from "../ConcertComponents/ConcertCard.vue";
import ConcertFilter from "./ConcertFilter.vue";
import ConcertNotifications from "./ConcertNotifications.vue";

export default {
  name: "ConcertList",
  components: {
    ConcertCard,
    ConcertFilter,
    ConcertNotifications,
  },
  data() {
    return {
      filter_genre: "",
      filter_band: "",
      filter_date: "",
      is_date_filtered: false,
    };
  },
  props: [],
  computed: {
    ...mapGetters(["getAllConcerts"]),
    genres: function () {
      let genres = [
        ...new Set(this.getAllConcerts.map(({ band }) => band.genre)),
      ];
      return genres;
    },
    bands: function () {
      return this.getAllConcerts.map(({ band }) => band.name);
    },
    filteredConcerts: function () {
      return this.getAllConcerts.filter((concert) => {
        return (
          concert.band.genre.match(this.filter_genre) ||
          concert.band.name.match(this.filter_band)
        );
      });
    },
  },
  methods: {
    ...mapActions(["fetchAllConcerts"]),
    filterChange(value) {
      this.filter_genre = value;
      this.filter_band = value;
    },
    filterDate(date) {
      this.is_date_filtered = true;
      this.filter_date = date;
    },
    resetFilters() {
      this.filter_genre = "";
      this.filter_band = "";
      this.is_date_filtered = false;
    },
  },
  created() {
    this.fetchAllConcerts();
  },
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}
@media (min-width: 1264px) {
  .container {
    max-width: 1385px;
  }
}
</style>
