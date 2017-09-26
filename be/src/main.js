import Vue from 'vue'
import 'babel-polyfill'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import { AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'

Vue.use(Vuex)

Vue.use(VueLazyload, {
	loading: require('../static/logo.png')
})

Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

const store = new Vuex.Store({
	state: {
		editting: false
	},
	mutations: {
		edit(state) {
			// 变更状态
			state.editting = !state.editting
		},
		cancelEdit(state) {
			state.editting = false
		}
	}
})

Vue.filter('formDate', function(value) {
	const newDate = new Date()
	value = parseInt(value)
	newDate.setTime(value * 1000)
	return newDate.toLocaleDateString()
})

localStorage.setItem('httpUrl', 'http://aifengxiang.hfrjkf.cn/')
//localStorage.setItem('httpUrl', 'http://afx.hfrjkf.cn/')
Vue.http.defaults.baseURL = localStorage.getItem('httpUrl')
Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
//Vue.http.defaults.headers.get['Access-Control-Max-Age'] = 3628800
sessionStorage.setItem('city', '')
sessionStorage.setItem('cityPosition', '')
sessionStorage.setItem('counties', '')

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')

//自动登录
if(localStorage.getItem('phone') && localStorage.getItem('psw')) {
	Vue.http.get('getData/index.php?m=home&c=Form&a=usercenter_Login', {
			params: {
				seachdata: {
					'username': localStorage.getItem('phone'),
					'password': localStorage.getItem('psw')
				}
			}
		})
		.then((res) => {
			if(res.data.result === 1) {
				sessionStorage.setItem('token', res.data.data[0].token)
				localStorage.setItem('avatar', res.data.data[0].avatar)
				localStorage.setItem('mobile', res.data.data[0].mobile)
				localStorage.setItem('nickname', res.data.data[0].nickname)
				localStorage.setItem('openid', res.data.data[0].openid)
				Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
			}
			console.log(res)
		})
}