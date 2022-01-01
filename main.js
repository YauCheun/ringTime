import App from './App'
import ajax from './commons/js/request.js' 
import Vue from 'vue'
Vue.prototype.$ajax = ajax
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
