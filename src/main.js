import Vue from 'vue'
import App from './App.vue'
import vueImgView from './lib/index.js'

Vue.use(vueImgView)

new Vue({
  el: '#app',
  render: h => h(App)
})
