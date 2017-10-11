<template>
	<div class="get-cash-binding-pay-box">
		<v-header title="支付宝绑定"></v-header>
		<p class="top">
			<img src="../../../static/usercenter/usercenter-pay.png" />
		</p>
		<!--<group>
			<x-input title="姓名" placeholder="请输入您的姓名" style="font-size: 16px;"></x-input>
		</group>-->
		<group>
			<x-input title="帐号" placeholder="请输入您的支付宝帐号" style="font-size: 16px;" v-model="phone"></x-input>
			<x-input title="验证码" placeholder="请输入收到的验证码" style="font-size: 16px;" v-model="code" :show-clear="false">
				<span slot="right" class="slot-right" @click="getCode">
					获取验证码
					<span v-show="num > 0">({{num}})</span>
				</span>
			</x-input>
		</group>
		<p class="detail">1.支付宝账号只能输1次，一经绑定不能更换</p>
		<div class="btn" @click="bind">
			保存
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Group, XInput } from 'vux'
	export default {
		data() {
			return {
				phone: '',
				code: '',
				num: 0
			}
		},
		components: {
			'v-header': Header,
			Group,
			XInput
		},
		methods: {
			getCode() {
				if(this.num > 0) {
					this.$vux.toast.text('请60秒以后再试')
					return
				}
				if(this.phone.length !== 11) {
					this.$vux.toast.text('手机号码格式错误')
					return
				}
				this.num = 60
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_SendCode', {
					params: {
						seachdata: {
							username: this.phone
						}
					}
				}).then((res) => {
					if(res.data.datastatus === 1) {
						console.log(res)
						this.$vux.toast.text('验证码发送成功')
						setInterval(() => {
							this.num = this.num - 1
						}, 1000)
					} else {
						this.$vux.toast.text(res.data.message)
					}
				})
			},
			bind() {
				if(this.phone.length !== 11) {
					this.$vux.toast.text('手机号码格式错误')
					return
				}
				if(this.code === '') {
					this.$vux.toast.text('请输入验证码')
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_addalipayPhone', {
					params: {
						seachdata: {
							phone: this.phone,
							sendcode: this.code
						}
					}
				}).then((res) => {
					if(res.data.datastatus === 1) {
						this.$vux.toast.text('支付宝绑定成功')
						localStorage.setItem('ali_pay_phone', this.phone)
						this.$router.replace('/usercenter/getCashGo')
					} else {
						this.$vux.toast.text(res.data.message)
					}
				})
//				this.$vux.toast.text('支付宝绑定成功')
//				this.$router.push('/usercenter/getCashGo')
			}
		}
	}
</script>

<style lang="less">
	.get-cash-binding-pay-box {
		padding: 44px 0 50px;
		.top {
			height: 114px;
			color: #e80014;
			overflow: hidden;
			img {
				width: 72px;
				display: block;
				margin: 30px auto 0;
			}
		}
		.slot-right {
			/*width: 69px;*/
			padding: 0 4px;
			height: 24px;
			line-height: 24px;
			border-radius: 24px;
			display: block;
			background-color: #e70012;
			font-size: 12px;
			color: white;
			text-align: center;
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