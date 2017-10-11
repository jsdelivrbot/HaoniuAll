<template>
	<div class="hello">
		<div>
			<h1>yunli</h1>
			<router-link to="/VehicleInfo" tag="div">VehicleInfo车辆信息</router-link>
			<router-link to="/FastCreate" tag="div">FastCreate快速建单</router-link>
			<router-link to="/Receipt" tag="div">Receipt收款信息</router-link>
			<router-link to="/DriverInfo" tag="div">DriverInfo司机信息</router-link>
			<router-link to="/ChangeCharge" tag="div">ChangeCharge调整运费</router-link>
			<router-link to="/ChangeOrder" tag="div">ChangeOrder调整订单</router-link>
			<router-link to="/YunLi" tag="div">YunLi运力</router-link>
			<router-link to="/FileDriver" tag="div">FileDriver司机档案</router-link>
			<router-link to="/FileVehicle" tag="div">FileVehicle车辆档案</router-link>
			<!--<router-link to="/Manage" tag="div">Manage运力管理</router-link>-->
			<router-link to="/Preview" tag="div">Preview预览</router-link>
		</div>
		<div>
			<h1>diaodu</h1>
			<router-link to="/FastDispatch" tag="div">FastDispatch快速调度</router-link>
			<router-link to="/OfferDetail" tag="div">OfferDetail报价详情</router-link>
			<router-link to="/DiaoDu" tag="div">DiaoDu调度</router-link>
		</div>
		<div>
			<h1>yunshu</h1>
			<!--<router-link to="/RaterDetail" tag="div">RaterDetail评价详情</router-link>-->
			<router-link to="/OrderDetail" tag="div">OrderDetail运单详情</router-link>
			<router-link to="/ChargeApply" tag="div">ChargeApply运费申请</router-link>
			<router-link to="/ChargeApply2" tag="div">ChargeApply2运费申请2</router-link>
			<router-link to="/Yunshu" tag="div">Yunshu运输</router-link>
		</div>
		<div>
			<h1>fukuan</h1>
			<router-link to="/SureSignIn" tag="div">SureSignIn确认签收</router-link>
			<router-link to="/SureSignIn2" tag="div">SureSignIn2确认签收2</router-link>
			<router-link to="/Recharge" tag="div">Recharge充值</router-link>
			<router-link to="/RechargeWithdraw" tag="div">RechargeWithdraw充值提现</router-link>
			<router-link to="/FuKuan" tag="div">FuKuan付款</router-link>
			<router-link to="/Withdraw" tag="div">Withdraw提现</router-link>
			<router-link to="/AddBankCard" tag="div">AddBankCard添加银行卡</router-link>
			<router-link to="/ChooseBankCard" tag="div">ChooseBankCard选择银行卡</router-link>
			<router-link to="/ManageBankCard" tag="div">ManageBankCard管理银行卡</router-link>
			<router-link to="/ChargeApply3" tag="div">ChargeApply3运费申请3</router-link>
			<router-link to="/ChargeApply4" tag="div">ChargeApply4运费申请4</router-link>
			<router-link to="/ChargeApply5" tag="div">ChargeApply5运费申请5</router-link>
			<router-link to="/ChargeAccount" tag="div">ChargeAccount运费账户</router-link>
			<router-link to="/InvoiceManage" tag="div">InvoiceManage发票管理</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>