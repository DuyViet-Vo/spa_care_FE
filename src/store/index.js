import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    username: "",
    user_id: null,
    quyen: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserId(state, user_id){
      state.user_id = user_id
    },
    setQuyen(state,quyen){
      state.quyen = quyen
    }
  },
  actions: {
    saveToken({ commit }, { token, username, user_id, quyen }) {
      commit("setToken", token);
      commit("setUsername", username);
      commit("setUserId", user_id);
      commit("setQuyen", quyen)
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
    getUserId: (state) => state.user_id,
    getUserRole: (state) => state.quyen,
  },
});
