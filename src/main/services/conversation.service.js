import axios from 'axios';
import { getAuthorizationHeader } from './auth.service';
import { apiUrl } from '../config';

export function getConversation(conversationId, afterMessageId) {
  const params = afterMessageId !== undefined ? {
    afterMessage: afterMessageId
  } : undefined;

  return axios.get(
    `${apiUrl}/api/conversation/${conversationId}`,
    {
      headers: {
        Authorization: getAuthorizationHeader()
      },
      params
    }
  )
    .then(response => response.data);
}

export function sendMessage(conversationId, text) {
  return axios.post(
    `${apiUrl}/api/conversation/${conversationId}/send`,
    {
      text
    },
    {
      headers: {
        Authorization: getAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => response.data);
}
