'use static';

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const route = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: () => import('@/page/home.vue'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login.vue'),
  }],
});

route.beforeEach((to, from, next) => {
  console.info(to, from);
  next();
});

export default route;
