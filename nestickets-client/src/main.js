import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";

require('@/store/modules/subscriber')

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
axios.defaults.baseURL = "http://127.0.0.1:3000/";


store.dispatch('attempt', localStorage.getItem('token')).then(() =>{
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
})