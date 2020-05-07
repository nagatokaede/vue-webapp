'use static';

import Vue from 'vue';
import Router from 'vue-router';

// import { SessionStorage } from '../util/tool';

Vue.use(Router);

const route = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
  }, {
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
  console.info(to, from);
  next();
});

export default route;
