'use static';

import Vue from 'vue';
import Router from 'vue-router';

import { SessionStorage } from '../util/tool';

Vue.use(Router);

const route = new Router({
  mode: 'history',
  routes: [{
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "group-home" */ '../page/home'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "group-login" */ '../page/login'),
  }],
});

route.beforeEach((to, from, next) => {
  if (to.name === 'login' || SessionStorage.get('token')) {
    next();
  } else {
    next('/login');
  }
});

export default route;
