import axios from 'axios';
import qs from 'qs';
import store from '../store';
import { apiUrl } from '../config';

export function getUser() {
  return undefined;
}

export function getAuthorizationHeader() {
  const { access_token, token_type } = store.state.Auth;
  return `${token_type} ${access_token}`;
}

export async function login({ username, password }) {
  try {
    const response = await axios.post(
      `${apiUrl}/token`,
      qs.stringify({
        username,
        password,
        grant_type: 'password'
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
