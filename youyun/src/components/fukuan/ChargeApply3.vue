<template>
	<div class="charge-apply3-box">
		<v-header title="运费申请"></v-header>
		<div class="tab">
			<div class="tab-item">
				运费信息
			</div>|
			<div class="tab-item current">
				支付信息
			</div>
		</div>
		<div class="item">
			<p class="red">运费总额：35000.00元</p>
			<p>
				<span class="name">预付：35000</span>
				<span class="value1">已付：35000.00</span>
			</p>
			<p>
				<span class="name">回单押金：35000</span>
				<span class="value1">未付：13000.00</span>
			</p>
			<p>
				<span class="name">运费增项：12000</span>
				<span class="value2">途用油卡，途用油卡</span>
			</p>
			<p>
				<span class="name">运费减项：35000</span>
				<span class="value2">货物损坏，货物损坏</span>
			</p>
		</div>
		<div class="item">
			<p>收款人：李大川</p>
			<p>收款帐号：6222 5666 7888 988</p>
			<p>开户行：兴业银行南城支行</p>
		</div>
		<div class="item">
			<p class="current">支付金额：3000元</p>
			<p class="detail">
				<span>2017/10/20 20:06</span><span>李大川</span><span>申请</span><span class="attr">成功</span>
			</p>
			<p class="detail">
				<span>2017/10/20 20:06</span><span>王项目</span><span>审核</span><span class="attr">通过</span>
			</p>
			<p class="detail">
				<span>2017/10/20 20:06</span><span>王大锤</span><span>支付</span><span class="attr">成功</span>
			</p>
			<p class="detail">
				<span>2017/10/20 20:06</span><span>到账</span><span class="attr">成功</span>
			</p>
		</div>
		<div class="item footer-item">
			<p>
				<span class="current">本次申请：4000元</span>
				<span class="label">支付审核</span>
			</p>
			<p>
				<span>2017/10/20 20:06</span><span>王大锤</span><span>支付</span><span class="attr">成功</span>
			</p>
		</div>
		<div class="nothing">
			<img src="../../../static/image/zanwu@2x.png" />
			<p>当前暂无任何信息</p>
		</div>
		<div class="btn">
			<div class="btn1">运费申请</div>
			<div class="btn2">修改运费</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.charge-apply3-box {
		padding-top: 85px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			color: #999999;
			line-height: 40px;
			.tab-item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #646464;
				&.current {
					color: #63bffe;
				}
			}
		}
		.item {
			margin: 10px 10px 0;
			padding: 15px;
			background-color: white;
			font-size: 14px;
			p {
				display: flex;
				&.red {
					color: #ff423a;
				}
				.name {
					width: 136px;
					flex: 0 0 136px;
				}
				.value1 {
					color: #6a6a6a;
					margin-left: 24px;
				}
				.value2 {
					color: #969696;
				}
				&.current {
					color: #63bffe;
					font-size: 16px;
				}
				&.detail {
					color: #959595;
					display: flex;
					justify-content: space-between;
					.attr {
						width: 56px;
					}
				}
			}
		}
		.footer-item {
			p {
				display: flex;
				justify-content: space-between;
				.current {
					color: #fcaa56;
				}
				.label {
					color: #63bffe;
				}
				.attr {
					width: 56px;
				}
			}
		}
		.nothing {
			width: 100%;
			height: 134px;
			margin-top: 10px;
			background-color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			display: none;
			img {
				width: 40px;
				height: 40px;
			}
			p {
				font-size: 16px;
				color: #9a9a9a;
				padding-top: 4px;
			}
		}
		.btn {
			display: flex;
			justify-content: space-around;
			padding: 22px 0;
			.btn1,.btn2 {
				width: 130px;
				height: 35px;
				border-radius: 16px;
				font-size: 16px;
				text-align: center;
				line-height: 35px;
			}
			.btn1 {
				background-color: #63bffe;
				color: white;
			}
			.btn2 {
				background-color: #fdd828;
				color: #636766;
			}
		}
	}
</style>