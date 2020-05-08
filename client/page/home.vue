<template>
    <div class="home">
        <van-image v-for="(img, index) in imageList" width="100%" lazy-load :src="img" :key="index"/>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import api from '../api';

import { Lazyload, Image as VanImage, Notify } from 'vant';

Vue.use(Notify);
Vue.use(VanImage);
Vue.use(Lazyload);

export default {
  name: 'Home',

  data() {
    return {
      imageList: [
        // 'https://img.yzcdn.cn/vant/apple-1.jpg',
        // 'https://img.yzcdn.cn/vant/apple-2.jpg',
        // 'https://img.yzcdn.cn/vant/apple-3.jpg',
        // 'https://img.yzcdn.cn/vant/apple-4.jpg',
        // 'https://img.yzcdn.cn/vant/apple-5.jpg',
        // 'https://img.yzcdn.cn/vant/apple-6.jpg',
      ],
    };
  },

  methods: {
    ...mapActions('app', [
      'setTitle',
    ]),

    getIns(body) {
      return new Promise((resolve) => {
        api.post('/ins/search', body)
          .then(res => {
            if (res.status === 'SUCCEED') {
              resolve(res.data);
            } else {
              Notify({ type: 'warning', message: res.errorMessage });
            }
          })
          .catch(err => {
            Notify({ type: 'warning', message: err.toString() });
          });
      });
    },

    showInsImage() {
      this.getIns({ url: 'https://instagram.com/yuihorie_official?igshid=lt0m62z7fqmx' }).then(res => {
        this.imageList = res.urls;
      });
    },
  },

  created() {
    this.setTitle('堀江由衣');
    this.showInsImage();
  }
}
</script>

<style scoped>
    img {
        width: 100%;
        min-height: 100px;
    }
</style>
