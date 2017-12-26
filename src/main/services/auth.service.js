import store from '../store';

const users = {
  SPECJALNY_TOKEN: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@test.com',
    avatar: '',
    status: 'online'
  }
};

export function getUser() {
  return Promise.resolve(users[store.state.Auth.token]);
}

export function login({ username, password }) {
  console.log(username, password);
  return 'SPECJALNY_TOKEN';
}
