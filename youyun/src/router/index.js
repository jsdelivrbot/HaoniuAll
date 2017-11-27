import Vue from 'vue'
import Router from 'vue-router'
//付款

import Reapply from '@/components/fukuan/Reapply'
import InvoicePay from '@/components/fukuan/InvoicePay'
import SureInvoice2 from '@/components/fukuan/SureInvoice2'
import SureInvoice from '@/components/fukuan/SureInvoice'
import RechargeRecord from '@/components/fukuan/RechargeRecord'
import TransactionRecord from '@/components/fukuan/TransactionRecord'
import PasswordManage from '@/components/fukuan/PasswordManage'
import InvoiceManage from '@/components/fukuan/InvoiceManage'
import ChargeAccount from '@/components/fukuan/ChargeAccount'
import ChargeApply5 from '@/components/fukuan/ChargeApply5'
import ChargeApply4 from '@/components/fukuan/ChargeApply4'
import ChargeApply3 from '@/components/fukuan/ChargeApply3'
import ManageBankCard from '@/components/fukuan/ManageBankCard'
import ChooseBankCard from '@/components/fukuan/ChooseBankCard'
import AddBankCard from '@/components/fukuan/AddBankCard'
import Withdraw from '@/components/fukuan/Withdraw'
import FuKuan from '@/components/fukuan/FuKuan'
import RechargeWithdraw from '@/components/fukuan/RechargeWithdraw'
import Recharge from '@/components/fukuan/Recharge'
import SureSignIn from '@/components/fukuan/SureSignIn'
import SureSignIn2 from '@/components/fukuan/SureSignIn2'
import ChangeApply from '@/components/fukuan/ChangeApply'

import Hello from '@/components/Hello'
import AboutUs from '@/components/AboutUs'
import VehicleInfo from '@/components/yunli/VehicleInfo'
import FastCreate from '@/components/yunli/FastCreate'
import Receipt from '@/components/yunli/Receipt'
import DriverInfo from '@/components/yunli/DriverInfo'
import ChangeCharge from '@/components/yunli/ChangeCharge'
import YunLi from '@/components/yunli/YunLi'
import FileDriver from '@/components/yunli/FileDriver'
import FileVehicle from '@/components/yunli/FileVehicle'
import Preview from '@/components/yunli/Preview'
import RegisterVehicle from '@/components/yunli/RegisterVehicle'
//FastDispatch diaodu

import FastDispatch from '@/components/diaodu/FastDispatch'
import OfferDetail from '@/components/diaodu/OfferDetail'
import DiaoDu from '@/components/diaodu/DiaoDu'
import ChangeOrder from '@/components/diaodu/ChangeOrder'

//yunshu
import OrderDetail from '@/components/yunshu/OrderDetail'
import ChargeApply from '@/components/yunshu/ChargeApply'
import ChargeApply2 from '@/components/yunshu/ChargeApply2'
import Yunshu from '@/components/yunshu/Yunshu'
import ChangeOrder2 from '@/components/yunshu/ChangeOrder2'
Vue.use(Router)
const router = new Router({
	routes: [{
			path: '/',
			component: Hello
		},
		//运力
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
			path: '/ChangeCharge/:id',
			component: ChangeCharge
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
		{
			path: '/Preview',
			component: Preview
		},
		{
			path: '/RegisterVehicle',
			component: RegisterVehicle
		},
		//调度
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
		{
			path: '/ChangeOrder/:id',
			component: ChangeOrder
		},
		//运输
		{
			path: '/OrderDetail/:id',
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
			path: '/SureSignIn2/:id',
			component: SureSignIn2
		},
		{
			path: '/ChangeOrder2/:id',
			component: ChangeOrder2
		},
		//关于我们
		{
			path: '/AboutUs',
			component: AboutUs
		},
		//付款
		{
			path: '/SureSignIn',
			component: SureSignIn
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
			path: '/ChargeApply3/:id',
			component: ChargeApply3
		},
		{
			path: '/ChargeApply4/:id',
			component: ChargeApply4
		},
		{
			path: '/ChargeApply5/:id',
			component: ChargeApply5
		},
		{
			path: '/ChargeAccount',
			component: ChargeAccount
		},
		{
			path: '/InvoiceManage',
			component: InvoiceManage
		},
		{
			path: '/PasswordManage',
			component: PasswordManage
		},
		{
			path: '/TransactionRecord',
			component: TransactionRecord
		},
		{
			path: '/RechargeRecord',
			component: RechargeRecord
		},
		{
			path: '/SureInvoice/:id/:acount',
			component: SureInvoice
		},
		{
			path: '/SureInvoice2',
			component: SureInvoice2
		},
		{
			path: '/InvoicePay',
			component: InvoicePay
		},
		{
			path: '/Reapply/:id',
			component: Reapply
		},
		{
			path: '/ChangeApply/:id',
			component: ChangeApply
		}
	]
})

export default router