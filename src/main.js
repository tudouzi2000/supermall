import Vue from 'vue'
import App from './App.vue'
import router from './router/inedx'

Vue.config.productionTip = false
/* 在vue的原型里添加事件总线 */
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
