<template>
  <v-layout justify-center>
    <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn bottom color v-on="on" fab fixed right  @click="dialog = !dialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Add Group</span>
    </v-tooltip>-->

    <v-dialog v-model="gdialog" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Group</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Group Name*" v-model="group.name" required></v-text-field>
              </v-flex>

              <v-flex>
                <v-autocomplete
                  :items="contacts"
                  label="Add Memembers"
                  filled
                  chips
                  color="blue-grey lighten-2"
                  item-text="name"
                  return-object
                  multiple
                  v-model="group.members"
                >
                  {{ group.members}}
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :input-value="data.selected"
                      close
                      class="chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                    >
                      <v-avatar>
                        <img :src="data.item.avatar" />
                      </v-avatar>
                      {{ data.item.fname + ' '+ data.item.lname}}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.fname + ' ' + data.item.lname"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('update-dlg')">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addGroup">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    gdialog: false
  },
  data() {
    let srcs = [
      "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    ];
    return {
      value: false,
      group: {},
      contacts: []
    };
  },
  created() {
    console.log("created");
    let uri =
      "http://localhost:3000/api/Contacts?filter[fields][id]=true&filter[fields][fname]=true&filter[fields][lname]=true";
    this.axios
      .get(uri)
      .then(response => {
        //let name = response.data.fname +' '+response.data.lname
        console.log("get listofcontact", response.data[0].fname);

        this.contacts = response.data;
        console.log("i am contact", this.contacts);
      })
      .catch(err => console.log(err));
  },
  methods: {
    addGroup() {
      console.log(this.group);
      console.log("here is the member", this.group.members);
      console.log("yeap");
      let userId = localStorage.getItem("userId");
      let uri = this.$hostname + `BaseUsers/${userId}/groups`;
      this.axios
        .post(uri, this.group)
        .then(response => {
          console.group("res", response);
          this.$emit("update-dlg", "");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>