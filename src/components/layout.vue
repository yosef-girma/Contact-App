<template>
<v-app id="inspire">
<v-content>
    <v-container>
    <v-layout row class="text-xs-center" justify-center>
    
      <v-flex xs6 md6  class="grey lighten-4">
        <v-container style="position: relative;top: 0%;width:550px; height:500px;" class="text-xs-center">
        <slot> </slot>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</v-app>
</template