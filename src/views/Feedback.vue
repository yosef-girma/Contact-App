<template>
    <v-app>
        
    <v-container fluid ma-6 pa-0 fill-height  >
    <v-layout >        
    <v-card flat class="pl-12" width="70vw">
    <v-card-title align-center primary-title class="headline mt-6">
      <h4> Send us Feedback</h4>
    </v-card-title>

    <v-form class="ma-4">
      <v-flex xs8 justify-center>  
      <v-text-field
        class="ma-6"
       
        v-model="feedback.email"
        name="email"
        :rules="emailRules"
        required
        label="Email"
      ></v-text-field>
      </v-flex>
      <v-flex xs8 justify-center>
         <v-textarea
            class="ma-6"
            v-model="feedback.description"
            auto-grow:true
            clearable:true
            counter:true
            persistent-hint:true
            placeholder="FeedBack"
          
          ></v-textarea>
      </v-flex>  
      <v-card-actions class="mt-12">
          <v-flex xs6 justify-center>
               <div class="my-2" style="align-center">
              <v-btn  text x-large depressed   color="primary"  @click="sendFeedback">Submit</v-btn>
              </div>
          </v-flex>
   
      </v-card-actions>
     
    </v-form>
   </v-card>
    </v-layout>
    </v-container>
    </v-app>

   
   
     
</template>
<script>
import layout from "@/components/layout";
export default {

    components: {
       layout
  },
  data: () => ({
      feedback:{},

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
      sendFeedback()
      {
        console.log("send feedback")               
      }
  },
}

</script>