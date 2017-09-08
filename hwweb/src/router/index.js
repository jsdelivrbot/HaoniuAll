import Vue from 'vue'
import Router from 'vue-router'
import Pub from '@/components/pub'
import Login from '@/components/login'
import Index from '@/components/index'
import Video from '@/components/video'
import videoDetail from '@/components/videoDetail'
import News from '@/components/news'
import Newsdetail from '@/components/newsdetail'
import Wenda from '@/components/wenda'
import Wendadetail from '@/components/wendadetail'
import Tips from '@/components/tips'
import Zygl from '@/components/zhuanyeguanli'
import Collect from '@/components/collect'
import userCenter from '@/components/userCenter'
import Class from '@/components/class'
import People from '@/components/people'
import Addclass from '@/components/addclass'
import classmanage from '@/components/classmanage'
import contentgl from '@/components/contentgl'
import userinfoset from '@/components/userinfoset'
import reg from '@/components/reg'
import myhuida from '@/components/myhuida'
import mywenti from '@/components/mywenti'
import classlist from '@/components/classlist'
import classdt from '@/components/classdt'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/pub',
			name: 'Pub',
			component: Pub,
			children: [{
					path: '/pub/index',
					name: 'index',
					component: Index
				},
				{
					path: '/pub/video',
					name: 'video',
					component: Video
				},
				{
					path: '/pub/classlist',
					name: 'classlist',
					component: classlist
				},
				{
					path: '/pub/classdt/:id',
					name: 'classdt',
					component: classdt
				},
				{
					path: '/pub/news',
					name: 'news',
					component: News
				}, {
					path: '/pub/zygl',
					name: 'zygl',
					component: Zygl
				},
				{
					path: '/pub/zyglclass/:id',
					name: 'classmanage',
					component: classmanage
				}, {
					path: '/pub/people',
					name: 'people',
					component: People
				},

				{
					path: '/pub/myhuida',
					name: 'myhuida',
					component: myhuida
				},
				{
					path: '/pub/mywenti',
					name: 'mywenti',
					component: mywenti
				},
				{
					path: '/pub/wenda',
					name: 'wenda',
					component: Wenda
				},
				{
					path: '/pub/tips',
					name: 'tips',
					component: Tips
				},
				{
					path: '/pub/collect',
					name: 'collect',
					component: Collect
				}, {
					path: '/pub/class',
					name: 'class',
					component: Class
				}, {
					path: '/pub/contentgl',
					name: 'contentgl',
					component: contentgl
				}
			]
		}, {
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/reg',
			name: 'reg',
			component: reg
		},
		{
			path: '/userinfoset',
			name: 'userinfoset',
			component: userinfoset
		},
		{
			path: '/usercenter',
			name: 'usercenter',
			component: userCenter
		}, {
			path: '/wendadetail/:id',
			name: 'wendadetail',
			component: Wendadetail
		}, {
			path: '/newsdetail/:id',
			name: 'newsdetail',
			component: Newsdetail
		}, {
			path: '/addclass',
			name: 'addclass',
			component: Addclass
		}, {
			path: '/videodetail/:id',
			name: 'videodetail',
			component: videoDetail
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	}
})