<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="blue darken-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.id">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUsername"
                        label="Username"
                        required
                        autocomplete="username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                        autocomplete="current-password"
                      ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn x-large block color="error" @click="close">
                        Close
                      </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                      >
                        Login
                      </v-btn>
                    </v-col>

                    <!-- <span
                      >Forgot your password ? Reset it
                      <router-link to="/resetpassword">here</router-link></span
                    > -->
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="firstname"
                        :rules="[rules.required]"
                        label="First Name"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="lastname"
                        :rules="[rules.required]"
                        label="Last Name"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        autocomplete="username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="username"
                        :rules="usernameRules"
                        label="Username"
                        required
                        autocomplete="username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                        autocomplete="new-password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="password_confirmation"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show2 = !show2"
                        autocomplete="new-password"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn x-large block color="error" @click="close">
                        Close
                      </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="validateregister"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.password_confirmation || "Password must match";
    },
  },
  methods: {
    ...mapActions(["signIn", "register"]),
    close() {
      this.$router.push("/");
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.signIn({
          username: this.loginUsername.charAt(0).toUpperCase() + this.loginUsername.substring(1).toLowerCase(),
          password: this.loginPassword,
        })
          .then(() => {
            this.$router.push("/");
            this.$swal({
              title: "User Sign in",
              text: "Welcome back " + this.loginUsername.charAt(0).toUpperCase() + this.loginUsername.substring(1).toLowerCase(),
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            this.$swal({
              title: "Login Error!",
              text: error + ":Wrong email or bad password",
              icon: "error",
              confirmButtonText: "Retry",
            });
          });
      }
    },
    validateregister() {
      if (this.$refs.registerForm.validate()) {
        this.register({
          firstname: (this.firstname.charAt(0).toUpperCase() + this.firstname.substring(1).toLowerCase()), 
          lastname: (this.lastname.charAt(0).toUpperCase() + this.lastname.substring(1).toLowerCase()),
          email: this.email.toLowerCase(),
          username: (this.username.charAt(0).toUpperCase() + this.username.substring(1).toLowerCase()),
          password: this.password,
          is_admin: false,
        })
          .then((response) => {
            this.$swal({
              title: response,
              text: "Welcome on board" + " " + this.username.charAt(0).toUpperCase() + this.username.substring(1).toLowerCase(),
              icon: "success",
              confirmButtonText: "Ok",
            });
            this.signIn({ username: this.username.charAt(0).toUpperCase() + this.username.substring(1).toLowerCase(), password: this.password });
            this.$router.push("/");
          })
          .catch((error) => {
            this.$swal({
              title: "Register Error!",
              // text: "Username/Email already used",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "Retry",
            });
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    error: null,
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    loginPassword: "",
    loginUsername: "",
    loginUsernameRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    usernameRules: [
      (v) => !!v || "Required"
    ],

    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 6) || "Min 6 characters",
    },
  }),
};
</script>

<style>
</style>