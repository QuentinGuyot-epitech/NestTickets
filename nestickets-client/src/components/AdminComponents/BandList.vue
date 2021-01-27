<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="getAllBands"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Bands Admin</v-toolbar-title>
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
              Add Band
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
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.genre"
                      label="Genre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.picture"
                      label="Picture"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
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
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "BandList",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Genre", value: "genre" },
      { text: "Picture", value: "picture" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    search: "",
    editedItem: {
      name: "",
      description: "",
      genre: "",
      picture: "",
    },
    defaultItem: {
      name: "",
      description: "",
      genre: "",
      picture: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Band" : "Edit Band";
    },
    ...mapGetters(["getAllBands", "authenticated", "user"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.setAllBands();
  },

  methods: {
    ...mapActions(["setAllBands", "deleteBand", "addBand", "updateBand"]),

    editItem(item) {
      this.editedIndex = this.getAllBands.indexOf(item);
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
          this.deleteBand(item._id);
          this.$swal("Deleted!", "User has been deleted.", "success");
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

    save() {
      if (this.editedIndex > -1) {
        //EDIT BAND
          let newBand = {
            _id: this.editedItem._id,
            name:
              this.editedItem.name.charAt(0).toUpperCase() +
              this.editedItem.name.substring(1).toLowerCase(),
            description:
              this.editedItem.description.charAt(0).toUpperCase() +
              this.editedItem.description.substring(1).toLowerCase(),
            genre:
              this.editedItem.genre.charAt(0).toUpperCase() +
              this.editedItem.genre.substring(1).toLowerCase(),
            picture: this.editedItem.picture,
          };
          this.updateBand(newBand)
            .then(() => {
              this.$swal({
                title: "Band Updated",
                text: newBand.name + " has been updated successfully",
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
        }else {
        //ADD BAND
        let newBand = {
          name:
              this.editedItem.name.charAt(0).toUpperCase() +
              this.editedItem.name.substring(1).toLowerCase(),
            description:
              this.editedItem.description.charAt(0).toUpperCase() +
              this.editedItem.description.substring(1).toLowerCase(),
            genre:
              this.editedItem.genre.charAt(0).toUpperCase() +
              this.editedItem.genre.substring(1).toLowerCase(),
            picture: this.editedItem.picture,
        };
        this.addBand(newBand)
          .then(() => {
            this.$swal({
              title: "Band Added",
              text: newBand.name + " has been added successfully",
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