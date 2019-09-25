import Vue from "vue";
import Router from "vue-router";
import store from "./store/index";
const Contact = () => import("@/views/Home.vue");
const ContactsList = () => import("@/views/ContactList.vue");
const Favourite = () => import("@/views/Favourite.vue");

const Group = () => import("@/views/Group.vue");
const GroupDlg = () => import("@/components/AddGroupDlg");
const Feedback = () => import("@/views/Feedback.vue");
const Help = () => import("@/views/Help.vue");
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const UserProfile = () => import("@/views/UserProfile.vue");

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Login
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/contact",
      component:Contact,  
      children: [
        {
          path: "/",
          name: "contacts",
          component: ContactsList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "favourite",
          name: "favourite",
          component: Favourite,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "group/:id",
          name: "group",
          component: Group,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "addgrp/:dlg",
          name: "addgrp",
          component: GroupDlg
        },
        {
          path: "help",
          name: "help",
          component: Help,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "feedback",
          name: "feedback",
          component: Feedback,
          meta: {
            requiresAuth: true
          }
        },

        {
          path: "profile",
          name: "profile",
          component: UserProfile,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
