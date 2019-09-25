<template>
  <v-app-bar dark :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3">
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4" dark>
      <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">Contacts</span>
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <Menu @setting-clicked="$emit('setting-clicked',true)"/>
  </v-app-bar>
</template>
<script>
import Menu from "./Menu.vue";
import { EventBus } from "@/main.js";
export default {
  components: {
    Menu
  },
  methods: {
    setDrawer() {
      EventBus.$emit("set-drawer", true);
    }
  }
};
</script>