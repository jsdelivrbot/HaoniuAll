// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import { AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

import Exmui from '../static/js/exmui'
Vue.use(Exmui)

//设置版本号
localStorage.setItem('version', '1.0.0')

localStorage.setItem('http', process.env.API_HTTP)
Vue.http.defaults.withCredentials = true
Vue.http.defaults.baseURL = localStorage.getItem('http')
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
//请求拦截器
Vue.http.interceptors.response.use(function(response) {
	//	console.log(response)
	if(response.data.result !== 0) {
		Vue.$vux.toast.text(response.data.msg, 'middle')
	}
	return response
}, function(error) {
	Vue.$vux.toast.text('接口有问题有问题!', 'middle')
	return Promise.reject(error)
})

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
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')