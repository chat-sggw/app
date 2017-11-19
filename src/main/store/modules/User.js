const state = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
  status: ''
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
  }
};

const actions = {
  changeUsername({ commit }, text) {
    commit('SET_FIRSTNAME', text);
  }
};

export default {
  state,
  mutations,
  actions
};
