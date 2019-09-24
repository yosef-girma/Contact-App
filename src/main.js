import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios);
Vue.prototype.$hostname = "http://localhost:3000/api/";
Vue.prototype.$currentUserId = localStorage.getItem("userId");

//import vuetify from 'vuetify/lib'


const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.axios.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
