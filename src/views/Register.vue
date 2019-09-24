<template>
  <layout>
    <v-card flat width="440px" height="450px">
      <v-card-title align-center primary-title class="headline mt-6">
        <h4>Register</h4>
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
          <v-btn primary large block @click="register">Register</v-btn>
        </v-card-actions>
        <v-flex align-end class="mt-10 ml-10 subtitle-1 font-weight-light justify-center">
          <span>
            <router-link to="/">
              <a>Already have account? Login</a>
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
    /*  registerUser()
    {
     var that = this ;
     console.log(this.user.email)
     console.log(this.user.password)
     let uri=this.$hostname+ `BaseUsers`
     this.axios.post(uri,this.user)
     .then(response =>{

         console.log(response)
        /// that.$router.push({name:'contacts'}) 
      })
     .catch(err =>console.log(err));

    } */
    register: function() {
      let data = {
        email: this.user.email,
        password: this.user.password
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>


