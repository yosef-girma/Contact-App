<template>
  <v-content class="grey lighten-3">
    <div style="margin:100">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
export default {
  name: "View"
};
</script>
