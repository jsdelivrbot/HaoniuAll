// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import pub from './components/pub'
import Login from './components/login'
import Reg from './components/reg'
import About from './components/about'
import Feedback from './components/feedback'
import Generalize from './components/generalize'
import orderEvaluation from './components/orderEvaluation'
import orderAffirm from './components/orderaffirm'
import orderpay from './components/orderpay'
import usercenter from './components/usercenter'
import collect from './components/collect'
import Index from './components/index'
import myOrder from './components/myorder'
import getRecord from './components/getrecord'
import tuiguang from './components/tuiguang'
import tixian from './components/tixian'
import tuiguangma from './components/tuiguangma'
import dou from './components/dou'
import coupon from './components/coupon'
import coupondetail from './components/coupondetail'
import searchlist from './components/searchlist'
import coursedetail from './components/coursedetail'
import jigoudetail from './components/jigoudetail'
import orderdetail from './components/orderdetail'
import dourecord from './components/dourecord'
import successpay from './components/successpay'
import newsdetail from './components/newsdetail'
import vaguesearch from './components/vaguesearch'
import newslist from './components/newslist'
import mapes from './components/mapes'
import tuijianlist from './components/tuijianlist'
import compact from './components/compact'
import resetpassword from './components/resetpassword'
import setuserinfo from './components/setuserinfo'
import resetusername from './components/resetusername'
import uploadimg from './components/uploadimg'
import forget from './components/forget'
import addchildreninfo from './components/addchildreninfo'
import childrenlist from './components/childrenlist'
import invite from './components/invite'
import invitereg from './components/invitereg'
import coursesort from './components/coursesort'

import maps from './components/map'
import BaiduMap from 'vue-baidu-map'
import { querystring, AjaxPlugin, AlertPlugin, WechatPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(AjaxPlugin)
Vue.use(querystring)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(BaiduMap, {
	ak: 'Z8Oh2BjN3e3a0bZ7EUoUYiY9fpNTFxtP'
})

Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
Vue.http.defaults.headers.common['token'] = sessionStorage.getItem('token')
//localStorage.setItem('localhttp', 'http://wx.dianke8.com/xxdk/app')
//localStorage.setItem('localhttp', 'http://dev.dianke8.com:7000/xxdk/app')
//Vue.http.defaults.baseURL = 'http://dev.dianke8.com:7000/xxdk/app'
Vue.http.defaults.baseURL = 'http://wx.dianke8.com/xxdk/app'
const routes = [{
		path: '/coursesort',
		component: coursesort
	},
	{
		path: '/invitereg',
		component: invitereg
	},
	{
		path: '/invite',
		component: invite
	}, {
		path: '/newslist',
		component: newslist
	},
	{
		path: '/childrenlist',
		component: childrenlist
	},
	{
		path: '/addchildreninfo',
		component: addchildreninfo
	},
	{
		path: '/forget',
		component: forget
	},
	{
		path: '/uploadimg',
		component: uploadimg
	},
	{
		path: '/resetpassword',
		component: resetpassword
	},
	{
		path: '/resetusername',
		component: resetusername
	},
	{
		path: '/setuserinfo',
		component: setuserinfo
	},
	{
		path: '/login',
		component: Login
	}, {
		path: '/reg',
		component: Reg
	},
	{
		path: '/compact',
		component: compact
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/mapes/:id',
		component: mapes
	},
	{
		path: '/tuijianlist',
		component: tuijianlist
	},
	{
		path: '/vaguesearch',
		component: vaguesearch
	},
	{
		path: '/feedback',
		component: Feedback
	}, {
		path: '/generalize',
		component: Generalize
	},
	{
		path: '/maps/:lg',
		component: maps
	},
	{
		path: '/orderdetail/:id',
		component: orderdetail
	},
	{
		path: '/successpay/:id',
		component: successpay
	},
	{
		path: '/newsdetail/:id',
		component: newsdetail
	},
	{
		path: '/dourecord',
		component: dourecord
	},
	{
		path: '/orderevaluation/:id',
		component: orderEvaluation
	}, {
		path: '/orderaffirm/:name',
		component: orderAffirm
	}, {
		path: '/orderpay/:id',
		component: orderpay
	}, {
		path: '/myorder',
		component: myOrder
	},
	{
		path: '/tuiguang',
		component: tuiguang,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/coupon',
		component: coupon,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/coupondetail/:id',
		component: coupondetail
	},
	{
		path: '/jigoudetail/:name',
		component: jigoudetail
	},
	{
		path: '/getrecord',
		component: getRecord
	},
	{
		path: '/tuiguangma',
		component: tuiguangma,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/tixian',
		component: tixian
	}, {
		path: '/dou',
		component: dou,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/coursedetail/:name',
		component: coursedetail
	},
	{
		path: '/searchlist/:name',
		component: searchlist
	},
	{
		path: '*',
		component: pub,
		children: [{
			path: '/pub/usercenter',
			component: usercenter,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/pub/collect',
			component: collect,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/pub/home',
			component: Index
		}]
	}
]

if(localStorage.getItem('loginname') !== null) {
	Vue.http.get('/login', {
		params: {
			phone: localStorage.getItem('loginname'),
			password: localStorage.getItem('loginpwd'),
			openId: localStorage.getItem('loginopenid')
		}
	}).then(
		(res) => {
			if(res.data.result === 0) {
				sessionStorage.setItem('token', res.data.obj.token)
				localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
				Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
				Vue.http.defaults.headers.post['token'] = sessionStorage.getItem('token')
			} else {
				localStorage.removeItem('loginname')
				localStorage.removeItem('loginpwd')
				localStorage.removeItem('loginopenid')
			}
		}
	)
}

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if(!sessionStorage.getItem('token')) {
			sessionStorage.setItem('path', to.path)
			if(!localStorage.getItem('loginname')) {
				Vue.$vux.alert.show({
					title: '提示',
					content: '您还没有登录,请先登录!',
					onHide() {
						next({
							path: '/login'
						})
					}
				})
			} else {
				next()
			}
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
const vm = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')