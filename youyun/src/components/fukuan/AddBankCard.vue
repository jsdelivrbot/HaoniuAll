<template>
	<div class="add-bank-card-box">
		<v-header title="添加银行卡"></v-header>
		<group style="margin: 0 10px;">
			<x-input placeholder="请输入银行卡号" type="number"></x-input>
		</group>
		<group style="margin: 0 10px;">
			<x-input placeholder="请输入身份证号"></x-input>
		</group>
		<group style="margin: 0 10px;">
			<x-input placeholder="请输入手机号" type="number">
				<span slot="right" style="padding: 4px 30px; display: block; 
					background-color: #dedede; color: #666666;">
					获取验证码
				</span>
			</x-input>
		</group>
		<group style="margin: 0 10px;">
			<x-input placeholder="请输入验证码"></x-input>
		</group>
		<div class="btn">
			完成
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
	.add-bank-card-box {
		padding-top: 45px;
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