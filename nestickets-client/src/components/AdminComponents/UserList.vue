<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="getAllUsers"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Admin</v-toolbar-title>
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
              Add User
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
                      v-model="editedItem.firstname"
                      label="Fistname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Lastname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <!-- <v-text-field
                      v-model="editedItem.is_admin"
                      label="Admin"
                    ></v-text-field> -->
                    <v-checkbox
                      v-model="editedItem.is_admin"
                      :label="`Admin: ${editedItem.is_admin}`"
                    ></v-checkbox>
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
    name: "UserList",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Firstname",
        align: "start",
        sortable: true,
        value: "firstname",
      },
      { text: "Lastname", value: "lastname" },
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "Admin", value: "is_admin" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    password: "",
    search: "",
    editedItem: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      is_admin: false,
    },
    defaultItem: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      is_admin: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    ...mapGetters(["getAllUsers", "authenticated", "user"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.setAllUsers();
  },

  methods: {
    ...mapActions(["setAllUsers", "deleteUser", "addUser", "updateUser"]),

    editItem(item) {
      this.editedIndex = this.getAllUsers.indexOf(item);
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
          this.deleteUser(item._id);
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
        if (this.password == "" || this.password == null) {
          let newUser = {
            _id: this.editedItem._id,
            firstname:
              this.editedItem.firstname.charAt(0).toUpperCase() +
              this.editedItem.firstname.substring(1).toLowerCase(),
            lastname:
              this.editedItem.lastname.charAt(0).toUpperCase() +
              this.editedItem.lastname.substring(1).toLowerCase(),
            username:
              this.editedItem.username.charAt(0).toUpperCase() +
              this.editedItem.username.substring(1).toLowerCase(),
            email: this.editedItem.email.toLowerCase(),
            is_admin: this.editedItem.is_admin,
          };
          this.updateUser(newUser)
            .then(() => {
              this.$swal({
                title: "User Updated",
                text: newUser.username + " has been updated successfully",
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
          let newUser = {
            _id: this.editedItem._id,
            firstname:
              this.editedItem.firstname.charAt(0).toUpperCase() +
              this.editedItem.firstname.substring(1).toLowerCase(),
            lastname:
              this.editedItem.lastname.charAt(0).toUpperCase() +
              this.editedItem.lastname.substring(1).toLowerCase(),
            username:
              this.editedItem.username.charAt(0).toUpperCase() +
              this.editedItem.username.substring(1).toLowerCase(),
            email: this.editedItem.email.toLowerCase(),
            password: this.password,
            is_admin: this.editedItem.is_admin,
          };
          this.updateUser(newUser)
            .then(() => {
              this.$swal({
                title: "User Updated",
                text: newUser.username + " has been updated successfully",
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
            this.password = ""
        }
      } else {
        //ADD USER
        let newUser = {
          firstname:
            this.editedItem.firstname.charAt(0).toUpperCase() +
            this.editedItem.firstname.substring(1).toLowerCase(),
          lastname:
            this.editedItem.lastname.charAt(0).toUpperCase() +
            this.editedItem.lastname.substring(1).toLowerCase(),
          username:
            this.editedItem.username.charAt(0).toUpperCase() +
            this.editedItem.username.substring(1).toLowerCase(),
          email: this.editedItem.email.toLowerCase(),
          password: this.password,
          is_admin: this.editedItem.is_admin,
        };
        this.addUser(newUser)
          .then(() => {
            this.$swal({
              title: "User Added",
              text: newUser.username + " has been added successfully",
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
        this.password = "";
      }
      this.close();
    },
  },
};
</script>