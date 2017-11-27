import Vue from 'vue'
import Router from 'vue-router'
import Getqrcode from '@/components/getqrcode'
//首页
import Home from '@/components/home/Home'
import HomeIndex from '@/components/home/HomeIndex'
import HomePosition from '@/components/home/HomePosition'
import TaskGuide from '@/components/home/TaskGuide'
import Service from '@/components/home/Service'
import fxgshop from '@/components/shoppingMall/fxgshop'
import Guide from '@/components/Guide'
import HomeDetail from '@/components/home/HomeDetail'
//搜索
import Search from '@/common/vue/Search'
//任务大厅
import Task from '@/components/task/Task'
import TaskIndex from '@/components/task/TaskIndex'
//房产家居
//import HomeProperty from '@/components/homeProperty/HomeProperty'
//import HomePropertyIndex from '@/components/homeProperty/HomePropertyIndex'
//import HomePropertyIn from '@/components/homeProperty/HomePropertyIn'
//import HomePropertyDetail from '@/components/homeProperty/HomePropertyDetail'
//今日免单
import Free from '@/components/free/Free'
import FreeIndex from '@/components/free/FreeIndex'
import FreeDetail from '@/components/free/FreeDetail'
import FreeSignUp from '@/components/free/FreeSignUp'
//跳蚤市场
import FleaMarket from '@/components/fleaMarket/FleaMarket'
import FleaMarketIndex from '@/components/fleaMarket/FleaMarketIndex'
import FleaMarketDetail from '@/components/fleaMarket/FleaMarketDetail'
import FleaMarketIn from '@/components/fleaMarket/FleaMarketIn'
import FleaMarketRelease from '@/components/fleaMarket/FleaMarketRelease'
import FleaMarketMy from '@/components/fleaMarket/FleaMarketMy'
//用户中心
import Usercenter from '@/components/usercenter/Usercenter'
import UsercenterIndex from '@/components/usercenter/UsercenterIndex'
import UsercenterAlltask from '@/components/usercenter/task/UsercenterAlltask'
import UsercenterSharetask from '@/components/usercenter/task/UsercenterSharetask'
import UsercenterCollection from '@/components/usercenter/collection/UsercenterCollection'
import UsercenterShoppingCollection from '@/components/usercenter/collection/UsercenterShoppingCollection'
import Perfect from '@/components/usercenter/perfect/Perfect'
import UsercenterAdress from '@/components/usercenter/adress/UsercenterAdress'
import UsercenterMyActivity from '@/components/usercenter/UsercenterMyActivity'
import UsercenterMyActivityDetail from '@/components/usercenter/UsercenterMyActivityDetail'
import UsercenterMyFree from '@/components/usercenter/UsercenterMyFree'
import UsercenterInfoCenter from '@/components/usercenter/UsercenterInfoCenter'
import UsercenterInfoDetail from '@/components/usercenter/UsercenterInfoDetail'
import UsercenterSetting from '@/components/usercenter/UsercenterSetting'
import GetCash from '@/components/usercenter/GetCash'
import GetCashBindingPhone from '@/components/usercenter/GetCashBindingPhone'
import GetCashBindingPay from '@/components/usercenter/GetCashBindingPay'
import GetCashGo from '@/components/usercenter/GetCashGo'
import Center from '@/components/center/Center'
import BindingPhone from '@/components/usercenter/BindingPhone'
import BindingPhoneNew from '@/components/usercenter/BindingPhoneNew'
import AboutUs from '@/components/usercenter/AboutUs'
import MyOrder from '@/components/usercenter/MyOrder'
import ShoppingCar from '@/components/usercenter/ShoppingCar'
//热门文章
import HotArticle from '@/components/hotArticle/HotArticle'
import HotArticleIndex from '@/components/hotArticle/HotArticleIndex'
//分享详情
import ShareDetail from '@/components/ShareDetail'
//吃喝玩乐
import Amusement from '@/components/amusement/Amusement'
import AmusementIndex from '@/components/amusement/AmusementIndex'
import AmusementIndexMore from '@/components/amusement/AmusementIndexMore'
import AmusementIn from '@/components/amusement/AmusementIn'
import AmusementDetail from '@/components/amusement/AmusementDetail'
//分享购
//import ShareShopping from '@/components/shareShopping/ShareShopping'
//import ShareShoppingIndex from '@/components/shareShopping/ShareShoppingIndex'
//import ShareShoppingDetail from '@/components/shareShopping/ShareShoppingDetail'
//折扣券
import Coupon from '@/components/coupon/Coupon'
import CouponIndex from '@/components/coupon/CouponIndex'
import CouponDetail from '@/components/coupon/CouponDetail'
import MyCoupon from '@/components/coupon/MyCoupon'
//生活服务
import LifeService from '@/components/lifeService/LifeService'
import LifeServiceIndex from '@/components/lifeService/LifeServiceIndex'
import LifeServiceIn from '@/components/lifeService/LifeServiceIn'
import LifeServiceDetail from '@/components/lifeService/LifeServiceDetail'
//线下互动
import Interaction from '@/components/interaction/Interaction'
import InteractionIndex from '@/components/interaction/InteractionIndex'
import InteractionDetail from '@/components/interaction/InteractionDetail'
import InteractionSignUp from '@/components/interaction/InteractionSignUp'
//收益
import Profit from '@/components/profit/profit'
import ProfitIndex from '@/components/profit/ProfitIndex'
import ProfitRanking from '@/components/profit/ProfitRanking'
//佣金商城
import ShoppingMall from '@/components/shoppingMall/ShoppingMall'
import Shopping from '@/components/shoppingMall/Shopping'
import ShoppingDetail from '@/components/shoppingMall/ShoppingDetail'
import SureShopping from '@/components/shoppingMall/SureShopping'
//登录注册
import Login from '@/components/loginRegister/Login'
import Register from '@/components/loginRegister/Register'
import FindPsd from '@/components/loginRegister/FindPsd'
import ChangePsd from '@/components/loginRegister/ChangePsd'
import Agreement from '@/components/loginRegister/Agreement'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/home',
			component: HomeIndex,
			beforeEnter: (to, from, next) => {
				let newUser = localStorage.getItem('newUser')
				if(!newUser) {
					next('/guide')
				} else {
					next()
				}
			}
		}, {
			path: '/home/position',
			component: HomePosition
		}, {
			path: '/taskGuide',
			component: TaskGuide
		}, {
			path: '/service',
			component: Service
		}, {
			path: '/home/detail/:id',
			component: HomeDetail
		}, {
			path: '/home/detail2/:id',
			component: HomeDetail
		},
		{
			path: '/Getqrcode',
			component: Getqrcode,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/guide',
			component: Guide
		},
		{
			path: '/task',
			component: TaskIndex
		},
		{
			path: '/task/detail/:id',
			component: ShareDetail
		},
		{
			path: '/',
			component: HotArticleIndex
		},
		{
			path: '/hotArticle/detail/:id',
			component: ShareDetail
		},
		{
			path: '/coupon',
			component: CouponIndex
		}, {
			path: '/coupon/detail/:id',
			component: CouponDetail
		}, {
			path: '/coupon/myCoupon',
			component: MyCoupon,
			meta: {
				requiresAuth: true
			}

		}, {
			path: '/lifeService',
			component: LifeServiceIndex
		}, {
			path: '/lifeService/in/:id',
			component: LifeServiceIn
		}, {
			path: '/lifeService/detail/:id',
			component: LifeServiceDetail
		}, {
			path: '/free',
			component: FreeIndex
		}, {
			path: '/free/detail/:id',
			component: FreeDetail
		}, {
			path: '/free/signUp/:id',
			component: FreeSignUp,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/fleaMarket',
			component: FleaMarketIndex
		}, {
			path: '/fleaMarket/detail/:id',
			component: FleaMarketDetail
		}, {
			path: '/fleaMarket/in/:id',
			component: FleaMarketIn
		}, {
			path: '/fleaMarket/release',
			component: FleaMarketRelease,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/fleaMarket/my',
			component: FleaMarketMy,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/amusement',
			component: AmusementIndex
		}, {
			path: '/amusement/more',
			component: AmusementIndexMore
		}, {
			path: '/amusement/in/:id',
			component: AmusementIn
		}, {
			path: '/amusement/detail/:id',
			component: AmusementDetail
		}, {
			path: '/interaction',
			component: InteractionIndex
		}, {
			path: '/interaction/detail/:id',
			component: InteractionDetail
		}, {
			path: '/interaction/signUp/:id',
			component: InteractionSignUp,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/profit',
			component: ProfitIndex,
			meta: {
				requiresAuth: true
			}
		}, {
			path: '/profit/ranking',
			component: ProfitRanking
		},
		{
			path: '/shopping-mall',
			component: ShoppingMall,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/Shopping',
			component: Shopping,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/ShoppingDetail/:id',
			component: ShoppingDetail,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/SureShopping',
			component: SureShopping,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/fxgshop',
			component: fxgshop,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/findPsd',
			component: FindPsd
		},
		{
			path: '/changePsd',
			component: ChangePsd,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/agreement',
			component: Agreement
		},
		{
			path: '/usercenter',
			component: Usercenter,
			children: [{
				path: '/usercenter',
				component: UsercenterIndex
			}, {
				path: '/usercenter/alltask',
				component: UsercenterAlltask,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/sharetask',
				component: UsercenterSharetask,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/collection',
				component: UsercenterCollection,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/shoppingCollection',
				component: UsercenterShoppingCollection
			}, {
				path: '/usercenter/perfect',
				component: Perfect
			}, {
				path: '/usercenter/adress',
				component: UsercenterAdress,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/myActivity',
				component: UsercenterMyActivity,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/myFree',
				component: UsercenterMyFree,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/myActivityDetail/:id',
				component: UsercenterMyActivityDetail
			}, {
				path: '/usercenter/infoCenter',
				component: UsercenterInfoCenter,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/infoDetail/:id',
				component: UsercenterInfoDetail
			}, {
				path: '/usercenter/setting',
				component: UsercenterSetting
			}, {
				path: '/usercenter/getCash',
				component: GetCash,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/getCashBindingPhone',
				component: GetCashBindingPhone
			}, {
				path: '/usercenter/getCashBindingPay',
				component: GetCashBindingPay
			}, {
				path: '/usercenter/getCashGo',
				component: GetCashGo
			}, {
				path: '/usercenter/BindingPhone',
				component: BindingPhone
			}, {
				path: '/usercenter/BindingPhoneNew',
				component: BindingPhoneNew
			}, {
				path: '/usercenter/AboutUs',
				component: AboutUs
			}, {
				path: '/usercenter/MyOrder',
				component: MyOrder,
				meta: {
					requiresAuth: true
				}
			}, {
				path: '/usercenter/ShoppingCar',
				component: ShoppingCar,
				meta: {
					requiresAuth: true
				}
			}]
		},
		{
			path: '*',
			redirect: '/home'
		}
	]
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

router.afterEach((to, from) => {
	//	localStorage.setItem('scrollY', window.scrollY)
	//	console.log(window.scrollY)
	//	window.scrollTo(0, 0)
})

export default router