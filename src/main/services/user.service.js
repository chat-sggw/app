import axios from 'axios';
import { getAuthorizationHeader } from './auth.service';
import { apiUrl } from '../config';

export function getContacts() {
  return axios.get(
    `${apiUrl}/api/user/friends`,
    {
      headers: {
        Authorization: getAuthorizationHeader()
      }
    }
  );
}
