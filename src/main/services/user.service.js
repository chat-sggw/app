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
  )
    .then(response => response.data);
}

export function search(query) {
  return axios.get(
    `${apiUrl}/api/user/search`,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
        Accept: 'application/json'
      },
      params: {
        query
      }
    }
  )
    .then(response => response.data);
}

export function ping(longitude, latitude) {
  return axios.post(
    `${apiUrl}/api/user/ping`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(),
        Accept: 'application/json'
      },
      params: {
        longitude,
        latitude
      }
    }
  )
    .then(response => response.data);
}
