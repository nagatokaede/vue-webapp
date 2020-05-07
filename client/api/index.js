'use static';

import Axios from 'axios';

import { SessionStorage } from '../util/tool';


// 取消请求
// let CancelToken = Axios.CancelToken;

const api = Axios.create({
  baseURL: 'api',
  timeout: 3000,
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  const token = SessionStorage.get('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
}, (error) => Promise.reject(error));

// 添加响应拦截器
api.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.headers.token) {
    SessionStorage.set({ token: response.headers.token });
  }
  return response.data;
}, (error) => Promise.reject(error));

export default api;
