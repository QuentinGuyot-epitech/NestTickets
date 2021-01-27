<template>
  <div class="profile container">
    <v-btn color="error" class="mr-4 mb-8" @click="cancel">
      Back to concerts
    </v-btn>
    <div class="d-flex justify-space-between">
      <edit-profile class="mb-5"></edit-profile>
      <favorite-bands class="mb-5"></favorite-bands>
    </div>
    <h1>Bookings</h1>
    <booked-concerts-table></booked-concerts-table>
  </div>
</template>

<script>
import BookedConcertsTable from "../components/ProfileComponents/BookedConcertsTable.vue";
import EditProfile from "../components/ProfileComponents/EditProfile.vue";
import FavoriteBands from "../components/ProfileComponents/FavoriteBands.vue";

export default {
  components: { EditProfile, FavoriteBands, BookedConcertsTable },
  methods: {
    cancel() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.profile {
  margin-top: 80px;
}
</style>