<template>
	<section class="repayment-box">
		<v-header title='还款'></v-header>
		<div class="money" v-if="orderDetail">
			¥{{orderDetail.totalAmount.toFixed(2)}}
		</div>
		<ul class="repayment_detail_list">
			<li class="vux-1px-b">
				<span>借款金额</span>
				<em class="aggravate">{{orderDetail.borrowAmount}}</em>
			</li>
			<li class="vux-1px-b">
				<span>还款时间</span>
				<em>{{orderDetail.deadlineTime}}</em>
			</li>
			<li class="vux-1px-b">
				<span>逾期费用</span>
				<em>{{orderDetail.overCost}}</em>
			</li>
			<li class="vux-1px-b">
				<span>逾期天数</span>
				<em>{{orderDetail.overDay}}</em>
			</li>
			<li class="vux-1px-b">
				<span>还款总金额</span>
				<em>{{orderDetail.totalAmount}}</em>
			</li>
		</ul>

		<div class="global_btn_wrapper">
			<router-link tag='p' :to='"/huankuan/"+orderDetail.totalAmount' class="btn active">
				确认还款
			</router-link>
			<!--<p class="btn active">确认还款</p>-->
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				orderDetail: ''
			}
		},
		mounted() {
			this.$http.get('api/order/preRepaymentInfo').then(
				(res) => {
					if(res.data.result === 0) {
						this.orderDetail = res.data.obj
					}
					console.log(res.data)
				}
			)
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
				em {
					font-style: normal;
				}
				.aggravate {
					color: #666;
				}
			}
		}
	}
</style>