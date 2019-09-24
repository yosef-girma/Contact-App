import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserId: state => state.user
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.user = localStorage.getItem("userId");
      console.log("auth success token", token);
      console.log("auth success user", user);
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    }
  },

  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/BaseUsers/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.id;
            const user = resp.data.userId;
            console.log("token", token);
            console.log("user", user);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/BaseUsers/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.id;
            const user = resp.data.userId;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  }
});
