<template>
	<div class="withdraw-box">
		<v-header title="提现"></v-header>
		<group style="margin: 0 10px;">
			<cell is-link>
				<div slot="icon" style="height: 21px;">
					<img src="../../../static/image/xingyeyinhang-tubiao@2x.png" width="34px" height="21px"/>
				</div>
				<div slot="title" style="margin-left: 12px;">
					<p style="font-size: 16px;">兴业银行</p>
					<p style="font-size: 14px; color: #959595;">尾数0988储蓄卡</p>
				</div>
			</cell>
		</group>
		<div class="input">
			<p class="header">提现金额：</p>
			<div class="content">
				<span>￥</span>
				<input type="number" v-model="chargeFix2"/>
			</div>
			<p class="footer vux-1px-t">可提现余额：1000.00</p>
		</div>
		<div class="btn">
			确认提现
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, Cell } from 'vux'
	export default {
		data() {
			return {
				charge: 1000
			}
		},
		computed: {
			chargeFix2() {
				return this.charge.toFixed(2)
			}
		},
		components: {
			'v-header': Header,
			Group,
			Cell
		}
	}
</script>

<style lang="less">
	.withdraw-box {
		padding-top: 45px;
		.input {
			margin: 20px 10px 0;
			background-color: white;
			.header {
				height: 36px;
				line-height: 36px;
				color: #666666;
				padding-left: 15px;
				font-size: 14px;
			}
			.content {
				height: 69px;
				display: flex;
				font-size: 0;
				span {
					flex: 0 0 70px;
					width: 70px;
					font-size: 26px;
					line-height: 69px;
					text-align: right;
				}
				input {
					width: 0;
					flex: 1;
					height: 100%;
					border: none;
					outline: none;
					font-size: 26px;
				}
			}
			.footer {
				height: 34px;
				line-height: 34px;
				background-color: white;
				padding: 0 15px;
				color: #646464;
				font-size: 14px;
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