'use static';

import Axios from 'axios';

import { SessionStorage } from '../util/tool';


// 取消请求
// const { CancelToken } = Axios;

const api = Axios.create({
  baseURL: 'api',
  timeout: 30000,
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  // 添加 token
  const token = SessionStorage.get('token');
  if (token) {
    config.headers.token = token;
  }
  // // 添加取消请求方法
  // config.cancelToken = new CancelToken(((c) => {
  //   config.cancel = c;
  // }));
  return config;
}, (error) => Promise.reject(error));

// 添加响应拦截器
api.interceptors.response.use((response) => {
  // 更新 token
  if (response.headers.token) {
    SessionStorage.set({ token: response.headers.token });
  } else {
    SessionStorage.del('token');
  }
  return response.data;
}, (error) => {
  // 无权限访问返回登录页面
  if (error.response.status === 403) window.location.href = '/login';
  console.log(window.location);
  return Promise.reject(error.message);
});

export default api;
