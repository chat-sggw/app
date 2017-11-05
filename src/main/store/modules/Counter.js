const state = {
  main: 0
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state, number) {
    state.main -= number;
  },
  INCREMENT_MAIN_COUNTER(state, number) {
    state.main += number;
  }
};

const actions = {
  changeCounter({ commit }, number) {
    if (number > 0) {
      commit('INCREMENT_MAIN_COUNTER', number);
    } else {
      commit('DECREMENT_MAIN_COUNTER', -number);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
