import axios from "axios";

export default {
  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },

    user(state) {
      return state.user;
    },
  },

  mutations: {
    set_token: (state, token) => (state.token = token),
    set_user: (state, data) => (state.user = data),
  },

  actions: {
    async signIn({ dispatch }, credentials) {
      let response = await axios.post("auth/login", credentials);
      return dispatch("attempt", response.data.access_token);
    },

    async attempt({ commit, state }, token) {
      // console.log(token)
      if (token) {
        commit("set_token", token);
      }
      if (!state.token) {
        return;
      }
      try {
        let response = await axios.get("user");
        // console.log(response.data);
        commit("set_user", response.data);
      } catch (e) {
        commit("set_token", null);
        commit("set_user", null);
      }
    },

    async signOut({ commit }) {
      commit("set_token", null);
      commit("set_user", null);
    },

    async register(_, userinfo) {
      let response = await axios.post("auth/register", userinfo);
      return response.data.message;
    },

    async sendToken(_, userinfo) {
      let response = await axios.post("send-token", userinfo);
      return response.data;
    },

    async validateToken(_, token) {
      let response = await axios.post("validate-token", token);
      return response;
    },

    async changePassword(_, userinfo) {
      let response = await axios.post("reset-password", userinfo);
      return response;
    },
  },
};
