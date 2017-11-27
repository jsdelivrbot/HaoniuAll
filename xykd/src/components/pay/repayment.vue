<template>
	<section class="repayment-box">
		<v-header title='还款'></v-header>
		<div class="money">
			¥2000.00
		</div>

		<ul class="repayment_detail_list">
			<li class="vux-1px-b">
				<span>还款总金额</span>
				<em class="aggravate">2000</em>
			</li>
			<li class="vux-1px-b">
				<span>认证费用</span>
				<em>2000</em>
			</li>
			<li class="vux-1px-b">
				<span>利息</span>
				<em>2000</em>
			</li>
			<li class="vux-1px-b">
				<span>用户管理费</span>
				<em>2000</em>
			</li>
		</ul>

		<div class="global_btn_wrapper">
			<p class="btn">确认还款</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>
<style lang="less">
	.repayment-box {
		min-height: 100vh;
		background: #fff;
		padding-top: 48px;
		box-sizing: border-box;
		.money {
			line-height: 120px;
			text-align: center;
			color: #DBB76C;
			font-size: 33px;
		}
		.repayment_detail_list {
			height: auto;
			overflow: hidden;
			padding: 0 10px;
			box-sizing: border-box;
			margin-bottom: 80px;
			li {
				padding: 10px;
				display: flex;
				font-size: 14px;
				color: #666;
				span {
					flex: 1;
				}
				
				em{
					font-style: normal;
				}
				
				.aggravate{
					color: #666;
				}
			}
		}
	}
</style>