// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import { AjaxPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import Exmui from '../static/js/exmui'
import 'babel-polyfill'

Vue.use(Exmui)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

localStorage.setItem('http', 'http://yqdsb.heivideo.com:8888/wmth')
Vue.http.defaults.baseURL = localStorage.getItem('http')
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	if(to.path !== '/login' && to.path !== '/reg' && to.path !== '/forget') {
		if(!sessionStorage.getItem('token')) {
			next('/login')
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})
/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')

if(localStorage.getItem('phone') && localStorage.getItem('password')) {
	Vue.http.get('/api/frontBase/user/login', {
		params: {
			phone: localStorage.getItem('phone'),
			password: localStorage.getItem('password')
		}
	}).then((res) => {
		if(res.data.result === 0) {
			let userInfo = JSON.stringify(res.data.obj)
			sessionStorage.setItem('userInfo', userInfo)
			Vue.http.defaults.headers.common['token'] = res.data.obj.token
			sessionStorage.setItem('token', res.data.obj.token)
			router.replace('/update')
		} else {
			router.replace('/login')
		}
	})
}