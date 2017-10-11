import Vue from 'vue'
import 'babel-polyfill'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import exmui from '../static/js/exmui'
import { AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'

Vue.use(Vuex)
Vue.use(exmui)

Vue.use(VueLazyload, {
	loading: require('../static/logo.png')
})

Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

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

//FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')

//自动登录
if(!sessionStorage.getItem('token')) {
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
				//			console.log(res.data.data[0].ali_pay_phone)
				if(res.data.result === 1) {
					sessionStorage.setItem('token', res.data.data[0].token)
					localStorage.setItem('avatar', res.data.data[0].avatar)
					localStorage.setItem('mobile', res.data.data[0].mobile)
					localStorage.setItem('nickname', res.data.data[0].nickname)
					localStorage.setItem('openid', res.data.data[0].openid)
					localStorage.setItem('ali_pay_phone', res.data.data[0].ali_pay_phone)
					localStorage.setItem('sex_type', res.data.data[0].sex_type || '')
					localStorage.setItem('age_area', res.data.data[0].age_area || '')
					localStorage.setItem('hy_area', res.data.data[0].hy_area || '')
					localStorage.setItem('hbt_list', res.data.data[0].hbt_list || '')
					Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
				}
				console.log(res)
			})
	}
}