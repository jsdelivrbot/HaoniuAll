import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//运力
import VehicleInfo from '@/components/yunli/VehicleInfo'
import FastCreate from '@/components/yunli/FastCreate'
import Receipt from '@/components/yunli/Receipt'
import DriverInfo from '@/components/yunli/DriverInfo'
import ChangeCharge from '@/components/yunli/ChangeCharge'
import ChangeOrder from '@/components/yunli/ChangeOrder'
import YunLi from '@/components/yunli/YunLi'
import FileDriver from '@/components/yunli/FileDriver'
import FileVehicle from '@/components/yunli/FileVehicle'
//import Manage from '@/components/yunli/Manage'
import Preview from '@/components/yunli/Preview'
//调度
import FastDispatch from '@/components/diaodu/FastDispatch'
import OfferDetail from '@/components/diaodu/OfferDetail'
import DiaoDu from '@/components/diaodu/DiaoDu'
//运输
//import RaterDetail from '@/components/yunshu/RaterDetail'
import OrderDetail from '@/components/yunshu/OrderDetail'
import ChargeApply from '@/components/yunshu/ChargeApply'
import ChargeApply2 from '@/components/yunshu/ChargeApply2'
import Yunshu from '@/components/yunshu/Yunshu'
//付款
import SureSignIn from '@/components/fukuan/SureSignIn'
import SureSignIn2 from '@/components/fukuan/SureSignIn2'
import Recharge from '@/components/fukuan/Recharge'
import RechargeWithdraw from '@/components/fukuan/RechargeWithdraw'
import FuKuan from '@/components/fukuan/FuKuan'
import Withdraw from '@/components/fukuan/Withdraw'
import AddBankCard from '@/components/fukuan/AddBankCard'
import ChooseBankCard from '@/components/fukuan/ChooseBankCard'
import ManageBankCard from '@/components/fukuan/ManageBankCard'
import ChargeApply3 from '@/components/fukuan/ChargeApply3'
import ChargeApply4 from '@/components/fukuan/ChargeApply4'
import ChargeApply5 from '@/components/fukuan/ChargeApply5'
import ChargeAccount from '@/components/fukuan/ChargeAccount'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/VehicleInfo/:id',
			component: VehicleInfo
		},
		{
			path: '/FastCreate/:id',
			component: FastCreate
		},
		{
			path: '/Receipt/:id',
			component: Receipt
		},
		{
			path: '/DriverInfo/:id',
			component: DriverInfo
		},
		{
			path: '/ChangeCharge',
			component: ChangeCharge
		},
		{
			path: '/ChangeOrder',
			component: ChangeOrder
		},
		{
			path: '/YunLi',
			component: YunLi
		},
		{
			path: '/FileDriver/:id',
			component: FileDriver
		},
		{
			path: '/FileVehicle/:id',
			component: FileVehicle
		},
//		{
//			path: '/Manage',
//			component: Manage
//		},
		{
			path: '/Preview',
			component: Preview
		},
		{
			path: '/FastDispatch',
			component: FastDispatch
		},
		{
			path: '/OfferDetail/:id',
			component: OfferDetail
		},
		{
			path: '/DiaoDu',
			component: DiaoDu
		},
//		{
//			path: '/RaterDetail',
//			component: RaterDetail
//		},
		{
			path: '/OrderDetail',
			component: OrderDetail
		},
		{
			path: '/ChargeApply',
			component: ChargeApply
		},
		{
			path: '/ChargeApply2',
			component: ChargeApply2
		},
		{
			path: '/Yunshu',
			component: Yunshu
		},
		{
			path: '/SureSignIn',
			component: SureSignIn
		},
		{
			path: '/SureSignIn2',
			component: SureSignIn2
		},
		{
			path: '/Recharge',
			component: Recharge
		},
		{
			path: '/RechargeWithdraw',
			component: RechargeWithdraw
		},
		{
			path: '/FuKuan',
			component: FuKuan
		},
		{
			path: '/Withdraw',
			component: Withdraw
		},
		{
			path: '/AddBankCard',
			component: AddBankCard
		},
		{
			path: '/ChooseBankCard',
			component: ChooseBankCard
		},
		{
			path: '/ManageBankCard',
			component: ManageBankCard
		},
		{
			path: '/ChargeApply3',
			component: ChargeApply3
		},
		{
			path: '/ChargeApply4',
			component: ChargeApply4
		},
		{
			path: '/ChargeApply5',
			component: ChargeApply5
		},
		{
			path: '/ChargeAccount',
			component: ChargeAccount
		}
	]
})