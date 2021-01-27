<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="booked_concerts"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.qr_code="{ item }">
        <v-btn color="success" @click="viewQR(item)">View</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          QR Code
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card-title>
        <v-card-text>Source: {{ qr_code }}</v-card-text>
        <v-img src="/images/qr_codes/frame.png" contain></v-img>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookedConcertsTable",
  data() {
    return {
      dialog: false,
      qr_code: null,
      headers: [
        {
          text: "Concert",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Band", value: "band.name" },
        { text: "Date", value: "start_datetime" },
        { text: "Location", value: "location" },
        { text: "QR_Code", value: "qr_code" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    booked_concerts: function () {
      return this.getUser.tickets;
    },
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    viewQR(item) {
      this.qr_code = item.qr_code;
      this.dialog = true;
    },
    ...mapActions(["setUser"]),
  },
  created() {
    this.setUser(this.$store.state.Auth.user.userId);
  },
};
</script>

<style>
</style>