import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
//导入vuex
import store from './store'
Vue.config.productionTip = false

import axios from 'axios'

import VueCookie from 'js-cookie'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import datePicker from "./directive/datePicker.js" 
Vue.use(datePicker)

import preventReClick from './directive/preventReClick'
Vue.use(preventReClick)

Vue.use(VueCookie)

Vue.prototype.$axios=axios

Vue.prototype.$store=store

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



 