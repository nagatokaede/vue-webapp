<template>
    <div class="home">
        <van-image v-for="(img, index) in imageList" width="100%" lazy-load :src="img" :key="index"/>
    </div>
</template>

<script>
import Vue from 'vue';

import { Lazyload } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
Vue.use(Lazyload);

export default {
  name: 'Home',

  data() {
    return {
      imageList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg',
        'https://img.yzcdn.cn/vant/apple-5.jpg',
        'https://img.yzcdn.cn/vant/apple-6.jpg',
      ],
    };
  },
}
</script>

<style scoped>
    img {
        width: 100%;
    }
</style>
