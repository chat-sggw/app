/* eslint-disable max-len */
import Vue from 'vue';
import axios from 'axios';

/*
1. Rejestracja do tokena na konto:

{
  "email": "test3@wp.pl",
  "password": "1qaz@WSX",
  "login": "Test1"
}
*/
Vue.use(axios);
const token = '6vnKtvDd5R5BWhtp4NqzF3vzFMVfI9nm_51uOupErX2Q7-R3-U0mY_rZaKSTNLniEk9KXk3dnCh8qE6uamASV1m1rKUV6QxKHzvZLkC1caLXfuYWbqSekM0UhZ3_h_WryFHKutxDfDocVT2HmFP69s5Cll0THhqI9k6hvo8PZekznndlxhJZrz88De6cicIKTBl3AlenZSUgegFLU_v9HH7QYwZW2TJer9N8dfVPeww34xOKi4MGKgJ9SfMTOvUIO9yHIhZcP9sTfWbeC_Z2rIE_vhg4Q_CWftTIaT0W3ZOtAYN220n4H9mgkWzG4ekP-jXw47HLMdSpOIGtfIUbjF1SFpJYAK-qT8v2Q2P8Wr-PN__mdicxILuS0Y8bLwP6mwVMwwXubHO75dg5sD_pXCNYjs-qRMqeFCv_RWq2NrKKmddnP5GXdsbUOfoRmfTsgJCLWTsqBs6y_7DfB2sOF3YdyQH5n1Obyq05XtVUpGc';

export function fetchContactsApi() {
  return axios.get(
    'http://chatsggw-001-site1.ctempurl.com/api/user/friends',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchConversationApi(conversationId) {
  return axios.get(
    `http://chatsggw-001-site1.ctempurl.com/api/conversation/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        guid: conversationId
      }
    }
  );
}
