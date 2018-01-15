import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import GuestContainer from '../containers/guest';
import AuthenticatedContainer from '../containers/authenticated';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      meta: { requiresAuth: true },
      component: AuthenticatedContainer
    },
    {
      path: '/auth',
      component: GuestContainer,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "LoginPage" */ '@/containers/guest/Login')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "RegistrationPage" */ '@/containers/guest/Register')
        },
        {
          path: '',
          redirect: { name: 'login' }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});


router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      const user = await store.dispatch('reauthenticate');
      if (!user) {
        return next({ name: 'login' });
      }
    }
  }

  return next();
});

export default router;
