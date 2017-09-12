<template>
	<div class="binding-phone-new-box">
		<v-header title="重新绑定手机"></v-header>
		<p class="top">
			<img src="../../../static/usercenter/usercenter4.png" />
		</p>
		<group>
			<x-input title="手机号" placeholder="请输入新号码" style="font-size: 16px;"></x-input>
			<x-input title="验证码" placeholder="请输入收到的验证码" style="font-size: 16px;">
				<span slot="right" class="slot-right">
					获取验证码
				</span>
			</x-input>
		</group>
		<router-link to="/usercenter/setting" tag="div" class="btn">
			完成
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
	.binding-phone-new-box {
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
	}
</style>