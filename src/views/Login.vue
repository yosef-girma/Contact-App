<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout row class="text-xs-center" justify-center>
          <v-flex xs6 md6 class="grey lighten-4">
            <v-container
              style="position: relative;top: 0%;width:550px; height:500px;"
              class="text-xs-center"
            >
              <v-card flat width="440px" height="450px">
                <v-card-title align-center primary-title class="headline mt-6">
                  <h4>Login</h4>
                </v-card-title>

                <v-form class="ma-4">
                  <v-text-field
                    class="ma-6"
                    prepend-icon="mdi-account"
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
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
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
    /* loginUser() {
      console.log(this.user.email);
      console.log(this.user.password);

      let uri = this.$hostname + `BaseUsers/login`;
      this.axios
        .post(uri, this.user)
        .then(response => {
          console.log(response);
          this.$router.push({ name: "contacts" });
        })
        .catch(err => console.log(err));
    } */
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





<!-- <v-container
class="fill-height"
fluid
>
<v-row
align="center"
justify="center"
>
<v-col
cols="12"
sm="8"
md="4"
>
<v-card class="elevation-12">
<v-toolbar
color="primary"
dark
flat
>
<v-toolbar-title>Login form</v-toolbar-title>
<div class="flex-grow-1"></div>
<v-tooltip bottom>
<template v-slot:activator="{ on }">
<v-btn
:href="source"
icon
large
target="_blank"
v-on="on"
>
<v-icon>mdi-code-tags</v-icon>
</v-btn>
</template>
<span>Source</span>
</v-tooltip>
<v-tooltip right>
<template v-slot:activator="{ on }">
<v-btn
icon
large
href="https://codepen.io/johnjleider/pen/pMvGQO"
target="_blank"
v-on="on"
>
<v-icon>mdi-codepen</v-icon>
</v-btn>
</template>
<span>Codepen</span>
</v-tooltip>
</v-toolbar>
<v-card-text>
<v-form>
<v-text-field
label="Login"
name="login"
prepend-icon="person"
type="text"
></v-text-field>
<v-text-field
id="password"
label="Password"
name="password"
prepend-icon="lock"
type="password"
></v-text-field>
</v-form>
</v-card-text>
<v-card-actions>
<div class="flex-grow-1"></div>
<v-btn color="primary">Login</v-btn>
</v-card-actions>
</v-card>
</v-col>
</v-row>
</v-container> -->