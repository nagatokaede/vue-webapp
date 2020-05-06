<template>
    <div id="app">
        <HeaderComponent></HeaderComponent>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderComponent from './component/header.vue';

import icon from './asset/image/kaede.ico';

export default {
  name: 'App',

  components: {
    HeaderComponent,
  },

  methods: {
    faviconInit() {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = icon;
      link.type = 'image/x-icon';

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
    },
  },

  mounted() {
    this.faviconInit();
  }
}
</script>

<style lang="less">
    body {
        background-image: url("./asset/image/bg.jpg");
    }
    #app {
        height: 100vh;
    }
</style>
