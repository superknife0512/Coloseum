import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const axiosInstance = axios.create({
  baseURL: 'http://178.128.31.202:1205/api/',
  timeout: 5000,
});

Vue.prototype.$axios = axiosInstance;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
