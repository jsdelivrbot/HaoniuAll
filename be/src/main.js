import Vue from 'vue'
import 'babel-polyfill'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import Vuex from 'vuex'
import exmui from '../static/js/exmui'
import { AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'

Vue.use(Vuex)
Vue.use(exmui)
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
sessionStorage.setItem('province', '')
sessionStorage.setItem('city', '')
sessionStorage.setItem('cityPosition', '')
sessionStorage.setItem('counties', '')

//FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
let myvue = new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')

//自动登录
if(!localStorage.getItem('token')) {
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
					localStorage.setItem('id', res.data.data[0].id)
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
} else {
	let token = localStorage.getItem('token')
	sessionStorage.setItem('token', token)
	Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
}

//判断是否显示全部
Vue.http.get('getData/index.php?m=home&c=Form&a=showMenu', {
	params: {
		seachdata: {
			versions: '1.0101'
		}
	}
}).then((res) => {
	//		console.log(res)
	if(res.data.result === 0) {
		sessionStorage.setItem('showAll', '0')
	} else {
		sessionStorage.setItem('showAll', '1')
	}
})

// 监听plusready事件
document.addEventListener('plusready', function() {
	// 监听点击消息事件
	plus.push.addEventListener('click', function(msg) {
		// 判断是从本地创建还是离线推送的消息
		switch(msg.payload) {
			case 'LocalMSG':
				break;
			default:
				break;
		}
		let type = msg.payload.type
		let id = msg.payload.id
		if(type === 'task') {
			router.push('/task/detail/' + id)
		}
		if(type === 'article') {
			router.push('/hotArticle/detail/' + id)
		}
		if(type === 'share') {
			router.push('/ShoppingDetail/' + id)
		}
		//		if(id.substring(0, 4) === 'task') {
		//			router.push('/task/detail/' + id.substring(4))
		//		}
		//		if(id.substring(0, 7) === 'article') {
		//			router.push('/hotArticle/detail/' + id.substring(7))
		//		}
		//		if(id.substring(0, 5) === 'share') {
		//			router.push('/ShoppingDetail/' + id.substring(5))
		//		}
	}, false);
	// 监听在线消息事件
	plus.push.addEventListener('receive', function(msg) {
		if(msg.aps) { // Apple APNS message
		} else {}
		let type = JSON.parse(msg.payload).type
		let id = JSON.parse(msg.payload).id
		if(type === 'task') {
			router.push('/task/detail/' + id)
		}
		if(type === 'article') {
			router.push('/hotArticle/detail/' + id)
		}
		if(type === 'share') {
			router.push('/ShoppingDetail/' + id)
		}
		//		if(id.substring(0, 4) === 'task') {
		//			router.push('/task/detail/' + id.substring(4))
		//		}
		//		if(id.substring(0, 7) === 'article') {
		//			router.push('/hotArticle/detail/' + id.substring(7))
		//		}
		//		if(id.substring(0, 5) === 'share') {
		//			router.push('/ShoppingDetail/' + id.substring(5))
		//		}
	}, false);
}, false);

let versions
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
if(isAndroid) {
	versions = '2'
}
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isiOS) {
	versions = '1'
}

let version = '1.03'

Vue.http.get('getData/index.php/home/Form/app_versions_up', {
	params: {
		seachdata: {
			versions_type: versions,
			version: version
		}
	}
}).then((res) => {
	//	console.log(res)
	if(res.data.result === 1) {
		myvue.$vux.alert.show({
			title: '提示',
			content: res.data.message,
			onHide() {
				myvue.$CopenUrl(res.data.data.link)
			}
		})
	}
})