import Vue from 'vue'
import Vuex from 'vuex'
import Concerts from "./modules/concerts";
import Auth from "./modules/auth";
import Users from "./modules/users";
import Bands from "./modules/bands";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    Concerts,
    Auth,
    Users,
    Bands,
  }
})
