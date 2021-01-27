<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 12 : 4"
        width="650"
        min-height="445"
        class="ml-4 mb-6 text-left card-outter"
      >
        <v-img
          :src="concert.band.picture ? concert.band.picture : fallback"
          height="300px"
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
              <v-icon color="primary darken-2">
                mdi-calendar-blank-outline
              </v-icon>
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
          </div>
          <v-btn color="primary" class="mr-4 pl-2" @click="bookConcert(concert._id)">
            <v-icon> mdi-plus </v-icon>
            Book Now
          </v-btn>
        </div>
        <v-card-actions :class="!show ? 'card-actions' : ''">
          <v-btn @click="show = !show" color="green lighten-1" text
            >Show Description</v-btn
          >

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider class="my-0"></v-divider>

            <v-card-text>
              <strong>Description</strong>
              <br />
              {{ concert.description }}</v-card-text
            >
            <v-divider class="my-0"></v-divider>
            <v-card-text
              >5 tickets remaining</v-card-text
            >
          </div>
        </v-expand-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "ConcertCard",
  props: ["concert"],
  data() {
    return {
      show: false,
      fallback: "https://ichef.bbci.co.uk/news/976/cpsprodpb/3970/production/_108240741_beatles-abbeyroad-square-reuters-applecorps.jpg",
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    bookConcert(id) {
      let user = {
        "_id": this.$store.state.Auth.user.userId,
        "tickets": [id]
      }
      this.updateUser(user);
    }
  }
};
</script>

<style scoped>
.v-card__title {
  max-width: 250px;
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 1.2rem;
}
.card-outter {
  position: relative;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>