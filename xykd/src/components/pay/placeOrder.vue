<template>
	<section class="repayment-box">
		<v-header title='借款'></v-header>
		<div class="money">
			¥{{orderDetail.certifiedAmount}}.00
		</div>

		<ul class="repayment_detail_list">
			<li class="vux-1px-b">
				<span>用户管理费</span>
				<em class="aggravate">{{orderDetail.manageCost}}</em>
			</li>
			<li class="vux-1px-b">
				<span>利息费</span>
				<em class="aggravate">{{orderDetail.interest}}</em>
			</li>
			<li class="vux-1px-b">
				<span>实际到账金额</span>
				<em class="aggravate">{{orderDetail.actualAmount}}</em>
			</li>
			<li class="vux-1px-b">
				<span>还款时间</span>
				<em class="aggravate">{{orderDetail.deadlineTime}}</em>
			</li>
		</ul>

		<div class="global_btn_wrapper">
			<p class="btn active" @click="go">确认借款</p>
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
			this.$http.get('api/user/preBorrowInfo').then(
				(res) => {
					this.orderDetail = res.data.obj
					console.log(res.data)
				}
			)
		},
		methods: {
			go() {
				this.$http.post('api/order/apply', {
					borrowDay: 10
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示!',
								content: '借款成功!',
								onHide() {
									$this.$router.push('/borrowMoney')
								}
							})
						}
					}
				)
			}
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
				padding: 15px 10px;
				box-sizing: border-box;
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