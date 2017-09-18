<template>
	<div class="reg-box">
		<!--<div class="top-out-bar">
			<img src="../../static/img/left.svg" />
			<span>注册</span>
		</div>-->

		<goback title='注册'></goback>

		<group>
			<x-input title="手机号" text-align='right' placeholder="请输入您的手机号" v-model='username' novalidate placeholder-align="right"></x-input>
			<x-input title="密&nbsp&nbsp&nbsp码" type='password' text-align='right' v-model='pwd' placeholder="请输入您的密码" novalidate placeholder-align="right"></x-input>
		</group>

		<p class="forget">
			<a href="#">
				忘记密码?
			</a>
		</p>

		<div class="login-btn">
			<button @click='reg()'>注册</button>
		</div>

		<p style="color: #999999;text-align: center;font-size: 14px;">点击'注册' 即表示您同意本公司的</p>
		<router-link to='/regxy' style="display: block;text-align: center;color: #ff5d5c;">
			《平台使用协议》
		</router-link>
	</div>
</template>
<script>
	import goback from '../components/goback'
	import { XInput, Group, XButton, Cell } from 'vux'

	export default {
		components: {
			XInput,
			Group,
			XButton,
			Cell,
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				username: '',
				pwd: ''
			}
		},
		methods: {
			reg() {
				if(this.username.length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号!'
					})
					return false
				}
				if(this.pwd === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入您的密码!'
					})
					return false
				}

				this.$http.post(this.lchttp + '/app/common/register?phone=' + this.username + '&password=' + this.pwd).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '恭喜您,注册成功!',
								onHide() {
									let val = res.data.obj
									localStorage.setItem('token', val.token)
									$this.$http.defaults.headers.get['token'] = localStorage.getItem('token')
									$this.$router.push('/')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.reg-box {
		min-height: 100vh;
		padding-top: 46px;
		box-sizing: border-box;
	}
</style>