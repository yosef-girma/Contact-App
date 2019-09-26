import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' 
Vue.use(Vuetify, {
  theme: {
    secondary: "#0e71a3",
    primary: "#52c2b8",
    accent: "#e95e29"
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
