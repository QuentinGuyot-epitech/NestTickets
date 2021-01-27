<template>
  <div>
    <v-card
    class="px-8 pt-2 pb-8"
      >
      <h1>Edit Profile</h1>
      <v-card class="profile pa-4 mx-auto"
        ><v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="New E-mail"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validateEmail"
          >
            Edit Email
          </v-btn>
        </v-form>
      </v-card>
      <v-card class="profile2 pa-4 mx-auto"
        ><v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="New Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validatePassword"
          >
            Change Password
          </v-btn>
        </v-form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    password: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "New Password is required",
      (v) => v.length >= 8 || "E-mail must 8 chars or more",
    ],
  }),

  methods: {
    validateEmail() {
      this.$refs.form.validate();
      this.$store
        .dispatch("updateUser", {
          email: this.email,
          _id: this.$store.state.Auth.user.userId,
        })
        .then(() => {
          this.$router.push("/");
          this.$swal({
            title: "Profile Edited",
            text: "Profile successfully changed",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((error) => {
          this.$swal({
            title: "Whoops, looks like something went wrong!",
            text:
              error +
              ": your password wasn't changed, Quentin coded this, he's fired",
            icon: "error",
            confirmButtonText: "Retry",
          });
        });
    },
    validatePassword() {
      this.$refs.form.validate();
      this.$store
        .dispatch("updateUser", {
          password: this.password,
          _id: this.$store.state.Auth.user.userId,
        })
        .then(() => {
          this.$router.push("/");
          this.$swal({
            title: "Profile Edited",
            text: "Profile successfully changed",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((error) => {
          this.$swal({
            title: "Whoops, looks like something went wrong!",
            text:
              error +
              ": your password wasn't changed, Quentin coded this, he's fired",
            icon: "error",
            confirmButtonText: "Retry",
          });
        });
    },
  },
};
</script>
<style scoped>
.profile {
  width: 400px;
}
.profile2 {
  margin-top: 20px;
  width: 400px;
}
</style>