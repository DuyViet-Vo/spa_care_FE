import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    saveToken({ commit }, { token, username }) {
      commit("setToken", token);
      commit("setUsername", username);
    },
    login({ commit }, { token, username }) {
      commit("setToken", token);
      commit("setUsername", username);
    },
    logout({ commit }) {
      commit("setToken", null);
      commit("setUsername", "");
    },
  },
  getters: {
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
  },
});
