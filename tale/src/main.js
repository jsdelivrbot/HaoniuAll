// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/pub'
import home from './components/home'
import login from './components/login'
import reg from './components/reg'
import find from './components/find'
import ranking from './components/ranking'
import usercenter from './components/usercenter'
import newslist from './components/newslist'
import comment from './components/pl'
import collect from './components/collect'
import integral from './components/integral'
import feedback from './components/feedback'
import newsdetail from './components/newsdetail'
import newsdetailSingle from './components/newsdetailSingle'
import userinfo from './components/userinfo'
import commentlist from './components/commentlist'
import about from './components/about'
import changepwd from './components/changepwd'
import Vuex from 'vuex'
import feedback2 from './components/feedback2'
import search from './components/search'
import guide from './components/guide'
import wechat from './components/wechat'
import ifm from './components/ifm'
import ifm2 from './components/ifm2'
import changeusername from './components/changeusername'
import integralrule from './components/integralrule'
import goodsay from './components/goodsay'
import regxy from './components/regxy'

import { AjaxPlugin, AlertPlugin, ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.http.defaults.headers.get['token'] = localStorage.getItem('token')

const store = new Vuex.Store({
	state: {
		isLoading: false
	},
	mutations: {
		updateLoadingStatus(state, payload) {
			state.isLoading = payload.isLoading
		}
	}
}) // 这里你可能已经有其他 module
localStorage.setItem('http', 'http://xcqct.kjs999.com:8080')

const routes = [{
		path: '/pub',
		component: Home,
		children: [{
			path: '/pub/job',
			component: home
		}, {
			path: '/pub/find',
			component: find
		}, {
			path: '/pub/ranking',
			component: ranking,
			meta: {
				needLoading: true
			}
		}, {
			path: '/pub/my',
			component: usercenter
		}]
	},
	{
		path: '/regxy',
		component: regxy
	},
	{
		path: '/login',
		component: login
	}, {
		path: '/changepwd',
		component: changepwd
	}, {
		path: '/about',
		component: about
	}, {
		path: '/userinfo',
		component: userinfo,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/newslist/:id/:title',
		component: newslist
	}, {
		path: '/comment',
		component: comment
	}, {
		path: '/collect',
		component: collect,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/integral',
		component: integral,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/feedback',
		component: feedback2
	}, {
		path: '/reg',
		component: reg
	}, {
		path: '/newsdetail/:id',
		component: newsdetail
	}, {
		path: '/newsdetailSingle/:id',
		component: newsdetailSingle
	}, {
		path: '/commentlist/:newsInfoId',
		component: commentlist
	}, {
		path: '/search/:id',
		component: search
	}, {
		path: '/',
		component: guide
	}, {
		path: '/wechat',
		component: wechat
	}, {
		path: '/ifm/:url',
		component: ifm
	}, {
		path: '/ifm2',
		component: ifm2
	}, {
		path: '/changeusername',
		component: changeusername
	}, {
		path: '/integralrule',
		component: integralrule
	}, {
		path: '/goodsay',
		component: goodsay
	}
]

const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	}
})

router.beforeEach(function(to, from, next) {
	window.scrollTo(0, 0)
	if(to.meta.needLoading) {
		next()
		return false
	}
	store.commit('updateLoadingStatus', {
		isLoading: true
	})
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if(!localStorage.token) {
			sessionStorage.setItem('path', to.path)
			next('/login')
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
	next()
})

router.afterEach(function(to) {
	if(to.meta.needLoading) {
		return
	}
	setTimeout(function() {
		store.commit('updateLoadingStatus', {
			isLoading: false
		})
	}, 500)
})

FastClick.attach(document.body)

Vue.config.productionTip = true

let vm = new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')

document.addEventListener('resume', function() {
	plus.runtime.setBadgeNumber(0)
}, false)

document.addEventListener('plusready', function() {
	plus.runtime.setBadgeNumber(0)
	plus.push.addEventListener('click', function(msg) {
		if(msg.content === '您有新的消息!') {
			let info = JSON.parse(msg.payload)
			vm.$router.push('/newsdetail/' + info.id)
		} else {
			let info = JSON.parse(msg.aps.category)
			vm.$router.push('/newsdetail/' + info.id)
		}
	}, false)
	plus.push.addEventListener('receive', function(msg) {
		if(msg.content === '您有新的消息!') {
			return false
		}
		if(msg.aps) { // Apple APNS message
			//			alert('接收到在线APNS消息：')
		} else {
			var u = navigator.userAgent
			if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				let info = JSON.parse(msg.content)
				vm.$router.push('/newsdetail/' + info.id)
				return false
			}
			plus.push.createMessage('您有新的消息!', JSON.stringify(msg.payload))
		}
	}, false)
}, false)