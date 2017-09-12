<template>
	<div class="get-cash-binding-phone-box">
		<v-header title="手机号绑定"></v-header>
		<p class="top">
			为了确保您的帐号安全，请绑定手机号
		</p>
		<group>
			<x-input title="姓名" placeholder="请输入您的姓名" style="font-size: 16px;"></x-input>
		</group>
		<group>
			<x-input title="手机号" placeholder="请输入您的手机号" style="font-size: 16px;"></x-input>
			<x-input title="验证码" placeholder="请输入收到的验证码" style="font-size: 16px;">
				<span slot="right" class="slot-right">
					获取验证码
				</span>
			</x-input>
			<router-link to="/usercenter/getCashBindingPay" class="btn">
				绑定
			</router-link>
		</group>
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
	.get-cash-binding-phone-box {
		padding: 44px 0 50px;
		.top {
			height: 114px;
			line-height: 114px;
			color: #e80014;
			text-align: center;
			font-size: 16px;
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
	}
</style>