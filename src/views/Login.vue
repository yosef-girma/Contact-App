<template>
  <layout>
  <v-card flat width="440px" height="450px">
    <v-card-title align-center primary-title class="headline mt-6">
      <h4>Login</h4>
    </v-card-title>

    <v-form class="ma-4">
      <v-text-field
        class="ma-6"
        prepend-icon="mdi-email"
        v-model="user.email"
        name="email"
        :rules="emailRules"
        required
        label="Email"
      ></v-text-field>
      <v-text-field
        class="ma-4"
        prepend-icon="mdi-lock"
        label="Password"
        :append-icon="e1 ? 'mdi-visibility' : 'mdi-visibility-off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
        name="input-10-1"
        hint="At least 8 characters"
        min="8"
        counter
        v-model="user.password"
      ></v-text-field>
      <v-card-actions class="mt-12">
        <v-btn primary large block @click="login">Login</v-btn>
      </v-card-actions>
      <v-flex align-end class="mt-10 ml-10 subtitle-1 font-weight-light justify-center">
        <span>
          <router-link to="/register">
            <a>Already have account? Register</a>
          </router-link>
        </span>
      </v-flex>
    </v-form>
  </v-card>
  </layout>
</template>

<script>
import layout from "@/components/layout";
export default {
  props: {
    source: String
  },

  components: {
    layout
  },
  data: () => ({
    e1: false,
    password: "",

    user: {},
    drawer: null,
    emailRules: [
      v => {
        return !!v || "E-mail is required";
      },
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ]
  }),
  methods: {
    login: function() {
      let email = this.user.email;
      let password = this.user.password;

      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push("/contact");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>


