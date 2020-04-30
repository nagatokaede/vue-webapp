<template>
    <div class="header">
        <van-nav-bar :title="getTitle" left-arrow fixed @click-left="onClickReturn" @click-right="onClickEllipsis">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
    
        <van-popup v-model="ellipsis.state" get-container="body" position="left" :style="{ width: '40%', height: '100%' }">
            <!-- header -->
            <div class="user-image">
                <van-image round width="5rem" height="5rem" :src="logo"/>
            </div>
            <!-- content -->
            <van-cell-group>
                <van-cell v-for="(title, uri, index) in pages" :title="title" is-link @click="toPage(uri)" :key="index" />
            </van-cell-group>
            <!-- footer -->
<!--            <van-row>-->
<!--                <van-col span="24">-->
<!--                -->
<!--                </van-col>-->
<!--            </van-row>-->
        </van-popup>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { NavBar, Icon, Popup, Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(NavBar);

import logo from '../asset/image/kaede.png';

export default {
  name: 'na-header',
  
  data() {
    return {
      logo,

      ellipsis: {
        state: false,
        open: () => this.ellipsis.state = true,
        close: () => this.ellipsis.state = false,
      },
      
      pages: {
        login: '登陆',
        home: '主页',
      },
    };
  },
  
  computed: {
    ...mapGetters('app', [
      'getTitle'
    ]),
  },
  
  methods: {
    onClickReturn() {
      console.info('返回');
    },
    onClickEllipsis() {
      this.ellipsis.open();
    },

    toPage(path) {
      this.$router.push({ path });
      this.ellipsis.close();
    },
  },
}
</script>

<style lang="less" scoped>
    .header {
        height: 46px;
    }
</style>

<style lang="less">
    .van-nav-bar__left, .van-nav-bar__right {
        display: block;
        line-height: 36px;
    }
    
    .user-image {
        margin: 20px;
        .van-image--round {
            display: block;
            margin: 0 auto;
            border: 1px solid;
        }
    }
</style>
