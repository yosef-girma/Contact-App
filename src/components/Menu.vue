<template>
  <div class="text-left">
    <v-menu
      bottom
      origin="center center"
      top
      close-on-content-click
      transition="slide-x-transition"
      class="mt-12"
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon class="mr-12" v-on="{ ...tooltip, ...menu }">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <span>You</span>
        </v-tooltip>
      </template>

      <v-list rounded dense class="mt-12">
        <v-list-item
          v-for="(menuitem, index) in menuitems"
          :key="index"
          @click="onMenuItemSelected(index)"
        >
          <v-list-item-action>
            <v-icon>{{ menuitem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ menuitem.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
// import Setting from './Setting'
export default {
  components: {},
  data: () => ({
   
    menuitems: [
      { icon: "mdi-account-circle", text: "Profile" },
      { icon: "mdi-settings", text: "Setting" },
      { icon: "mdi-logout", text: "Logout" }
    ]
  }),
  computed: {
    userId: function() {
      return this.$store.getters.getUserId;
    }
  },
  methods: {
    onMenuItemSelected(index) {
      switch (index) {
        case 0:
          console.log("please this is user id", this.userId);
          console.log("profile");
          this.$router.push({ name: "profile" });
          break;
        case 1:
          console.log("please this is user id", this.userId);
          console.log("setting");
          //this.showSettingDlg = !this.showSettingDlg
          this.$emit("setting-clicked", true);
        

          break;
        case 2:
          console.log(index, "logout");
          console.log("please this is user id", this.userId);
          this.logout();
          break;
      }
    },

    logout: function() {
      console.log("logoout method called");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("login");
      });
    }
  }
};
</script>