/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import { getContacts } from '../../services/user.service';
import { getConversation, sendMessage } from '../../services/conversation.service';

const state = {
  contacts: [],
  conversations: {},
  position: null
};

const mutations = {
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
  SET_LOCATION(state, position) {
    state.position = position;
  }
};

const actions = {
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
  }
};

const getters = {
  getConversationById: state => (id) => {
    if (state.conversations[id]) {
      return state.conversations[id];
    }
    return [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
