<template>
    <div class="login">
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="userName" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"/>
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"/>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import api from '../api';

import logo from '../asset/image/kaede.png';

import { Button, Form, Image as VanImage, Field, Notify } from 'vant';

Vue.use(Notify);
Vue.use(Field);
Vue.use(Form);
Vue.use(VanImage);
Vue.use(Button);
export default {
  name: 'login',
  
  data() {
    return {
      logo,
  
      username: '',
      password: '',
    };
  },
  
  methods: {
    ...mapActions('app', [
      'setTitle',
    ]),
    
    login(body) {
      return new Promise((resolve) => {
        api.post('/admin/login', body).then(res => {
          if (res.status === 'SUCCEED') {
            resolve(res.data);
          } else {
            Notify({ type: 'warning', message: res.errorMessage });
          }
        }).catch(err  => {
          Notify({ type: 'warning', message: err });
        });
      });
    },

    onSubmit(values) {
      this.login(values).then(() => {
        this.$router.push({path: '/home'});
      });
    },
  },
  
  created() {
    this.setTitle('登陆');
  }
}
</script>

<style lang="less" scoped>
    .login {
        height: calc(100% - 46px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

<style lang="less">
    .van-cell {
        background-color: rgba(0,0,0,0);
    }
</style>
