<template>
    <div class="login">
        <van-image width="100" height="100" :src="logo" />
    </div>
</template>

<script>
import Vue from 'vue';

import logo from '../asset/image/kaede.png';

import { Button } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
Vue.use(Button);
export default {
  name: 'login',
  
  data() {
    return {
      logo
    };
  },
}
</script>

<style scoped>

</style>
