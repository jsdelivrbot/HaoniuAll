<template>
	<div class="get-cash-binding-pay-box">
		<v-header title="支付宝绑定"></v-header>
		<p class="top">
			<img src="../../../static/usercenter/usercenter-pay.png" />
		</p>
		<group>
			<x-input title="姓名" placeholder="请输入您的姓名" style="font-size: 16px;"></x-input>
		</group>
		<group title="必须和支付宝账号姓名保持一致，否则会造成打款不成功">
			<x-input title="帐号" placeholder="请输入您的支付宝帐号" style="font-size: 16px;"></x-input>
			<x-input title="验证码" placeholder="请输入收到的验证码" style="font-size: 16px;">
				<span slot="right" class="slot-right">
					获取验证码
				</span>
			</x-input>
		</group>
		<p class="detail">1.支付宝账号只能输1次，一经绑定不能更换</p>
		<router-link to="/usercenter/getCashGo" tag="div" class="btn">
			保存
		</router-link>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
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
	.get-cash-binding-pay-box {
		padding: 44px 0 50px;
		.top {
			height: 114px;
			color: #e80014;
			overflow: hidden;
			img {
				width: 72px;
				display: block;
				margin: 30px auto 0;
			}
		}
		.slot-right {
			width: 69px;
			height: 24px;
			line-height: 24px;
			border-radius: 24px;
			display: block;
			background-color: #e70012;
			font-size: 12px;
			color: white;
			text-align: center;
		}
		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			text-align: center;
			height: 50px;
			color: white;
			line-height: 50px;
			background-color: #e70012;
			font-size: 16px;
			font-weight: 500;
		}
		.weui-cells__title {
			font-size: 12px;
		}
		.detail {
			font-size: 12px;
			color: #999999;
			padding-left: 15px;
		}
	}
</style>