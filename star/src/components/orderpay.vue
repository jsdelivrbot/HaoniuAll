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
		<div class="btn">
			<x-button type="primary" @click.native="topay">微信支付</x-button>
		</div>

	</div>
</template>
<script>
	import { XButton, Clocker } from 'vux'
	import topbar from '../components/callback'
	export default {
		components: {
			XButton,
			topbar,
			Clocker
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				token: sessionStorage.getItem('token'),
				detailInfo: '',
				ordernum: ''
			}
		},
		activated() {
			let props = this.$route.params.id
			this.ordernum = props
			this.$http.get('/business/order/downOrderDetail', {
				params: {
					number: props
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
					console.log(res.data)
				}
			)

			let url = window.location.href
			this.$http.get('/weChat/pay/payStart', {
				params: {
					'url': url
				}
			}).then(
				(res) => {
					this.$wechat.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.data.obj.appid, // 必填，公众号的唯一标识
						timestamp: res.data.obj.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.data.obj.nonceStr, // 必填，生成签名的随机串
						signature: res.data.obj.signature, // 必填，签名，见附录1
						jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					})
				}
			)
		},
		methods: {
			topay() {
				this.$http.get('/weChat/pay/payOrderMoney', {
					params: {
						outTradeNo: this.ordernum
					}
				}).then(
					(res) => {
						let $this = this
						this.$wechat.chooseWXPay({
							timestamp: res.data.obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: res.data.obj.nonceStr, // 支付签名随机串，不长于 32 位
							package: res.data.obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							signType: res.data.obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: res.data.obj.paySign, // 支付签名
							success: function(data) {
								$this.$router.replace('/successpay/' + $this.ordernum)
							}
						})
						console.log(res.data)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.order-pay {
		height: auto;
		overflow: hidden;
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