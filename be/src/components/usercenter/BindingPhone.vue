<template>
	<div class="binding-phone-box">
		<v-header title="重新绑定手机"></v-header>
		<p class="top">
			<img src="../../../static/usercenter/usercenter4.png" />
		</p>
		<group>
			<x-input title="姓名" placeholder="12345678910" style="font-size: 16px;" disabled></x-input>
		</group>
		<group>
			<x-input title="手机号" placeholder="12345678910" style="font-size: 16px;" disabled></x-input>
			<x-input title="验证码" placeholder="请输入收到的验证码" style="font-size: 16px;">
				<span slot="right" class="slot-right">
					获取验证码
				</span>
			</x-input>
		</group>
		<p class="detail">如果手机号码变更，原号码丢失，请致电4008-566-116</p>
		<router-link to="/usercenter/BindingPhoneNew" tag="div" class="btn">
			下一步
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
	.binding-phone-box {
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
			text-align: center;
			line-height: 30px;
		}
	}
</style>