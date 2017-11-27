<template>
	<div class="get-cash-go-box">
		<v-header title="收益提现"></v-header>
		<p class="top-detail">支付宝账户提现</p>
		<div class="top">
			支付宝：{{pay}}
		</div>
		<p class="top-detail">提现金额</p>
		<group style="margin-top: 0;">
			<x-input title="金额（元）：" placeholder="最低50元起" style="font-size: 16px;" v-model="cash"></x-input>
		</group>
		<p class="detail">1、提现最低50元起，最高提现500元；</p>
		<p class="detail">2、每天提现次数不得超过10次；</p>
		<p class="detail">3、提现处理周期：自申请1--5个工作日内完成处理；</p>
		<p class="detail">4、如有任何疑问请咨询客服：0551-62681280。</p>
		<div class="btn" @click="getCash">
			提交申请
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Group, XInput } from 'vux'
	export default {
		data() {
			return {
				cash: '',
				pay: localStorage.getItem('ali_pay_phone')
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput
		},
		methods: {
			getCash() {
				if(this.cash === '') {
					this.$vux.toast.text('请输入提现金额')
					return
				}
				if(parseFloat(this.cash) < 50) {
					this.$vux.toast.text('提现金额最低50元起')
					return
				}
				if(parseFloat(this.cash) % 50 !== 0) {
					this.$vux.toast.text('提现金额需为50的倍数')
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=txsq', {
					params: {
						seachdata: {
							tx_num: this.cash
						}
					}
				}).then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						this.$vux.toast.text('申请成功')
						this.$router.replace('/usercenter/getCash')
					}else {
						this.$vux.toast.text(res.data.message)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.get-cash-go-box {
		padding: 44px 0 50px;
		.top-detail {
			font-size: 14px;
			height: 50px;
			line-height: 50px;
			color: #707070;
			padding-left: 15px;
		}
		.top {
			height: 50px;
			background: url(../../../static/usercenter/usercenterpay2.png) 12px center no-repeat;
			background-size: 37px 30px;
			background-color: white;
			font-size: 14px;
			line-height: 50px;
			padding-left: 60px;
		}
		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			text-align: center;
			height: 50px;
			color: white;
			line-height: 50px;
			background-color: #e70012;
			font-size: 16px;
			font-weight: 500;
		}
		.weui-cells__title {
			font-size: 12px;
		}
		.detail {
			font-size: 12px;
			color: #999999;
			padding-left: 15px;
		}
	}
</style>