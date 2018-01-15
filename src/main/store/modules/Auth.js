import * as auth from '../../services/auth.service';
import router from '../../router';

const state = {
  access_token: null,
  expires_in: null,
  token_type: null,
  error: null
};

const mutations = {
  SET_TOKEN(state, tokenData) {
    if (tokenData) {
      state.access_token = tokenData.access_token;
      state.expires_in = tokenData.expires_in;
      state.token_type = tokenData.token_type;
      localStorage.setItem('authToken', JSON.stringify(tokenData));
    } else {
      localStorage.removeItem('authToken');
    }
  },
  SET_AUTH_ERROR(state, errorText) {
    state.error = errorText;
  },
  CLEAR_AUTH_ERROR(state) {
    state.error = null;
  }
};

const actions = {
  async reauthenticate({ commit, dispatch }, tokenData = JSON.parse(localStorage.getItem('authToken'))) {
    if (!tokenData) {
      return dispatch('logout');
    }

    try {
      commit('SET_TOKEN', tokenData);
      // const user = await getUser();
      // commit('SET_USER', user);
      // return user;
      dispatch('fetchContacts');
      return true;
    } catch (e) {
      commit('SET_AUTH_ERROR', e);
      console.error(e);
      return dispatch('logout');
    }
  },

  async authenticate({ commit, dispatch }, { username, password }) {
    commit('CLEAR_AUTH_ERROR');
    const tokenData = await auth.login({ username, password });

    // commit('setError', 'Cause of error is...'); // take error from login by catch or return instead token
    commit('SET_TOKEN', tokenData);
    return dispatch('reauthenticate', tokenData);
  },

  async logout({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_USER', {});
    await auth.logout();
    return router.push({ name: 'login' });
  },

  register(context, userData) {
    return auth.register(userData);
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
