// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import { AjaxPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import 'babel-polyfill'

Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Vuex)

//let token = window.android.getToken()
//window.android.toast(token)
//sessionStorage.setItem('token', token)
sessionStorage.setItem('token', '58ACE8B5203D20E1B094AC6D964E6EEBE27C58AC3F638D4EC697E72D91409A10')
Vue.http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
localStorage.setItem('http', 'http://yyjapptest.log56.com/yyj_app_server/')
//localStorage.setItem('http', 'http://220.178.7.50:20226/yyj_app_server/')

Vue.http.defaults.baseURL = localStorage.getItem('http')

FastClick.attach(document.body)

Vue.config.productionTip = false

//const store = new Vuex.Store({}) // 这里你可能已经有其他 module
//
//store.registerModule('vux', { // 名字自己定义
//state: {
//  isLoading: false
//},
//mutations: {
//  updateLoadingStatus (state, payload) {
//    state.isLoading = payload.isLoading
//  }
//}
//})

//router.beforeEach(function(to, from, next) {
//	store.commit('updateLoadingStatus', {
//		isLoading: true
//	})
//	next()
//})
//
//router.afterEach(function(to) {
//	store.commit('updateLoadingStatus', {
//		isLoading: false
//	})
//})

/* eslint-disable no-new */
window.myvue = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')

//调转路由
window.goRoute = function(path) {
	//	window.myvue._router.push(path)
	router.push(path)
}

//运力删除
window.yunliDeleItem = function(id) {
	let token = sessionStorage.getItem('token')
	Vue.http.get('driver/html/get/v1/driver_delete/' + id + '?token=' + token)
		.then((res) => {
			console.log(res)
			if(res.data.result.reCode === '0') {
				myvue.$vux.toast.text('删除成功')
				setTimeout(() => {
					router.go(0)
				}, 500)
			} else {
				myvue.$vux.toast.text(res.data.result.reInfo)
			}
		})
}

//判断是否是第一个路由
Vue.prototype.$setgoindex = function() {
	//console.log(window.history.length)
	if(window.history.length <= 1) {
		if(location.href.indexOf('?') === -1) {
			window.location.href = location.href + '?goindex=true'
		} else if(location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
			window.location.href = location.href + '&goindex=true'
		}
	}
}

//console.log(myvue._router.options.routes[6])