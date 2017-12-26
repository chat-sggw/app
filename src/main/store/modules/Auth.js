import { getUser, login } from '../../services/auth.service';
import router from '../../router';

const state = {
  token: null
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('authToken', token);
  }
};

const actions = {
  async reauthenticate({ commit, dispatch }, token = localStorage.getItem('authToken')) {
    if (!token) {
      return dispatch('logout');
    }

    try {
      commit('SET_TOKEN', token);
      const user = await getUser();
      commit('SET_USER', user);
      return user;
    } catch (e) {
      console.error(e);
      return dispatch('logout');
    }
  },

  async authenticate({ commit, dispatch }, { username, password }) {
    const token = await login({ username, password });
    commit('SET_TOKEN', token);
    return dispatch('reauthenticate', token);
  },

  logout({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_USER', {});
    router.push({ name: 'login' });
  }
};

const getters = {
  isAuthenticated(state, _, rootState) {
    return state.token && rootState.User.email;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
