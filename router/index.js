// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
Vue.use(Router)

try {
	//初始化
	var router = new Router({
		routes: [...modules] //路由表
	});
	const whiteList = ['/pages/login/login', '/pages/register/register']
	//全局路由前置守卫
	router.beforeEach((to, from, next) => {
		let info = uni.getStorageSync('userinfo')
		const hasToken = info && info.token
		if(to.path === '/pages/login/login'){
			uni.clearStorage()
			next()
		}
		if (!hasToken && !whiteList.includes(to.path)) {
			next({
				path: '/pages/login/login'
			})
		} else {
			next()
		}
	})
} catch (e) {}

// // 全局路由后置守卫
// router.afterEach((to, from) => {
// })
export default router;
