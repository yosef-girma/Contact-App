<template>
 
  <v-dialog v-model="showSettingDlg" class="justify-center">
    <v-card width="400" class="ml-12 justify-center">
      <v-card-title>
        <span class="headline">Settings</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-flex>
            <v-list two-line>
              <v-list-item-content>
                <v-list-item-title>Color Theme</v-list-item-title>
                <v-divider></v-divider>
             
                <v-list-item-sub-title>
                  <v-select :items="theme" label="Choose Theme" solo></v-select>
                </v-list-item-sub-title>
              </v-list-item-content>
            </v-list>
          </v-flex>

          <v-flex>
            <v-list two-line>
              <v-list-item-content>
                <v-list-item-title>Language</v-list-item-title>
                <v-divider></v-divider>

                <v-list-item-sub-title>
                  <v-select :items="lang" label="Choose Language" solo></v-select>
                </v-list-item-sub-title>
              </v-list-item-content>
            </v-list>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('setting-dlg')">Close</v-btn>
        <v-btn color="blue darken-1" text @click="applySetting">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script>
export default {
  props: {
    showSettingDlg: false
  },
  data() {
    return {
      theme: ["light", "dark"],
      lang: ["English", "Amharic"]
    };
  },
  methods: {
    applySetting() {
      this.$emit("setting-dlg");
    }
  }
};
</script>