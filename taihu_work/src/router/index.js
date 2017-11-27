import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Info from '@/components/Info'
import Detail from '@/components/Detail'
import Personal from '@/components/Personal'
import ChangeAvatar from '@/components/ChangeAvatar'
import Summary from '@/components/Summary'
import ChangePsw from '@/components/ChangePsw'

Vue.use(Router)

let router = new Router({
	routes: [{
		path: '/',
		redirect: '/home'
	}, {
		path: '/home',
		name: 'Hello',
		component: Hello,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/info',
		component: Info,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/detail/:id',
		component: Detail,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/personal',
		component: Personal,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/ChangeAvatar',
		component: ChangeAvatar,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/summary/:id',
		component: Summary,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/ChangePsw',
		component: ChangePsw,
		meta: {
			requiresAuth: true
		}
	}]
})

router.beforeEach((to, from, next) => {
	if(to.matched.some(r => r.meta.requiresAuth)) {
		if(sessionStorage.token) {
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next();
	}
})

export default router