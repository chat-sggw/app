import { getUser, login } from '../../services/auth.service';
import router from '../../router';

const state = {
  token: null,
  error: null
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('authToken', token);
  },
  setError(state, errorText) {
    state.error = errorText;
  },
  clearError(state) {
    state.error = null;
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
      commit('setError', e);
      console.error(e);
      return dispatch('logout');
    }
  },

  async authenticate({ commit, dispatch }, { username, password }) {
    commit('clearError');
    const token = await login({ username, password });

    // commit('setError', 'Cause of error is...'); // take error from login by catch or return instead token
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
  },
  error() {
    return state.error;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
