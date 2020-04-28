'use static';

import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: function render(h) {
    return h(App);
  },
}).$mount('#app');
