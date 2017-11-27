// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { AjaxPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import exmui from '../static/js/exmui.js'
import 'babel-polyfill'

Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(exmui)

localStorage.setItem('http', 'http://yqdsb.heivideo.com:8888/wmth')
Vue.http.defaults.baseURL = localStorage.getItem('http')
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
const myvue = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')

if(localStorage.getItem('work_phone') && localStorage.getItem('work_password')) {
	myvue.$vux.loading.show({
		text: '正在登录'
	})
	let clientid
	let cilentype
	myvue.$CgetCID((res) => {
		clientid = res
	})
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	if(isAndroid) {
		cilentype = '0'
	}
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isiOS) {
		cilentype = '1'
	}
	Vue.http.get('/api/frontBase/user/login', {
		params: {
			phone: localStorage.getItem('work_phone'),
			password: localStorage.getItem('work_password'),
			clientid: clientid,
			cilentype: cilentype
		}
	}).then((res) => {
		if(res.data.result === 0) {
			let userInfo = JSON.stringify(res.data.obj)
			sessionStorage.setItem('userInfo', userInfo)
			sessionStorage.setItem('token', res.data.obj.token)
			Vue.http.defaults.headers.common['token'] = res.data.obj.token
			if(myvue.$route.query.redirect) {
				router.replace(myvue.$route.query.redirect)
			} else {
				router.replace('/home')
			}
			myvue.$vux.loading.hide()
			Vue.http.get('/api/frontBase/user/findUserDetail')
				.then((res) => {
					if(res.data.result === 0) {
						let departmentName = res.data.obj.departmentName
						sessionStorage.setItem('departmentName', departmentName)
					}
				})
		} else {
			router.replace('/login')
		}
	})
}

router.afterEach(function(to) {
	setTimeout(function() {
		myvue.$vux.loading.hide()
	}, 500)
})

document.addEventListener('plusready', function() {
	plus.push.addEventListener('click', function(msg) {
		switch(msg.payload) {
			case 'LocalMSG':
				break;
			default:
				break;
		}
		let id = JSON.parse(msg.aps.category).id
		router.push('/detail/' + id)
	}, false);
	plus.push.addEventListener('receive', function(msg) {
		if(msg.aps) {
		} else {}
		let id = JSON.parse(msg.payload).id
		router.push('/detail/' + id)
	}, false);
}, false);