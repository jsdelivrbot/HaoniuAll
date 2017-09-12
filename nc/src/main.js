// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import Login from './components/login'
import Index from './components/index'
import Round from './components/round'
import Fd from './components/list'
import Reg from './components/reg'
import Chushou from './components/chushou'
import Userinfo from './components/userinfo'
import Changemima from './components/resetpwd'
import Savemibao from './components/mibao'
import Tips from './components/tips'
import Showlist from './components/showlist'
import Duihuan from './components/duihuan'
import Fdnc from './components/fdnc'
import Kb from './components/kongbai'
import { AjaxPlugin, AlertPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)

localStorage.setItem('htppurl', 'http://www.stweaver.net')

const routes = [{
		path: '/login',
		component: Login
	},
	{
		path: '/',
		component: Login
	},
	{
		path: '/index',
		component: Index
	},
	{
		path: '/round',
		component: Round
	},
	{
		path: '/fd',
		component: Fd
	},
	{
		path: '/reg',
		component: Reg
	},
	{
		path: '/chushou',
		component: Chushou
	},
	{
		path: '/userinfo',
		component: Userinfo
	},
	{
		path: '/change',
		component: Changemima
	},
	{
		path: '/mibao',
		component: Savemibao
	},
	{
		path: '/tips',
		component: Tips
	},
	{
		path: '/showlist/:name',
		component: Showlist
	},
	{
		path: '/duihuan',
		component: Duihuan
	},
	{
		path: '/fdnc/:id',
		component: Fdnc
	},
	{
		path: '/kb',
		component: Kb
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if(to.path !== '/login') {
		if(localStorage.getItem('id') === null) {
			return next('/login')
		} else {
			next()
		}
	}
	next()
})

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
	state: {
		isLoading: false
	},
	mutations: {
		updateLoadingStatus(state, payload) {
			state.isLoading = payload.isLoading
		}
	}
})

router.beforeEach(function(to, from, next) {
	store.commit('updateLoadingStatus', {
		isLoading: true
	})
	next()
})

router.afterEach(function(to) {
	setTimeout(function() {
		store.commit('updateLoadingStatus', {
			isLoading: false
		})
	}, 200)
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')