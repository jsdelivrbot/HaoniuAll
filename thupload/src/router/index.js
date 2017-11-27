import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Reg from '@/components/reg'
import Forget from '@/components/forget'
import Update from '@/components/update'
import PersonalData from '@/components/personal_data'
import ChangePass from '@/components/change_pass'
import Help from '@/components/help'
import AboutUs from '@/components/about_us'
import ShangBaoJilu from '@/components/shangbaojilu'
import Detail from '@/components/detail'
import Info from '@/components/info'
import WoYaoShangBao from '@/components/woyaoshangbao'
import HelpDetail from '@/components/help_detail'
import changeAvatar from '@/components/ChangeAvatar'
import wmkb from '@/components/wmkb'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/update'
		},
		{
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
		}, {
			path: '/update',
			name: 'Update',
			component: Update
		}, {
			path: '/personal_data',
			name: 'PersonalData',
			component: PersonalData
		}, {
			path: '/change_pass',
			name: 'ChangePass',
			component: ChangePass
		}, {
			path: '/help',
			name: 'Help',
			component: Help
		}, {
			path: '/about_us',
			name: 'AboutUs',
			component: AboutUs
		}, {
			path: '/shangbaojilu',
			name: 'ShangBaoJilu',
			component: ShangBaoJilu
		}, {
			path: '/detail/:id',
			name: 'Detail',
			component: Detail
		}, {
			path: '/info',
			name: 'Info',
			component: Info
		}, {
			path: '/woyaoshangbao',
			name: 'WoYaoShangBao',
			component: WoYaoShangBao
		}, {
			path: '/help_detail/:id',
			name: 'HelpDetail',
			component: HelpDetail
		}, {
			path: '/ChangeAvatar',
			name: 'changeAvatar',
			component: changeAvatar
		}, {
			path: '/wmkb',
			name: 'wmkb',
			component: wmkb
		}
	]
})