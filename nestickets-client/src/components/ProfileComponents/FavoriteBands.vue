<template>
  <v-card class="px-8" width="450">
    <h1>Favorite Bands</h1>
    <v-simple-table dark class="pb-2 mb-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="band in favorite_bands" :key="band._id">
            <td class="text-left">{{ band.name }}</td>
            <td>
              <v-btn color="error" @click="removeBand(band._id)">
                Remove
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="d-flex">
      <v-autocomplete
        v-model="values"
        :items="bands_not_in_favorites"
        item-value="_id"
        item-text="name"
        outlined
        clearable
        dense
        small-chips
        label="Add a band"
        multiple
      ></v-autocomplete>
      <v-btn color="success" @click="addBand" class="ml-1"> Add </v-btn>
    </div>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      values: null,
      concerts: [],
    };
  },
  props: [],
  computed: {
    ...mapGetters(["getAllConcerts", "getUserById"]),
    bands: function () {
      let unique_bands = this.getAllConcerts.map(({ band }) => band).filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
      return unique_bands;
    },
    user: function () {
      return this.getUserById(this.$store.state.Auth.user.userId);
    },
    favorite_bands: function () {
      if (this.user.favorite_bands) {
        return this.bands.filter((band) =>
          this.user.favorite_bands.includes(band._id)
        );
      }
      else return null
    },
    bands_not_in_favorites: function () {
      if (this.user.favorite_bands) {
        return this.bands.filter(
          (band) => !this.user.favorite_bands.includes(band._id)
        );
      } else return this.bands;
    },
  },
  methods: {
    ...mapActions(["fetchAllConcerts"]),
    addBand() {
      this.$store.dispatch("updateUser", {
        favorite_bands: this.values,
        _id: this.$store.state.Auth.user.userId,
      });
      this.values = null;
    },
    removeBand(id) {
      this.$store.dispatch("updateUser", {
        favorite_bands: [id],
        _id: this.$store.state.Auth.user.userId,
      });
      this.values = null;
    },
  },
  created() {
    this.fetchAllConcerts();
  },
};
</script>
<style scoped>
</style>
