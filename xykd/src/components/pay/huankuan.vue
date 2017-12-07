<template>
	<div class="pay_box">
		<v-header title="立即还款"></v-header>
		<div class="content">
			<p>￥{{money}}</p>
			<div>
				还款金额
			</div>
		</div>

		<div class="pay_select_list vux-1px-tb">
			<div class="item vux-1px-b" @click="current = 1">
				<img src="./img/weicinzhifu@3x.png" class="icon icon0" />
				<p class="text">微信支付</p>
				<div class="label" :class="{current: current === 1}"></div>
			</div>
			<div class="item" @click="current = 2">
				<img src="./img/zhifubao@3x.png" class="icon icon2" />
				<p class="text">支付宝支付</p>
				<div class="label" :class="{current: current === 2}"></div>
			</div>
		</div>

		<div class="global_btn_wrapper">
			<p class="btn active" v-if="current!==''" @click="toPayment">确认支付</p>
			<p class="btn" v-else>确认支付</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		data() {
			return {
				current: 1,
				money: '',
				detail: ''
			}
		},
		components: {
			'v-header': Header
		},
		mounted() {
			this.money = (this.$route.params.money * 1).toFixed(2)
			this.$http.get('api/order/preRenewal').then(
				(res) => {
					this.detail = res.data.obj
					console.log(res.data)
				}
			)
		},
		methods: {
			toPayment() {
				let $this = this
				if(this.current !== 1) {
					this.$http.post('api/payment/pay', {
						type: 1,
						payment: 0
					}).then(
						(res) => {
							this.$CtoPay($this.current, res.data.obj, function(res) {
								if(res === true) {
									plus.nativeUI.alert('支付成功！', function() {
										$this.$router.replace('/paySuccess')
									})
								} else {
									mui.toast('支付失败,请重试!')
								}
							})
						}
					)
				} else {
					this.$router.push('/wechatPay')
				}
			}
		}
	}
</script>

<style type="text/css">

</style>