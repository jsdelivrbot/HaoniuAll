<template>
	<div class="charge-apply5-box">
		<v-header title="运费申请" :iconShow="true"></v-header>
		<div class="item">
			<p>
				运单号：123450-1
				<span class="label">未支付</span>
			</p>
			<p>建单时间：2017-09-09 12:23</p>
			<p>皖A12345，袁自林，13900000000</p>
			<p>安徽-合肥-高新区 至 四川-成都-金牛区</p>
		</div>
		<group style="margin: 0 10px;">
			<x-input title="收款人姓名：" value="王某某" disabled></x-input>
			<x-input title="收款人卡号：" value="6222 5666 7888 988" disabled></x-input>
			<x-input title="开户行：" value="兴业银行南城支行" disabled></x-input>
		</group>
		<div class="charge">
			<p class="title">付款金额</p>
			<p class="content">8000.00元</p>
		</div>
		<div class="checked">
			<p class="title">付款方式</p>
			<div class="content">
				<p>
					<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked1" @click="checked1=!checked1;checked2=false" />
					<img src="../../../static/image/gouxuan@2x.png" v-show="checked1" @click="checked1=!checked1;checked2=false" />
					<span>自有资金</span>
				</p>
				<checker default-item-class="checked-item" selected-item-class="item-selected" style="margin-left: 10px;">
					<div class="option-item">
						<checker-item value="1"></checker-item>
						<span class="text">平安银行（尾号098）</span>
					</div>
					<div class="option-item">
						<checker-item value="2"></checker-item>
						<span class="text">兴业银行（尾号344）</span>
					</div>
				</checker>
				<p>
					<img src="../../../static/image/weigouxuan@2x.png" v-show="!checked2" @click="checked2=!checked2;checked1=false" />
					<img src="../../../static/image/gouxuan@2x.png" v-show="checked2" @click="checked2=!checked2;checked1=false" />
					<span>自有资金</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XInput, Checker, CheckerItem } from 'vux'
	export default {
		data() {
			return {
				checked1: false,
				checked2: false
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput,
			Checker,
			CheckerItem
		}
	}
</script>

<style lang="less">
	.charge-apply5-box {
		padding-top: 45px;
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			p {
				display: flex;
				justify-content: space-between;
				.label {
					color: #ff423a;
				}
			}
		}
		.charge {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			.content {
				font-size: 20px;
				color: #63bffe;
				text-align: center;
				margin-bottom: 10px;
			}
		}
		.checked {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			.content {
				p {
					font-size: 14px;
					height: 40px;
					display: flex;
					align-items: center;
					img {
						width: 24px;
						height: 24px;
						margin-right: 10px;
					}
				}
				.checked-item {
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
				.option-item {
					display: flex;
					align-items: center;
					font-size: 14px;
					height: 34px;
					.text {
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>