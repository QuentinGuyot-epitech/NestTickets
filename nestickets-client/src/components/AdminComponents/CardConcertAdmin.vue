<template>
  <v-card
    class="mx-auto"
    max-width="400"
    max-heigth="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="@/assets/concert.jpg"
    >
      <!-- <v-card-title>Manage Concerts</v-card-title> -->
    </v-img>

    <v-card-subtitle class="pb-0">
      Manage Concerts
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <!-- <div>Whitehaven Beach</div> -->

      <div class="text">You are at the correct place to manage Concerts</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="red"
        text
      >
        <router-link to="/adminconcerts">Let's Go</router-link>
      </v-btn>

      
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
      name: "CardConcertAdmin",
  }
</script>

<style scoped>

.title{
  color: black;
}
.pb-0{
    color: black;
    font-size: 2em;
}
.text{
    margin-top: 20px;
}
a {  
  text-decoration: none;
  }
.v-card {
  margin: 20px;
}
</style>