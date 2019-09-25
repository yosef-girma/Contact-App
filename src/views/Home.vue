<template>
  <v-app id="inspire" class="grey lighten-4">
    <Drawer />
    <AppBar @setting-clicked="settingClicked"/>

    <router-view />
    <v-content>
    <div v-if="showSettingDlg" style="width:300">
      <Setting
        :showSettingDlg="showSettingDlg"
        @setting-dlg="showSettingDlg  = !showSettingDlg"
        
      />
    </div>
    </v-content>  
  </v-app>
</template>

<script>
import Setting from "@/components/Setting";
import AddGroupDlg from "@/components/AddGroupDlg.vue";
import Drawer from "@/components/Drawer";
import AppBar from "@/components/AppBar";

export default {
  props: {
    source: String
  },
  components: {
    AddGroupDlg,
    Drawer,
    AppBar,
    Setting
  },

  data: () => ({
    dialog: false,
    gdialog: false,
    drawer: null,
    showSettingDlg: false,
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

  methods: {
    selectGroup(id) {
      this.$router.push({ name: "group", params: { id: id } });
    },
    settingClicked()
    {
      this.showSettingDlg  = !this.showSettingDlg
      console.log("emit received")
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

