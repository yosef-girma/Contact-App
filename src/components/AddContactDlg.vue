<template>
  <!-- dialog  -->
  <v-content>
    <v-dialog v-model="dialog" width="800px" persistent click:outside="console.log('outside')">
      <v-card>
        <v-card-title
          v-if="triggerEditContact?cardTitle='Edit Contact':cardTitle='Create Contact'"
        >{{ cardTitle }}</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <image-input v-model="avatar" @input="handleImageUpload">
                <div slot="activator">
                  <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                    <span>Click to add profile pic</span>
                    <div v-if="triggerEditContact">
                    <img :src="userImage" >
                    {{ userImage}}
                    </div>
                  </v-avatar>
                  <v-avatar size="150px" v-ripple v-else class="mb-3">
                    <img :src="avatar.imageURL" alt="avatar" />
                  </v-avatar>
                </div>
              </image-input>

              <v-flex xs4 sm4 md4>
                <v-text-field
                  class="ml-10 mt-12"
                  label="First name*"
                  v-model="contact.fname"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field
                  label="Last name*"
                  hint="optional"
                  v-model="contact.lname"
                  persistent-hint
                  class="ml-10 mt-12"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Email*"
                  required
                  hint="example@somedomain.com"
                  persistent-hint
                  v-model="contact.email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Phone No*" required v-model="contact.phoneno"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Company" v-model="contact.company"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Job Title"
                  hint="optional"
                  persistent-hint
                  v-model="contact.job"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Address" v-model="contact.address"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  label="Description"
                  value="This is clearable text."
                  v-model="contact.description"
                ></v-textarea>

                <!-- <input type="hidden" value="profilepic" v-model="contact.profilepic" /> -->
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <div class="align center">
            <v-btn text color="primary" @click="onClickCancel">Cancel</v-btn>

            <v-btn
              v-if="triggerEditContact"
              text
              color="primary"
              @click="updateContact(contactId)"
            >Save</v-btn>
            <v-btn v-else text color="primary" @click="addContact">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
import { bus } from "../main";
import ImageInput from "./ImageInput.vue";
// import Vue from 'vue';
// Vue.prototype.$formData = null;
// Vue.prototype.$imageURL = null;
export default {
  props: {
    triggerEditContact: Boolean,
    contactId: String
  },

  data() {
    return {
      dialog: true,
      cardTitle: "",
      contact: {},
      avatar: null,
      file: "",
      imgFormData: null,
      imgURL: "",
      userImage:null
    };
  },

  mounted() {
    this.dialog = true;
    if (this.triggerEditContact) {
      this.editContact(this.contactId);
    }
  },
  components: {
    ImageInput: ImageInput
  },

  methods: {
    /*  uploadImage() {

        let formData = this.$formData
        let url = ""

        formData.append('file', this.file);
 
        this.$axios.post( url,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
           
             })
        .catch(function(){
          console.log('FAILURE!!');
        });

    }, */

    /*  handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }, */
    handleImageUpload(value) {
      console.log("form data", value.formData);
      this.imgFormData = value.formData;
      this.imgURL = value.imageURL;
      console.log("image url", value.imageURL);
      console.log("emit called", this.imgURL);
    },

    onClickCancel() {
      this.$emit("update-trigger", "");
      console.log("on cancel emit");
    },
    addContact() {
      console.log("Add Connection");
      let userId = localStorage.getItem("userId");

      let uri = this.$hostname + `BaseUsers/${userId}/contacts`;

      let formData = this.imgFormData;
      let url = "http://localhost:3000/api/containers/profile/upload";

      //    formData.append('file', this.imgURL);
      let that = this;
      this.$axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          let profileImg = response.data.result.files.file[0].name
          that.contact.profilepic = profileImg
          that.$axios
            .post(uri, that.contact)
            .then(response => {
              console.log(response);
              that.dialog = false;
              that.contact.length = 0;
              bus.$emit("add-to-table", response.data.id);
            })
            .catch(err => console.log(err));
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    editContact(id) {
      console.log(" from edit");
      console.log(id);
      let uri = `http://localhost:3000/api/Contacts/${id}`;
      console.log("contact", this.contact);
      if (Object.keys(this.contact).length != 0) {
        //this.dialog = true
        console.log("i have something insdie and am contact", this.contact);
        this.userImage = this.$hostname +"containers/profile/download/"+this.contact.profilepic
      } else {
        console.log("i don't ahve ");
        this.axios
          .get(uri)
          .then(response => {
            this.dialog = true;
            console.log(response.data);
            console.log(response);

            this.contact = response.data;
          })
          .catch(err => console.log(err));

        console.log("write something here");
      }
    },
    updateContact(id) {
      console.log("update");

      let userId = localStorage.getItem("userId");
      let uri = this.$hostname + `BaseUsers/${userId}/Contacts/${id}`;
      this.axios
        .put(uri, this.contact)
        .then(response => {
          console.log("i am update");
          console.log(response);
          // this.dialog   = true
          this.contacts = response.data;
          this.$emit("update-trigger");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>