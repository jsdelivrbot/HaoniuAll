<template>
	<div class="charge-account-box">
		<v-header title="运费帐户"></v-header>
		<group style="margin: 0 10px;">
			<x-input title="手机号码" value="18654443222" disabled>
				<span slot="right" style="color: #63bffe;">修改</span>
			</x-input>
		</group>
		<div class="charge">
			<p class="title">付款金额</p>
			<p class="content">
				<span>1000.00元</span>
				<span class="btn">提现</span>
			</p>
		</div>
		<div class="menu">
			<div class="item">
				<img src="../../../static/image/zhifumimashezhi@2x.png" />
				<p>支付密码设置</p>
			</div>
			<div class="item">
				<img src="../../../static/image/yinhangkaguanli@2x.png" />
				<p>银行卡管理</p>
			</div>
			<div class="item">
				<img src="../../../static/image/jiaoyijilu@2x.png">
				<p>交易记录</p>
			</div>
			<div class="item">
				<img src="../../../static/image/chongzhitixianjilu@2x.png">
				<p>充值提现记录</p>
			</div>
		</div>
		<div class="detail">
			<div class="detail-item">
				<span>支付时间：2017/10/27 23:06</span>
				<span class="label">已到账</span>
			</div>
			<div class="detail-item">
				<div>
					<p>收款帐号：1222 3333 3444 444</p>
					<p>收款人：李大川</p>
				</div>
				<span class="label">-30000元</span>
			</div>
			<div class="detail-item">
				<p>开户行：兴业银行南城支行</p>
			</div>
		</div>
		<div class="detail">
			<div class="detail-item">
				<span>支付时间：2017/10/27 23:06</span>
				<span class="label">已到账</span>
			</div>
			<div class="detail-item">
				<div>
					<p>收款帐号：1222 3333 3444 444</p>
					<p>收款人：李大川</p>
				</div>
				<span class="label">-30000元</span>
			</div>
			<div class="detail-item">
				<p>开户行：兴业银行南城支行</p>
			</div>
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
	.charge-account-box {
		padding-top: 45px;
		.charge {
			margin: 10px;
			background-color: white;
			padding: 15px;
			font-size: 16px;
			color: #63bffe;
			.content {
				font-size: 20px;
				text-align: center;
				margin-bottom: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				.btn {
					width: 72px;
					height: 24px;
					display: block;
					background-color: #63bffe;
					color: white;
					font-size: 14px;
					border-radius: 8px;
					margin-left: 20px;
					line-height: 24px;
				}
			}
		}
		.menu {
			margin: 10px;
			background-color: white;
			display: flex;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 15px 0;
				img {
					width: 48px;
				}
				p {
					font-size: 12px;
					margin-top: 5px;
				}
			}
		}
		.detail {
			margin: 10px;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			.detail-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.label {
					color: #63bffe;
				}
			}
		}
	}
</style>