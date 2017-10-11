import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			component: function(resolve) {
				require(['@/components/Hello'], resolve)
			}
		},
		//运力
		{
			path: '/VehicleInfo/:id',
			component: function(resolve) {
				require(['@/components/yunli/VehicleInfo'], resolve)
			}
		},
		{
			path: '/FastCreate/:id',
			component: function(resolve) {
				require(['@/components/yunli/FastCreate'], resolve)
			}
		},
		{
			path: '/Receipt/:id',
			component: function(resolve) {
				require(['@/components/yunli/Receipt'], resolve)
			}
		},
		{
			path: '/DriverInfo/:id',
			component: function(resolve) {
				require(['@/components/yunli/DriverInfo'], resolve)
			}
		},
		{
			path: '/ChangeCharge',
			component: function(resolve) {
				require(['@/components/yunli/ChangeCharge'], resolve)
			}
		},
		{
			path: '/YunLi',
			component: function(resolve) {
				require(['@/components/yunli/YunLi'], resolve)
			}
		},
		{
			path: '/FileDriver/:id',
			component: function(resolve) {
				require(['@/components/yunli/FileDriver'], resolve)
			}
		},
		{
			path: '/FileVehicle/:id',
			component: function(resolve) {
				require(['@/components/yunli/FileVehicle'], resolve)
			}
		},
		{
			path: '/Preview',
			component: function(resolve) {
				require(['@/components/yunli/Preview'], resolve)
			}
		},
		{
			path: '/RegisterVehicle',
			component: function(resolve) {
				require(['@/components/yunli/RegisterVehicle'], resolve)
			}
		},
		//调度
		{
			path: '/FastDispatch',
			component: function(resolve) {
				require(['@/components/diaodu/FastDispatch'], resolve)
			}
		},
		{
			path: '/OfferDetail/:id',
			component: function(resolve) {
				require(['@/components/diaodu/OfferDetail'], resolve)
			}
		},
		{
			path: '/DiaoDu',
			component: function(resolve) {
				require(['@/components/diaodu/DiaoDu'], resolve)
			}
		},
		{
			path: '/ChangeOrder/:id',
			component: function(resolve) {
				require(['@/components/DiaoDu/ChangeOrder'], resolve)
			}
		},
		//运输
		{
			path: '/OrderDetail/:id',
			component: function(resolve) {
				require(['@/components/yunshu/OrderDetail'], resolve)
			}
		},
		{
			path: '/ChargeApply',
			component: function(resolve) {
				require(['@/components/yunshu/ChargeApply'], resolve)
			}
		},
		{
			path: '/ChargeApply2',
			component: function(resolve) {
				require(['@/components/yunshu/ChargeApply2'], resolve)
			}
		},
		{
			path: '/Yunshu',
			component: function(resolve) {
				require(['@/components/yunshu/Yunshu'], resolve)
			}
		},
		{
			path: '/SureSignIn2/:id',
			component: function(resolve) {
				require(['@/components/fukuan/SureSignIn2'], resolve)
			}
		},
		{
			path: '/ChangeOrder2/:id',
			component: function(resolve) {
				require(['@/components/yunshu/ChangeOrder2'], resolve)
			}
		},
		//关于我们
		{
			path: '/AboutUs',
			component: function(resolve) {
				require(['@/components/AboutUs'], resolve)
			}
		},
		//付款
		{
			path: '/SureSignIn',
			component: function(resolve) {
				require(['@/components/fukuan/SureSignIn'], resolve)
			}
		},
		{
			path: '/Recharge',
			component: function(resolve) {
				require(['@/components/fukuan/Recharge'], resolve)
			}
		},
		{
			path: '/RechargeWithdraw',
			component: function(resolve) {
				require(['@/components/fukuan/RechargeWithdraw'], resolve)
			}
		},
		{
			path: '/FuKuan',
			component: function(resolve) {
				require(['@/components/fukuan/FuKuan'], resolve)
			}
		},
		{
			path: '/Withdraw',
			component: function(resolve) {
				require(['@/components/fukuan/Withdraw'], resolve)
			}
		},
		{
			path: '/AddBankCard',
			component: function(resolve) {
				require(['@/components/fukuan/AddBankCard'], resolve)
			}
		},
		{
			path: '/ChooseBankCard',
			component: function(resolve) {
				require(['@/components/fukuan/ChooseBankCard'], resolve)
			}
		},
		{
			path: '/ManageBankCard',
			component: function(resolve) {
				require(['@/components/fukuan/ManageBankCard'], resolve)
			}
		},
		{
			path: '/ChargeApply3',
			component: function(resolve) {
				require(['@/components/fukuan/ChargeApply3'], resolve)
			}
		},
		{
			path: '/ChargeApply4',
			component: function(resolve) {
				require(['@/components/fukuan/ChargeApply4'], resolve)
			}
		},
		{
			path: '/ChargeApply5',
			component: function(resolve) {
				require(['@/components/fukuan/ChargeApply5'], resolve)
			}
		},
		{
			path: '/ChargeAccount',
			component: function(resolve) {
				require(['@/components/fukuan/ChargeAccount'], resolve)
			}
		},
		{
			path: '/InvoiceManage',
			component: function(resolve) {
				require(['@/components/fukuan/InvoiceManage'], resolve)
			}
		}
	]
})

export default router