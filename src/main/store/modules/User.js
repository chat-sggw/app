/* eslint-disable prefer-destructuring */
import { fetchContactsApi, fetchConversationApi } from '../../services/api.service';


const state = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
  status: '',
  contacts: [],
  messages: []
};

const mutations = {
  SET_FIRSTNAME(state, firstName) {
    state.firstName = firstName;
  },
  SET_LASTNAME(state, lastName) {
    state.lastName = lastName;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_USER(state, user) {
    state.firstName = user.firstName;
    state.lastName = user.lastName;
    state.email = user.email;
    state.avatar = user.avatar;
    state.status = user.status;
  },
  ADD_CONTACT(state, contact) {
    state.contacts.push(contact);
  },
  UPDATE_CONTACT(state, contact) {
    const foundIndex = state.contacts.findIndex(knownContact => knownContact.conversationId === contact.conversationId);
    if (foundIndex >= 0) {
      state.contacts[foundIndex] = contact;
    }
  },
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },
  UPDATE_MESSAGE(state, message) {
    const foundIndex = state.messages.findIndex(i => i.id === message.id);
    if (foundIndex >= 0) {
      state.messages[foundIndex] = message;
    }
  }
};

const actions = {
  changeUsername({ commit }, text) {
    commit('SET_FIRSTNAME', text);
  },
  fetchContacts({ commit, state }) {
    fetchContactsApi()
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
  fetchConversation({ commit, state }, conversationId) {
    if (state.contacts[0].conversationId) {
      conversationId = state.contacts[0].conversationId; // testowo - ustawia na konwersacje z pierwszym znajomym, najpierw trzeba pobrac znajomych
    }
    fetchConversationApi(conversationId)
      .then((response) => {
        response.data.forEach((message) => {
          if (!state.messages.find(i => i.id === message.id)) {
            commit('ADD_MESSAGE', message);
          } else {
            commit('UPDATE_MESSAGE', message);
          }
        });
      });
  }
};

export default {
  state,
  mutations,
  actions
};
