<template>
  <v-container class="ma-4">
    <v-flex xs6 md6 class="ma-5" style="align-right">
      <v-text-field
        v-model="search"
        append-icon="mdi sheild-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-flex>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="contacts"
      :search="search"
      item-key="id"
      class="elevation-1"
    >
      <!--  <template v-slot:activator="{ on }">
          <v-avatar>
            <img src=$hostname + `containers/profile/download/${item.profilepic}` alt="user image" />
          </v-avatar>
        </template>
      -->

      <template v-slot:item.favourite="{ item }">
        <!-- <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip> -->

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn fab small v-on="on" @click="addToFavourite(item.id)">
              <v-icon style="color:#1e90ff">{{ favourite }}</v-icon>
            </v-btn>
          </template>
          <span>Favourite</span>
        </v-tooltip>
      </template>

      <template v-slot:item.edit="{ item }">
        <!-- <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip> -->

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn fab small v-on="on" @click="editMyContact(item.id)">
              <v-icon color="#1e90ff">{{ edit }}</v-icon>
            </v-btn>
          </template>
          <span>Edit Contact</span>
        </v-tooltip>
      </template>

      <template v-slot:item.delete="{ item }">
        <!-- <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip> -->

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn fab small v-on="on" @click="deleteContact(item.id)">
              <v-icon color="#1e90ff">{{ del }}</v-icon>
            </v-btn>
          </template>
          <span>Delete Contact</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <AddContactDlg
      v-if="dialog"
      :triggerEditContact="triggerEdit"
      :contactId="editContactId"
      @update-trigger="updateTrigger"
    />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn bottom color="pink" v-on="on" dark fab fixed right @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Add Contact</span>
    </v-tooltip>
  </v-container>
</template>
<script>
import AddContactDlg from "@/components/AddContactDlg";

import { bus } from "../main";
export default {
  components: {
    AddContactDlg
  },
  data() {
    return {
      dialog: false,
      triggerEdit: false,
      editContactId: "",
      search: "",
      selected: [],
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "fname"
        },
        { text: "Email", value: "email" },
        { text: "Phone No", value: "phoneno" },
        { text: "", value: "favourite" },
        { text: "", value: "edit" },
        { text: "", value: "delete" }
      ],

      favourite: "mdi-star-outline",
      edit: "mdi-circle-edit-outline",
      del: "mdi-delete-outline",

      contacts: []
    };
  },
  created() {
    let userId = localStorage.getItem("userId");
    console.log("userid", userId);
    console.log(this.$hostname);
    let uri = this.$hostname + `BaseUsers/${userId}/contacts`;
    this.axios
      .get(uri)
      .then(response => {
        this.contacts = response.data;
      })
      .catch(err => console.log(err));
  },
  computed: {},
  mounted() {
    console.log(this);
    bus.$on("add-to-table", data => {
      console.log(this);
      let uri = `http://localhost:3000/api/contacts/${data}`;
      this.axios.get(uri).then(response => {
        this.contacts.push(response.data);
      });
    });
  },
  methods: {
    addToFavourite(id) {
      let uri = `http://localhost:3000/api/contacts/favourite/update/${id}`;
      console.log(id);
      this.axios
        .put(uri)
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
    },
    editMyContact(id) {
      this.dialog = true;
      console.log("edit btn cicked", this.triggerEdit);

      this.triggerEdit = !this.triggerEdit;
      this.editContactId = id;
    },
    updateTrigger() {
      this.dialog = false;
      if (this.triggerEdit) {
        console.log("update trigger emit");
        console.log(this.triggerEdit);
        this.triggerEdit = !this.triggerEdit;
        console.log(this.triggerEdit);
      }
    },
    deleteContact(id) {
      console.log(id);
      console.log("delete");
      let uri = `http://localhost:3000/api/contacts/${id}`;
      this.axios
        .delete(uri)
        .then(response => {
          this.contacts = this.contacts.filter(contact => {
            return contact.id != id;
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>