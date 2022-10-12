import { createStore } from "vuex";

export default createStore({
  state: {
    log: {},
  },
  getters: {
    getLog: (state) => {
      return state.log;
    },
  },
  mutations: {
    initLogOfDay: (state, date) => {
      state.log = { ...state.log, [date]: {} };
    },
    updateLog: (state, entry) => {
      state.log = { ...state.log, entry };
    },
  },
  actions: {},
  modules: {},
});
