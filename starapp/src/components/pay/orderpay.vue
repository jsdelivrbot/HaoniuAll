<template>
	<div class="order-pay">
		<topbar title='订单支付'></topbar>
		<div class="order-info">
			<div class="num">
				订单编号:{{ordernum}}
			</div>

			<div class="order-status">
				<span>
					订单状态: 	<em>待支付</em>
				</span>
				<clocker :time="detailInfo.orderEndDateString" slot="value" v-if='detailInfo.orderEndDateString'>
					请在&nbsp;&nbsp;<span>%_M1</span>
					<span>%_M2</span>:
					<span>%_S1</span>
					<span>%_S2</span>
				</clocker>
				&nbsp;&nbsp;支付
			</div>
			<h2 class="vux-1px-t">
				还需支付: 	<em>¥{{detailInfo.realPayment}}</em>
			</h2>
		</div>

		<ul class="select-pay">
			<li @click="selectPay=1">
				<img src="../../../static/img/wxpay.png" />
				<span>微信支付</span>
				<em :class="{'active':selectPay==1}">
				</em>
			</li>
			<!--<li class="vux-1px-t" @click="selectPay=2">
				<img src="../../../static/img/alipay.png" />
				<span>支付宝支付</span>
				<em :class="{'active':selectPay==2}">
				</em>
			</li>-->
		</ul>
		<div class="btn">
			<x-button type="primary" style='margin-top: 35px; background: #84BEF3;' @click.native="alipay">支付</x-button>
		</div>

	</div>
</template>
<script>
	import { XButton, Clocker } from 'vux'
	import topbar from '@/components/callback'
	export default {
		name: 'nokeep',
		components: {
			XButton,
			topbar,
			Clocker
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				detailInfo: '',
				selectPay: 1,
				ordernum: ''
			}
		},
		mounted() {
			let props = this.$route.params.id
			this.ordernum = props
			this.$http.get('/business/order/downOrderDetail', {
				params: {
					number: props
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
				}
			)
		},
		methods: {
			alipay() {
				let $this = this
				if(this.selectPay === 1) {
					this.$http.get('/weixin/pay?outTradeNo=' + this.ordernum).then(
						(res) => {
							if(res.data.result === 0) {
								$this.$CtoPay($this.selectPay, res.data.obj, function(res) {
									if(res === true) {
										plus.nativeUI.alert('支付成功！', function() {
											$this.$router.replace('/successpay/' + $this.ordernum)
										})
									} else {
										mui.toast('支付失败,请重试!')
									}
								})
							} else {
								mui.toast('请勿重复支付')
							}
						}
					)
				} else {
					this.$http.get('/ali/pay?outTradeNo=' + this.ordernum).then(
						(res) => {
							if(res.data.success) {
								$this.$CtoPay($this.selectPay, res.data.result, function(res) {
									if(res === true) {
										plus.nativeUI.alert('支付成功！', function() {
											$this.$router.replace('/successpay/' + $this.ordernum)
										})
									} else {
										mui.toast('支付失败,请重试!')
									}
								})
							} else {
								mui.toast('请勿重复支付')
							}
						}
					)
				}
			}
		}
	}
</script>
<style lang="less">
	.order-pay {
		height: auto;
		overflow: hidden;
		.select-pay {
			height: auto;
			overflow: hidden;
			margin-top: 10px;
			padding-left: 15px;
			background: #fff;
			li {
				display: flex;
				height: 44px;
				padding: 7px 15px;
				padding-left: 0;
				box-sizing: border-box;
				img {
					width: 30px;
					height: 30px;
					margin-right: 5px;
				}
				span {
					margin: 8px 0;
					height: 16px;
					line-height: 15px;
					font-size: 15px;
					text-align: left;
					flex: 1;
				}
				em {
					margin: 7px 0;
					width: 16px;
					height: 16px;
					background: url(../../../static/img/orderpay1.png) no-repeat center;
					background-size: 100%;
				}
				.active {
					background: url(../../../static/img/orderpay2.png) no-repeat center;
					background-size: 100%;
				}
			}
		}
		.order-info {
			height: auto;
			padding-bottom: 0;
			overflow: hidden;
			.num {
				height: 20px;
				font-size: 14px;
				color: #333;
				margin-bottom: 15px;
			}
			.order-status {
				height: 20px;
				font-size: 14px;
				display: flex;
				margin-bottom: 15px;
				span {
					width: 100px;
					flex: 1;
					em {
						margin-left: 8px;
						color: #ffa019;
						font-style: normal;
					}
				}
				>div {
					display: flex;
					div {
						display: flex;
						span {
							flex: 1;
							max-width: 8px;
							text-align: center;
							color: #ff1818;
						}
					}
				}
				/*div{
					flex: 1;
					.vux-clocker-tpl{
						display: flex;
					}
					.day{
						flex: 1;
					}
				}*/
			}
			h2 {
				height: 49px;
				line-height: 49px;
				font-size: 15px;
				em {
					margin-left: 8px;
					color: #ffa019;
					font-style: normal;
				}
			}
		}
	}
	
	.btn {
		padding: 15px;
		box-sizing: border-box;
	}
</style>