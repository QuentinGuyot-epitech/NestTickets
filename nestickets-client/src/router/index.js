import Vue from "vue";
import VueRouter from "vue-router";
import concerts from "../views/concerts.vue";
import profile from "../views/profile.vue";
import admin from "../views/admin.vue";
import adminusers from "../views/adminusers.vue";
import adminbands from "../views/adminbands.vue";
import adminconcerts from "../views/adminconcerts.vue";
import adminstatistics from "../views/adminstatistics.vue";
import SignIn from "@/components/AuthComponents/SignInComponent.vue";
import store from '../store'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "concerts",
    component: concerts,
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }else if (store.getters["authenticated"] && !store.state.Auth.user.is_admin){
        return next({
          name: "concerts",
        });
      }else{
        next();
      }
    },
  },
  {
    path: "/adminusers",
    name: "adminusers",
    component: adminusers,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }else if (store.getters["authenticated"] && !store.state.Auth.user.is_admin){
        return next({
          name: "concerts",
        });
      }else{
        next();
      }
    },
  },
  {
    path: "/adminbands",
    name: "adminbands",
    component: adminbands,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }else if (store.getters["authenticated"] && !store.state.Auth.user.is_admin){
        return next({
          name: "concerts",
        });
      }else{
        next();
      }
    },
  },
  {
    path: "/adminconcerts",
    name: "adminconcerts",
    component: adminconcerts,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }else if (store.getters["authenticated"] && !store.state.Auth.user.is_admin){
        return next({
          name: "concerts",
        });
      }else{
        next();
      }
    },
  },
  {
    path: "/adminstatistics",
    name: "adminstatistics",
    component: adminstatistics,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }else if (store.getters["authenticated"] && !store.state.Auth.user.is_admin){
        return next({
          name: "concerts",
        });
      }else{
        next();
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "signin",
        });
      }
        next();
    },
  },
  { 
    path: "/signin",
    name: "signin",
    component: SignIn 
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
