<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="getAllConcerts"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.start_datetime="{ item }">
          <span>{{ formatDate(item.start_datetime)}}</span>
      </template>
        <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Concert Admin</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Concert
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <!-- <v-text-field
                        v-model="editedItem.band.name"
                        label="Band Name"
                      ></v-text-field> -->
                      <v-autocomplete
                        v-model="editedItem.band"
                        :items = "getAllBands"
                        item-value="_id"
                        item-text="name"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.location"
                        label="Location"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <input type="datetime-local" label="Start Date" v-model="editedItem.start_datetime" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.duration"
                        label="Duration in minutes"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.qty_tickets"
                        label="Tickets Quantity"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConcertList",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Band Name", value: "band.name" },
      { text: "Description", value: "description" },
      { text: "Location", value: "location" },
      { text: "Start Date", value: "start_datetime" },
      { text: "Duration", value: "duration" },
      { text: "Price", value: "price" },
      { text: "Tickets Quantity", value: "qty_tickets" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    search: "",
    editedItem: {
      name: "",
      band:{name:""},
      description: "",
      location: "",
      start_datetime: "",
      duration: "",
      price: "",
      qty_tickets: "",
    },
    defaultItem: {
      name: "",
      band:{name:""},
      description: "",
      location: "",
      start_datetime: "",
      duration: "",
      price: "",
      qty_tickets: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Concert" : "Edit Concert";
    },
    ...mapGetters(["getAllConcerts", "getAllBands", "authenticated", "user"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.fetchAllConcerts();
    this.setAllBands();
  },

  methods: {
    ...mapActions([
      "fetchAllConcerts",
      "setAllBands",
      "deleteConcert",
      "createConcert",
      "updateConcert",
    ]),

    editItem(item) {
      // console.log(this.editedItem)
      this.editedIndex = this.getAllConcerts.indexOf(item);
      item.start_datetime = this.formatDate(item.start_datetime)
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteConcert(item._id);
          this.$swal("Deleted!", "Concert has been deleted.", "success");
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    formatDate(date) {
      date = date.slice(0, 16)
      // console.log(date)
      return date
    },

    save() {
      if (this.editedIndex > -1) {
        // EDIT CONCERT
        let newConcert = {
          _id: this.editedItem._id,
          name: this.editedItem.name,
          band: this.editedItem.band,
          location: this.editedItem.location,
          description: this.editedItem.description,
          start_datetime: this.editedItem.start_datetime,
          duration: Number(this.editedItem.duration),
          price: this.editedItem.price,
          qty_tickets: this.editedItem.qty_tickets,
        };
        this.updateConcert(newConcert)
          .then(() => {
            this.$swal({
              title: "Concert Updated",
              text: newConcert.name + " has been updated successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            this.$swal({
              title: "Error!",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "Retry",
            });
          });
      } else {
        //ADD USER
        let newConcert = {
          _id: this.editedItem._id,
          name: this.editedItem.name,
          band: this.editedItem.band,
          location: this.editedItem.location,
          description: this.editedItem.description,
          start_datetime: this.editedItem.start_datetime,
          duration: Number(this.editedItem.duration),
          price: this.editedItem.price,
          qty_tickets: this.editedItem.qty_tickets,
        };
        this.createConcert(newConcert)
          .then(() => {
            this.$swal({
              title: "Concert Added",
              text: newConcert.name + " has been added successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            this.$swal({
              title: "Error!",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "Retry",
            });
          });
      }
      this.close();
    },
  },
};
</script>