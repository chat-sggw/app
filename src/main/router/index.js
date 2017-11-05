import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import(/* webpackChunkName: "LandingPage" */ '@/components/LandingPage')
    },
    {
      path: '/other',
      name: 'other-page',
      component: () => import(/* webpackChunkName: "OtherPage" */ '@/components/OtherPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
