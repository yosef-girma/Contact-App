<template>
  <!-- dialog  -->
  <v-content>
    <v-dialog v-model="dialog" width="800px" persistent>
      <v-card>
        <v-card-title
          v-if="triggerEditContact?cardTitle='Edit Contact':cardTitle='Create Contact'"
        >{{ cardTitle }}</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First name*" v-model="contact.fname" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Last name*"
                  hint="optional"
                  v-model="contact.lname"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Email*"
                  required
                  hint="example@somedomain.com"
                  prepend-icon="mdi-email"
                  persistent-hint
                  v-model="contact.email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Phone No*"
                  prepend-icon="mdi-cellphone"
                  required
                  v-model="contact.phoneno"
                ></v-text-field>
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

export default {
  props: {
    triggerEditContact: Boolean,
    contactId: String
  },

  data() {
    return {
      dialog: true,
      cardTitle: "",
      contact: {}
    };
  },

  mounted() {
    this.dialog = true;
    if (this.triggerEditContact) {
      this.editContact(this.contactId);
    }
  },
  methods: {
    onClickCancel() {
      this.$emit("update-trigger", "");
      console.log("on cancel emit");
    },
    addContact() {
      console.log("Add Connection");
      let userId = localStorage.getItem("userId");

      let uri = this.$hostname + `BaseUsers/${userId}/contacts`;
      this.axios
        .post(uri, this.contact)
        .then(response => {
          console.log(response);
          this.dialog = false;
          this.contact.length = 0;
          bus.$emit("add-to-table", response.data.id);
        })
        .catch(err => console.log(err));
    },

    editContact(id) {
      console.log(" from edit");
      console.log(id);
      let uri = `http://localhost:3000/api/Contacts/${id}`;
      console.log("contact", this.contact);
      if (Object.keys(this.contact).length != 0) {
        //this.dialog = true
        console.log("i have something insdie and am contact", this.contact);
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