import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Userinfo from '@/components/userinfo'
import Textlist from '@/components/textlist'
import Addtext from '@/components/addtext'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			component: Login
		},
		{
			path: '/index',
			component: Index,
			children: [{
					path: '/userinfo',
					component: Userinfo
				},
				{
					path: '/textlist',
					component: Textlist
				}, {
					path: '/addtext',
					component: Addtext
				}
			]
		}
	]
})