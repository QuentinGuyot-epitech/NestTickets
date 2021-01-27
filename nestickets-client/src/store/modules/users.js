import axios from "axios";

const state = {
  users: [],
  user: null,
};

const getters = {
  getAllUsers: (state) => state.users,
  getUserById: (state) => (id) => {
    return state.users.find((user) => user._id === id);
  },
  getUser: (state) => state.user,
};

const actions = {
  async setAllUsers({ commit }) {
    var response = await axios.get("/users");
    commit("setMyAllUsers", response.data);
  },

  async setUser({ commit }, id) {
    var response = await axios.get(`/user/${id}`);
    commit("setMyUser", response.data);
  },

  async addUser({ commit }, newUser) {
    var response = await axios.post("/auth/register", newUser);
    commit("addMyUser", response.data);
  },

  async deleteUser({ commit }, id) {
    await axios.delete(`/user/${id}`);
    commit("deleteMyUser", id);
  },

  async updateUser({ commit }, newUser) {
    let response = await axios.put(`/user/${newUser._id}`, newUser);
    response = await axios.get(`/users`);
    commit("updateMyUser", response.data);
  },
};

const mutations = {
  setMyUser: (state, user) => (state.user = user),
  setMyAllUsers: (state, users) => (state.users = users),
  addMyUser: (state, newUser) => state.users.push(newUser),
  deleteMyUser: (state, _id) =>
    (state.users = state.users.filter((users) => users._id !== _id)),
  updateMyUser: (state, users) => (state.users = users),
};

export default {
  state,
  mutations,
  getters,
  actions,
};
