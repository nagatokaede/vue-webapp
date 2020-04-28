<template>
    <div class="header">
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow
                @click-left="onClickLeft" @click-right="onClickRight">
        </van-nav-bar>
    </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, NavBar } from 'vant';

Vue.use(NavBar);
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: 'na-header',
  
  data() {
    return {
      title: 'home',
    };
  },
  
  methods: {
    onClickLeft() {
      console.info('返回');
    },
    onClickRight() {
      console.info('按钮');
    },
  },
}
</script>

<style scoped>

</style>
