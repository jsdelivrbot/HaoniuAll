import Vue from 'vue'
import Router from 'vue-router'
//login
import Login from '@/components/login/login'
import Forget from '@/components/login/findPassword'
//home
import Home from '@/components/home/index'
import borrowMoney from '@/components/home/borrowMoney'
import More from '@/components/home/more'
//userCenter
import userCenter from '@/components/usercenter/userCenter'
import Record from '@/components/usercenter/record'
import recordDetail from '@/components/usercenter/recordDetail'
import userSet from '@/components/usercenter/set'
import changeName from '@/components/usercenter/changeName'
import changePwd from '@/components/usercenter/changePwd'
import Invite from '@/components/usercenter/invite'

//news
import Message from '@/components/news/message'
import newsDetail from '@/components/news/newsDetail'

//authentication
import Authentication from '@/components/authentication/index'
import Identity from '@/components/authentication/identity'
import Zhima from '@/components/authentication/zhima'
import Face from '@/components/authentication/face'
import phone from '@/components/authentication/phone'
import bindBank from '@/components/authentication/bindBank'
import emergency from '@/components/authentication/emergency'

//pay
import xqPay from '@/components/pay/xqpay'
import paySuccess from '@/components/pay/paySuccess'
import Repayment from '@/components/pay/repayment'
import Quick from '@/components/pay/quick'
import placeOrder from '@/components/pay/placeOrder'
import huanKuan from '@/components/pay/huankuan'
import wechatPay from '@/components/pay/wechatpay'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/borrowMoney'
		},
		{
			path: '/login', //需检测用户是否存在
			name: 'Login',
			component: Login
		},
		//		{
		//			path: '/codeLogin/:username', //验证码登录 login 传参
		//			name: 'codeLogin',
		//			component: codeLogin
		//		},
		//		{
		//			path: '/passwordLogin/:username', //密码登录 login 传参
		//			name: 'passwordLogin',
		//			component: passwordLogin
		//		},
		{
			path: '/Forget',
			component: Forget
		},
		//news
		{
			path: '/message', //消息页面
			name: 'message',
			component: Message
		},
		{
			path: '/newsDetail/:id', //更多详情
			name: 'newsDetail',
			component: newsDetail
		},
		//authentication
		{
			path: '/Authentication', //认证首页
			name: 'Authentication',
			component: Authentication
		},
		{
			path: '/Identity', //身份认证
			name: 'Identity',
			component: Identity
		},
		{
			path: '/Zhima', //芝麻信用认证
			name: 'Zhima',
			component: Zhima
		},
		{
			path: '/bindBank', //绑定银行
			name: 'bindBank',
			component: bindBank
		}, {
			path: '/Quick', //绑定银行
			name: 'Quick',
			component: Quick
		},
		{
			path: '/Face', //绑定银行
			name: 'Face',
			component: Face
		},
		{
			path: '/phone', //绑定银行
			name: 'phone',
			component: phone
		},
		{
			path: '/emergency', //绑定银行
			name: 'emergency',
			component: emergency
		},
		//pay
		{
			path: '/Repayment', //借款成功
			name: 'Repayment',
			component: Repayment
		},
		{
			path: '/placeOrder',
			name: 'placeOrder',
			component: placeOrder
		},
		{
			path: '/paySuccess', //借款成功
			name: 'paySuccess',
			component: paySuccess
		},
		{
			path: '/xqPay', //支付续期费用
			name: 'xqPay',
			component: xqPay
		},
		{
			path: '/huanKuan/:money', //支付续期费用
			name: 'huanKuan',
			component: huanKuan
		},
		{
			path: '/wechatPay', //支付续期费用
			name: 'wechatPay',
			component: wechatPay
		},
		//home
		{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [{
					path: '/borrowMoney',
					name: 'borrowMoney',
					component: borrowMoney
				},
				{
					path: '/userCenter',
					name: 'userCenter',
					component: userCenter
				},
				{
					path: '/More',
					name: 'More',
					component: More
				}
			]
		},
		//usercenter
		{
			path: '/Record', //借款记录
			name: 'Record',
			component: Record
		},
		{
			path: '/recordDetail/:id', //借款详情
			name: 'recordDetail',
			component: recordDetail
		},
		{
			path: '/userSet', //借款详情
			name: 'userSet',
			component: userSet
		},
		{
			path: '/changeName', //借款详情
			name: 'changeName',
			component: changeName
		}, {
			path: '/changePwd', //借款详情
			name: 'changePwd',
			component: changePwd
		}, {
			path: '/Invite', //借款详情
			name: 'Invite',
			component: Invite
		}
	]
})