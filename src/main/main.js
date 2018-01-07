import Vue from 'vue';
import axios from 'axios';

import Vuetify from 'vuetify';
import 'mdi/css/materialdesignicons.css';

import moment from 'moment';
import VueMomentJS from 'vue-momentjs';

import App from './App';
import router from './router';
import store from './store';
import AlertCmp from './components/Shared/ErrorAlert.vue';
if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(Vuetify);

moment.locale(navigator.language);
Vue.use(VueMomentJS, moment);

Vue.component('app-alert', AlertCmp);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
