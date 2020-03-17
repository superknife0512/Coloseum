import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 5000,
});

Vue.prototype.$axios = axiosInstance;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
