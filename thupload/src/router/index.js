import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Reg from '@/components/reg'
import Forget from '@/components/forget'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/login',
		name: 'Login',
		component: Login
	}, {
		path: '/reg',
		name: 'Reg',
		component: Reg
	}, {
		path: '/forget',
		name: 'Forget',
		component: Forget
	}]
})