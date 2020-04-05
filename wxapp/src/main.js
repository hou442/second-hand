import Vue from 'vue'
import App from './App'
import store from './store/index';
import axios from 'axios';
import https from './utils/https'
import interfaces from './utils/interfaces'


Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.$https = https;
Vue.prototype.$interfaces = interfaces;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
