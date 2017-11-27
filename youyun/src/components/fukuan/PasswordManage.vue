<template>
	<div class="password_manage_box">
		<v-header title="支付密码管理"></v-header>
		<group>
			<x-input placeholder="请输入旧密码" v-model="old_password" type="password"></x-input>
		</group>
		<group>
			<x-input placeholder="请输入新密码" v-model="new_password" type="password"></x-input>
		</group>
		<group>
			<x-input placeholder="请再次输入新密码" v-model="new_password_agin" type="password"></x-input>
		</group>
		<p class="detail">忘记密码，请拨打400-623-0056</p>
		<div class="btn" @click="complete" v-show="!loading">
			确认修改
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { XInput, Group, Spinner } from 'vux'
	export default {
		data() {
			return {
				loading: false,
				old_password: '',
				new_password: '',
				new_password_agin: '',
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			'v-header': Header,
			XInput,
			Group,
			Spinner
		},
		methods: {
			complete() {
				if(this.old_password === '') {
					this.$vux.toast.text('请输入旧密码')
					return
				}
				if(this.new_password === '') {
					this.$vux.toast.text('请输入新密码')
					return
				}
				if(this.new_password_agin === '') {
					this.$vux.toast.text('请再次输入新密码')
					return
				}
				if(this.new_password !== this.new_password_agin) {
					this.$vux.toast.text('新密码输入不一致')
					return
				}
				this.loading = true
				this.$http.post('account/html/put/v1/up_pay_password?token=' + this.token, {
					data: {
						old_password: this.old_password,
						new_password: this.new_password
					}
				}).then((res) => {
					console.log(res)
					this.loading = false
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('支付密码修改成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.password_manage_box {
		padding-top: 44px;
		.weui-cells {
			margin: 10px;
			font-size: 13px;
			.weui-cell {
				padding: 15px;
			}
		}
		.detail {
			text-align: center;
			color: #999999;
			font-size: 13px;
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 25px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
		.disabled {
			background-color: #999999;
		}
	}
</style>