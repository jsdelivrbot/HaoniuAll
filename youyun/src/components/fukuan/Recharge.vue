<template>
	<div class="recharge-box">
		<v-header title="充值"></v-header>
		<group>
			<x-input title="充值金额" type="number">
				<span slot="right">元</span>
			</x-input>
		</group>
		<div class="category">
			<span class="title">支付方式</span>
			<checker default-item-class="item" selected-item-class="item-selected" style="margin-left: 10px;">
				<checker-item value="1" style="margin: 10px 0 0 10px;"></checker-item>
				<span class="text">联通支付</span>
			</checker>
		</div>
		<div class="btn">
			确认支付
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Cell, Checker, CheckerItem } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			XInput,
			Cell,
			Checker,
			CheckerItem
		}
	}
</script>

<style lang="less">
	.recharge-box {
		padding-top: 45px;
		.category {
			padding: 20px 15px;
			margin-top: 20px;
			background-color: white;
			.title {
				font-size: 18px;
			}
			.item {
				width: 16px;
				height: 16px;
				background-color: #f4f2f5;
				border: 1px solid #a3a3a3;
				border-radius: 50%;
				margin-right: 2px;
			}
			.item-selected {
				width: 18px;
				height: 18px;
				background: url(../../../static/image/xuanzhong.png) left top no-repeat;
				background-size: 18px 18px;
				border: none;
			}
			.text {
				font-size: 14px;
				line-height: 16px;
				vertical-align: text-top;
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