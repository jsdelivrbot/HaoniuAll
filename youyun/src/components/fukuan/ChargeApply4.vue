<template>
	<div class="charge-apply4-box">
		<v-header title="运费申请" :iconShow="true"></v-header>
		<div class="item">
			<p>成交时间：2017-09-09 12:34</p>
			<p>运单号：123450-1</p>
			<p>皖A12345，袁自林，13900000000</p>
			<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
		</div>
		<div class="input">
			<div class="top">
				<span class="red">运费合计：3500.00</span>
				<span>已付：1500.00</span>
				<span>未付：2000.00</span>
			</div>
			<group style="margin-top: -16px;">
				<x-input title="收款人姓名"></x-input>
				<x-input title="收款人卡号"></x-input>
				<x-input title="开户行"></x-input>
				<x-input title="申请支付">
					<span slot="right">元</span>
				</x-input>
			</group>
		</div>
		<div class="btn">
			确认申请
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			XInput
		}
	}
</script>

<style lang="less">
	.charge-apply4-box {
		padding-top: 45px;
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
		}
		.input {
			margin: 10px;
			.top {
				padding: 0 15px;
				height: 32px;
				line-height: 32px;
				background-color: white;
				color: #666666;
				font-size: 12px;
				display: flex;
				justify-content: space-between;
				.red {
					color: #ff423a;
				}
			}
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 50px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
	}
</style>