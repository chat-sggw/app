import Vue from 'vue';
import Vuex from 'vuex';
import { getContacts, search, ping } from '../services/user.service';
import { getConversation, sendMessage } from '../services/conversation.service';
import * as auth from '../services/auth.service';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',


  state: {
    token: {
      access_token: null,
      expires_in: null,
      token_type: null
    },
    error: null,
    userName: null,
    userId: null,
    contacts: [],
    conversations: {},
    location: null
  },


  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    UPDATE_CONTACT(state, contact) {
      const foundIndex = state.contacts.findIndex(knownContact => knownContact.conversationId === contact.conversationId);
      if (foundIndex >= 0) {
        state.contacts[foundIndex] = contact;
      }
    },
    ADD_CONVERSATION_HISTORY(state, { conversationId, history }) {
      if (!state.conversations[conversationId]) {
        Vue.set(state.conversations, conversationId, []);
      }
      const newOnes = history.filter(current => state.conversations[conversationId].findIndex(old => old.id === current.id) === -1);
      const updated = state.conversations[conversationId].concat(newOnes);
      Vue.set(state.conversations, conversationId, updated);
    },
    SET_LOCATION(state, coords) {
      state.location = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy
      };
    },
    SET_TOKEN(state, tokenData) {
      if (tokenData) {
        state.token.access_token = tokenData.access_token;
        state.token.expires_in = tokenData.expires_in;
        state.token.token_type = tokenData.token_type;
        state.userName = tokenData.userName;
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
    },
    SET_USER(state, userId) {
      state.userId = userId;
    }
  },


  getters: {
    getConversationById: state => (id) => {
      if (state.conversations[id]) {
        return state.conversations[id];
      }
      return [];
    },
    isMe: state => userId => userId === state.userId,
    isAuthenticated(state) {
      return state.access_token && state.userId;
    },
    error(state) {
      return state.error;
    }
  },


  actions: {
    fetchContacts({ commit, state }) {
      return getContacts()
        .then((response) => {
          response.data.forEach((contact) => {
            if (!state.contacts.find(knownContact => knownContact.conversationId === contact.conversationId)) {
              commit('ADD_CONTACT', contact);
            } else {
              commit('UPDATE_CONTACT', contact);
            }
          });
        });
    },

    fetchConversation({ commit }, { conversationId, afterMessageId }) {
      return getConversation(conversationId, afterMessageId)
        .then((history) => {
          commit('ADD_CONVERSATION_HISTORY', { conversationId, history });
        });
    },

    sendMessage({ state, dispatch }, { conversationId, text }) {
      return sendMessage(conversationId, text)
        .then(() => {
          const afterMessageId = state.conversations[conversationId].slice(-1).pop().id;
          dispatch('fetchConversation', { conversationId, afterMessageId });
        });
    },

    async fetchLocation({ commit, state }) {
      const getCurrentPosition = async () => new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
          );
        } else {
          reject(new Error('GeoLocation is not available'));
        }
      });

      const { coords } = await getCurrentPosition();
      commit('SET_LOCATION', coords);
      return ping(state.location.longitude, state.location.latitude);
    },

    async reauthenticate({ commit, dispatch, state }, tokenData = JSON.parse(localStorage.getItem('authToken'))) {
      if (!tokenData) {
        return dispatch('logout');
      }

      try {
        commit('SET_TOKEN', tokenData);

        const users = await search(state.userName);
        const user = users.find(user => user.userName === state.userName);
        commit('SET_USER', user.id);

        await dispatch('fetchContacts');
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
  }
});
