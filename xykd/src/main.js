// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import { AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

import Exmui from '../static/js/exmui'
Vue.use(Exmui)

//didi
import {
	/* eslint-disable no-unused-vars */
	Style,
	Dialog,
	ActionSheet,
	createAPI
} from 'cube-ui'

Vue.use(Dialog)
Vue.use(ActionSheet)

//设置版本号
localStorage.setItem('version', '1')
//本地测试IP
localStorage.setItem('http', process.env.API_HTTP)
//线上测试IP
localStorage.setItem('http', process.env.TEST_HTTP)
Vue.http.defaults.withCredentials = true
Vue.http.defaults.baseURL = localStorage.getItem('http')
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')

//请求拦截器
Vue.http.interceptors.response.use(function(response) {
	if(response.data.result.toString() === '-8') {
		Vue.$vux.alert.show({
			title: '提示!',
			content: '登录已过期,请重新登录',
			onHide() {
				sessionStorage.clear()
				globalVue.$router.replace('/login')
			}
		})
	}
	if(response.data.result !== 0) {
		Vue.$vux.toast.text(response.data.msg, 'middle')
	}
	return response
}, function(error) {
	Vue.$vux.toast.text('接口有问题有问题!', 'middle')
	return Promise.reject(error)
})
if(localStorage.getItem('autoLogin')) {
	if(!sessionStorage.getItem('token')) {
		Vue.http.post('api/user/autoLogin', {
			autoLogin: localStorage.getItem('autoLogin')
		}).then(
			(res) => {
				if(res.data.result === 0) {
					sessionStorage.setItem('token', res.data.obj.token)
					localStorage.setItem('userInfo', JSON.stringify(res.data.obj))
					localStorage.setItem('autoLogin', res.data.obj.autoLogin)
					Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
					globalVue.$router.replace('/borrowMoney')
				} else {
					localStorage.removeItem('autoLogin')
					mui.toast('自动登陆失败。。。')
				}
			}
		)
	}
}

router.beforeEach((to, from, next) => {
	if(to.path !== '/login' && to.path !== '/forget') {
		if(!sessionStorage.getItem('token')) {
			next('/login')
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
const globalVue = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')