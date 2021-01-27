import axios from "axios";

const state = {
    concerts: [],
};

const getters = {
  getAllConcerts: (state) => state.concerts,
};

const actions = {
  async fetchAllConcerts({ commit }) {
    const response = await axios.get("/concerts");
    commit("setConcerts", response.data);
  },
  async deleteConcert({ commit }, id) {
    await axios.delete(`/concert/${id}`);
    commit("removeConcert", id);
  },

  async createConcert({ commit }, newConcert) {
    const response = await axios.post("/concert", newConcert);
    commit("addConcert", response.data);
  },

  async updateConcert({ commit }, updatedConcert) {
    let response = await axios.put(
      `/concert/${updatedConcert._id}`,
      updatedConcert,
    );
    commit("updateConcert", response.data);
  },
};

const mutations = {
  setConcerts: (state, concerts) => (state.concerts = concerts),
  removeConcert: (state, id) =>
    (state.concerts = state.concerts.filter((concert) => concert._id != id)),
  addConcert: (state, newConcert) => state.concerts.unshift(newConcert),
  updateConcert: (state, updatedConcert) => {
    const index = state.concerts.findIndex(
      (concert) => concert._id === updatedConcert._id,
    );
    if (index !== -1) {
      state.concerts.splice(index, 1, updatedConcert);
    }
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};