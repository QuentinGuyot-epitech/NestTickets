import axios from "axios";

const state = {
    bands: [],
};

const getters = {
  getAllBands: (state) => state.bands,
};

const actions = {
  async setAllBands({ commit }) {
    const response = await axios.get("/bands");
    commit("setBands", response.data);
  },

  async deleteBand({ commit }, id) {
    await axios.delete(`/band/${id}`);
    commit("removeBand", id);
  },

  async addBand({ commit }, newBand) {
    const response = await axios.post("/band", newBand);
    commit("createBand", response.data);
  },

  async updateBand({ commit }, updatedBand) {
    let response = await axios.put(`/band/${updatedBand._id}`, updatedBand);
    commit("updBand", response.data);
  },
};

const mutations = {
  setBands: (state, bands) => (state.bands = bands),
  removeBand: (state, id) =>
    (state.bands = state.bands.filter((band) => band._id != id)),
  createBand: (state, newBand) => state.bands.unshift(newBand),
  updBand: (state, updBand) => {
    const index = state.bands.findIndex(
      (band) => band._id === updBand._id,
    );
    if (index !== -1) {
      state.bands.splice(index, 1, updBand);
    }
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};