<template>
	<div class="reg_box">
		<goback title='注册账号'></goback>

		<div class="form_box vux-1px-b">
			<!--<x-input placeholder="请输入您的真实姓名" v-model='username'></x-input>-->
			<x-input type="tel" placeholder="请输入11位手机号码" v-model='phone'>
				<x-button @click.native="sendCode" slot="right" style='background: #0c81e0;' type="primary" mini>{{word}}</x-button>
			</x-input>
			<x-input type="number" placeholder="请输入验证码" v-model='phoneCode'></x-input>
			<x-input type="password" placeholder="再次输入验证码作为密码" v-model='pwd2'></x-input>
			<!--<x-input type="password" placeholder="请确认密码" v-model='pwd2'></x-input>-->
		</div>

		<div class="agreement_line">
			注册即视为同意
			<a href="#">《用户注册协议》</a>
		</div>
		<div class="submit">
			<button class="pub_button" @click="reg">提交</button>
		</div>
	</div>
</template>
<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	import goback from '@/components/return'
	export default {
		name: 'reg',
		data() {
			return {
				username: '',
				phone: '',
				pwd1: '',
				pwd2: '',
				password: '',
				phoneCode: '',
				word: '发送验证码',
				isOvertime: false
			}
		},
		methods: {
			sendCode() {
				if(this.phone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入账号'
					})
					return
				}
				if(this.isOvertime) {
					return false
				}
				let that = this
				let time = 60
				var sendTimer = setInterval(function() {
					that.isOvertime = true
					time--
					that.word = '重新发送' + time
					if(time < 0) {
						that.isOvertime = false
						clearInterval(sendTimer)
						that.word = '获取验证码'
					}
				}, 1000)
				this.$http.get('/api/common/sendPhoneCode', {
					params: {
						phone: this.phone
					}
				}).then((res) => {
					console.log(res.data.obj)
					if(res.data.result === 0) {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '发送成功'
						})
					} else {
						this.$vux.loading.hide()
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			reg() {
				//				if(this.username === '') {
				//					this.$vux.alert.show({
				//						title: '提示',
				//						content: '请输入真实姓名'
				//					})
				//					return
				//				}
				if(this.phone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入手机号'
					})
					return
				}
				//				if(this.pwd1 === '') {
				//					this.$vux.alert.show({
				//						title: '提示',
				//						content: '请输入密码'
				//					})
				//					return
				//				}
				//				if(this.pwd2 === '') {
				//					this.$vux.alert.show({
				//						title: '提示',
				//						content: '请再次输入密码'
				//					})
				//					return
				//				}
				if(this.phoneCode === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入验证码'
					})
					return
				}
				if(this.phoneCode !== this.pwd2) {
					this.$vux.alert.show({
						title: '提示',
						content: '密码与验证码不一致'
					})
					return
				}
				this.$http.get('/api/frontBase/user/register', {
					params: {
						phone: this.phone,
						password: this.pwd2,
						phoneCode: this.phoneCode
					}
				}).then((res) => {
					if(res.data.result === 0) {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '注册成功'
						})
						//跳转路由
						this.$router.replace('/login')
					} else {
						this.$vux.loading.hide()
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			}
		},
		components: {
			goback,
			XInput,
			Group,
			XButton,
			Cell
		}
	}
</script>
<style lang="less">
	.pub_button {
		height: 40px;
		border-radius: 3px;
		width: 100%;
		border: none;
		color: #fff;
		background: #0c81e0;
	}
	
	.reg_box {
		padding-top: 44px;
		.form_box {
			margin-top: 20px;
		}
		.agreement_line {
			text-indent: 15px;
			margin: 15px 0;
			font-size: 14px;
			color: #999999;
			a {
				color: #0c81e0;
			}
		}
		.submit {
			margin-top: 30px;
			padding: 0 50px;
			box-sizing: border-box;
		}
	}
</style>