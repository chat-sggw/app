import axios from 'axios';
import { getAuthorizationHeader } from './auth.service';
import { apiUrl } from '../config';

export function fetchContactsApi() {
  return axios.get(
    `${apiUrl}/api/user/friends`,
    {
      headers: {
        Authorization: getAuthorizationHeader()
      }
    }
  );
}

export function fetchConversationApi(conversationId) {
  return axios.get(
    `${apiUrl}/api/conversation/${conversationId}`,
    {
      headers: {
        Authorization: getAuthorizationHeader()
      },
      params: {
        guid: conversationId
      }
    }
  );
}
