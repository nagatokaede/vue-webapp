'use static';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import VConsole from 'vconsole';

Vue.config.productionTip = false;

// new VConsole();

new Vue({
  render: h => h(App),
  router, // router 不能使用别名
  store,
}).$mount('#app');
