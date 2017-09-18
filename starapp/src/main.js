// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

//first
import pub from './components/pub'

//guidance
import guidance from './components/guidance'

//pubcomponents
import Login from './components/pubcomponents/login'
import Reg from './components/pubcomponents/reg'
import Index from './components/pubcomponents/index'
import searchlist from './components/pubcomponents/searchlist'
import vaguesearch from './components/pubcomponents/vaguesearch'

//usercenter
import collect from './components/usercenter/collect'
import usercenter from './components/usercenter/usercenter'
import About from './components/usercenter/about'
import Feedback from './components/usercenter/feedback'
import Generalize from './components/usercenter/generalize'
import getRecord from './components/usercenter/getrecord'
import tixian from './components/usercenter/tixian'
import dou from './components/usercenter/dou'
import coupon from './components/usercenter/coupon'
import coupondetail from './components/usercenter/coupondetail'
import dourecord from './components/usercenter/dourecord'
import setuserinfo from './components/usercenter/setuserinfo'
import resetusername from './components/usercenter/resetusername'
import resetpassword from './components/usercenter/resetpassword'
import compact from './components/usercenter/compact'
import forget from './components/usercenter/forget'

//order
import myOrder from './components/order/myorder'
import orderEvaluation from './components/order/orderEvaluation'
import orderAffirm from './components/order/orderaffirm'
import orderdetail from './components/order/orderdetail'

//course
import coursedetail from './components/course/coursedetail'

//organization
import jigoudetail from './components/organization/jigoudetail'

//news
import newsdetail from './components/news/newsdetail'
import newslist from './components/news/newslist'

//map
import mapes from './components/map/mapes'
import maps from './components/map/map'

//pay
import orderpay from './components/pay/orderpay'
import successpay from './components/pay/successpay'
//child
import childrenlist from './components/child/childrenlist'
import addchildreninfo from './components/child/addchildreninfo'
import changeChildrenInfo from './components/child/changeChildrenInfo'

//tuiguang
import tuiguangma from './components/tuiguang/tuiguangma'
import tuiguang from './components/tuiguang/tuiguang'
import tuijianlist from './components/tuiguang/tuijianlist'

//timetable
import calendar from './components/timetable/calendar'
import kcb from './components/timetable/kcb'
import kcbtable from './components/timetable/kcbtable'
import videoDetail from './components/timetable/videoDetail'
import weekCalendar from './components/timetable/weekCalendar'
import msg from './components/timetable/msg'
import tips from './components/timetable/tips'
import databank from './components/timetable/databank'
import play from './components/timetable/play'
import play2 from './components/timetable/saveVideo'
import saveImg from './components/timetable/saveImg'

//pub
import invite from './components/invite'
import invitereg from './components/invitereg'
import bindinfo from './components/bindinfo'

import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {
	locale: 'zh'
})

import BaiduMap from 'vue-baidu-map'
import exmuis from './../static/exmui'
Vue.use(exmuis)
import { querystring, AjaxPlugin, AlertPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(querystring)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(BaiduMap, {
	ak: 'Z8Oh2BjN3e3a0bZ7EUoUYiY9fpNTFxtP'
})

Vue.http.defaults.withCredentials = true
localStorage.setItem('uploadUrl', 'http://wx.dianke8.com/xxdk/app')
Vue.http.defaults.baseURL = 'http://wx.dianke8.com/xxdk/app'
//Vue.http.defaults.baseURL = 'http://dev.dianke8.com:7000/xxdk/app'
//Vue.http.defaults.baseURL = 'http://192.168.1.121:8080/xingxingdianke/app'
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
Vue.http.defaults.headers.post['token'] = sessionStorage.getItem('token')
//import VueAwesomeSwiper from 'vue-awesome-swiper'
//Vue.use(VueAwesomeSwiper)
Vue.http.interceptors.response.use(function(response) {
	return response
}, function(error) {
	Vue.$vux.loading.hide()
	return Promise.reject(error)
})

const routes = [{
		path: '/bindinfo/:id',
		component: bindinfo
	},
	{
		path: '/invitereg',
		component: invitereg
	},
	{
		path: '/invite',
		component: invite
	}, {
		path: '/guidance',
		component: guidance
	},
	{
		path: '/',
		redirect: '/guidance'
	},
	{
		path: '/saveImg/:id/:childrenId/:timetableId',
		component: saveImg
	},
	{
		path: '/play2/:id/:childrenId/:timetableId',
		component: play2
	},
	{
		path: '/play/:id',
		component: play
	},
	{
		path: '/databank/:childid/:timetableid',
		component: databank
	},
	{
		path: '/changeChildrenInfo/:id',
		component: changeChildrenInfo
	},
	{
		path: '/forget',
		component: forget
	},
	{
		path: '/tips/:id/:childid',
		component: tips
	},
	{
		path: '/msg/:childid/:timetableId',
		component: msg
	},
	{
		path: '/videoDetail/:url',
		component: videoDetail
	},
	{
		path: '/setuserinfo',
		component: setuserinfo,
		meta: {
			requiresAuth: true
		}
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
		path: '/newslist',
		component: newslist
	}, {
		path: '/addchildreninfo',
		component: addchildreninfo
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/reg',
		component: Reg
	},
	{
		path: '/childrenlist',
		component: childrenlist
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
		component: tuiguangma
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
	}, {
		path: '/collect',
		component: collect
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
			path: '/pub/kcb',
			component: kcb,
			redirect: '/pub/kcb/timeline/default',
			children: [{
					path: '/pub/kcb/timeline/:id',
					component: kcbtable,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/pub/kcb/weekCalendar/:id',
					component: weekCalendar,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/pub/kcb/calendar/:id',
					component: calendar,
					meta: {
						requiresAuth: true
					}
				}
			],
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/pub/home',
			component: Index
		}]
	}
]
if(localStorage.getItem('loginname') !== '') {
	if(!localStorage.getItem('loginname')) {} else {
		Vue.http.get('/login', {
			params: {
				phone: localStorage.getItem('loginname'),
				password: localStorage.getItem('loginpwd')
			}
		}).then(
			(res) => {
				console.log(JSON.stringify(res.data))
				if(res.data.result === 0) {
					localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
					sessionStorage.setItem('token', res.data.obj.token)
					Vue.http.defaults.headers.post['token'] = sessionStorage.getItem('token')
					Vue.http.defaults.headers.get['token'] = sessionStorage.getItem('token')
				} else {
					localStorage.removeItem('loginname')
					localStorage.removeItem('loginpwd')
					localStorage.removeItem('loginopenid')
					localStorage.removeItem('userinfos')
				}
			}
		)
	}
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

Vue.config.productionTip = true

/* eslint-disable no-new */
const vm = new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')