import App from './App'
import ajax from './commons/js/request.js' 
import Vue from 'vue'
import router from './router'

import {RouterMount} from 'uni-simple-router';
// 引入socket
import io from './commons/plugins/weapp.socket.io.js'

Vue.prototype.$ajax = ajax

// Vue.prototype.$router = router
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$socket = io('http://192.168.0.118:8090')

const app = new Vue({
    ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
