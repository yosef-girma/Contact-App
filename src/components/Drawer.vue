<template>
  <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :append-icon="item.model ? item.icon : item['icon-alt']"
          :prepend-icon="item.gicon"
        >
          <template v-slot:activator>
            <v-list-item @click.prevent="getGroupName">
              <!-- @click.prevent="swapComponent(item.text)" -->
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            justify-center
            class="ml-12"
            v-for="(child, i) in item.children"
            :key="i"
            @click="child.id==0 ? gdialog = !gdialog : selectGroup(child.id)"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :key="item.text" @click="" :to="item.route">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>



<script>
import AddGroupDlg from "./AddGroupDlg.vue";
import {EventBus}  from "@/main.js";

export default {
  props: ["drawer"],
  components: {
    AddGroupDlg
  },
  data: () => ({
    dialog: false,
    gdialog: false,
    contactsName: [],

    items: [
      { icon: "mdi-contacts", text: "Contacts", route: "/contact" },
      { icon: "mdi-star", text: "Favourite", route: "/contact/favourite" },
      {
        gicon: "mdi-account-group",
        text: "Group",
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        model: false,
        children: []
      },
      { icon: "mdi-send", text: "Send-Feedback", route: "/contact/feedback" },
      { icon: "mdi-help", text: "Help", route: "/contact/help" }
    ]
  }),

  mounted() {
    console.log("emit event");
    EventBus.$on('set-drawer',(data) => {
      this.drawer = !this.drawer
    });
  },

  methods: {
    selectGroup(id) {
      this.$router.push({ name: "group", params: { id: id } });
    },

    getGroupName() {
      let uri =
        "http://localhost:3000/api/groups?filter[fields][id]=true&filter[fields][name]=true";
      var groupList = [];
      this.axios
        .get(uri)
        .then(response => {
          var that = this;

          that.items[2].children.length = 0;
          that.items[2].children.push({
            icon: "mdi-plus",
            text: "Create Group",
            id: "0"
          });
          response.data.forEach(function(element) {
            var ix = { id: element.id, text: element.name };
            that.items[2].children.push(ix);
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>