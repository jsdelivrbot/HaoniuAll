// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import { AjaxPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin, DatetimePlugin } from 'vux'
import 'babel-polyfill'

Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)
Vue.use(Vuex)

//let token = window.android.getToken()
//window.android.toast(token)
//sessionStorage.setItem('token', token)
//sessionStorage.setItem('token', '58ACE8B5203D20E1B094AC6D964E6EEBE27C58AC3F638D4EC697E72D91409A10')
//sessionStorage.setItem('token', '38842684BAFBBD3E4D1B3F1A5F85980CFED6878A2445EA346B3069B1DCB4276D')
//sessionStorage.setItem('token', 'AF14FDD70BC6457B6942B27D65A4FB9BEBDB9BEB7A931003AE9C9D48E8E6138D')
//sessionStorage.setItem('token', '5A539F0D49F35A23FFBEB577144EE8D1A4B4AE5788431793B348959B60085D7C')
sessionStorage.setItem('token', '0DC52E2AFF64B5BB6763A3E17AD2B825A91EFDB1BE4C1D870BBF5E8E3E215C1B')
//sessionStorage.setItem('token', '1D7F9B7F8E4D2620B0CF54AB3AA7B82A00068B820BADBEB483843EBA27721DFC')

Vue.http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
localStorage.setItem('http', 'http://yyjapptest.log56.com/yyj_app_server/')
//localStorage.setItem('http', 'http://220.178.7.50:20226/yyj_app_server/')

Vue.http.defaults.baseURL = localStorage.getItem('http')

//判断token是否失效
Vue.http.interceptors.response.use(function(res) {
	if(res.data.result.reCode === '2000') {
		window.android.rel_token()
		return
	}
	return res
}, function(err) {
	//Do something with response error
	return Promise.reject(err)
})

FastClick.attach(document.body)

Vue.config.productionTip = false

//权限方法
let power = 'CAP_TRAARCH_DRINFO_BTN, CAP_TRAARCH_TRUINFO_BTN, DIS_RSHUNT_BTN, TRA_ONPASS_MODBILL_BTN, TRA_ONPASS_CONARR_BTN, TRA_ONPASS_OPEREC_BTN, TRA_ARR_CONREC_BTN, TRA_ARR_EVA_BTN, TRA_ARR_OPEREC_BTN, TRA_SIGN_OPEREC_BTN, TRA_BILLDET_SIGNDET_BTN, TRA_BILLDET_HISTRAT_BTN, TRA_BILLDET_LOC_BTN, TRA_BILLDET_CONARR_BTN, TRA_BILLDET_CONREC_BTN, DIS_YSEND_DEP_BTN, DIS_YSEND_MODBILL_BTN, DIS_YSEND_REMDEP_BTN, DIS_NSEND_VQUO_CONFI_BTN, DIS_NSEND_VQUO_BTN, FRE_APPLY_MODFRE_BTN, FRE_APPLY_APPLYFRE_BTN, FRE_APPLY_OPEREC_BTN, FRE_AUD_PASS_BTN, FRE_AUD_REJ_BTN, FRE_AUD_OPEREC_BTN, FRE_PAY_PAYME_BTN, FRE_PAY_OPEREC_BTN, FRE_PAY_ACCENTRY_BTN'
//let power = window.android.getPower()
//alert(power.indexOf('FRE_APPLY_APPLYFRE_BTN'))
//sessionStorage.setItem('power', power)
Vue.prototype.$power = function(value) {
	if(power.indexOf(value) === -1) {
		return false
	} else {
		return true
	}
}

//判断是否是第一个路由
Vue.prototype.$setgoindex = function() {
	if(window.history.length <= 1) {
		if(location.href.indexOf('?') === -1) {
			window.location.href = location.href + '?goindex=true'
		} else if(location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
			window.location.href = location.href + '&goindex=true'
		}
	}
}

/* eslint-disable no-new */
window.myvue = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')

router.beforeEach(function(to, from, next) {
	//	store.commit('updateLoadingStatus', {
	//		isLoading: true
	//	})
	myvue.$vux.loading.show({
		text: '加载中'
	})
	next()
})

router.afterEach(function(to) {
	myvue.$vux.loading.hide()
	myvue.$vux.confirm.hide()
})

//调转路由
window.goRoute = function(path) {
	//	window.myvue._router.push(path)
	router.push(path)
}

//重新获取token
window.refresh = function() {
	let token = window.android.getToken()
	sessionStorage.setItem('token', token)
	//	router.go(0)
	location.reload()
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
					$initYunLi.initData()
				}, 500)
			} else {
				myvue.$vux.toast.text(res.data.result.reInfo)
			}
		})
}

//console.log(myvue)