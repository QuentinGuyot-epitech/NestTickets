<template>
  <v-card
    class="mx-auto overflow-hidden mb-5"
    height="240"
    width="430"
    color="#1F7087"
    dark
  >
    <v-card-title class="headline"> Notifications </v-card-title>
    <v-card-subtitle class="pb-0"
      >New concerts according to your favorites</v-card-subtitle
    >
    <v-card-text>
      <div v-for="concert in concerts" :key="concert._id">
        <v-list-item two-line v-if="favorite_bands.includes(concert.band)">
          <v-list-item-content>
            <v-list-item-title>{{ concert.band.name }}</v-list-item-title>
            <v-list-item-subtitle
              >{{
                concert.start_datetime
                  ? new Date(concert.start_datetime).toLocaleDateString(
                      undefined,
                    ) + " "
                  : "Unknown"
              }}{{ concert.name }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  props: ["concerts"],
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapGetters(["getAllConcerts", "getUserById"]),
    bands: function () {
      return this.getAllConcerts.map(({ band }) => band);
    },
    user: function () {
      return this.getUserById(this.$store.state.Auth.user.userId);
    },
    favorite_bands: function () {
      if (this.user.favorite_bands) {
        return this.bands.filter((band) =>
          this.user.favorite_bands.includes(band._id)
        );
      } else return null;
    },
  },
};
</script>

<style scoped>
.v-card {
  display: flex !important;
  flex-direction: column;
  overflow: scroll;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>