import { createStore } from "framework7/lite";

const store = createStore({
  state: {
    currentUser: null,
    loading: true,
  },
  getters: {
    currentUser({ state }) {
      return state.currentUser;
    },
    loading({ state }) {
      return state.loading;
    },
  },
  actions: {
    setCurrentUser({ state }, currentUser) {
      state.currentUser = currentUser;
      state.loading = false;
    },
  },
});
export default store;
