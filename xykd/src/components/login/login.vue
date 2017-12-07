<template>
	<div>
		<div class="login_box" v-if='loginStatus==0'>
			<div class="logo">
				<img src="./img/logo@3x.png" />
			</div>

			<div class="input vux-1px-b">
				<input type="text" class="vux-1px-b" v-model="username" placeholder="请输入手机号/用户名" />
			</div>

			<div class="btn_wrapper">
				<p class="btn" @click="toLogin">开始使用</p>
			</div>
		</div>

		<div class="password_login_box" v-if='loginStatus==1'>
			<v-header isLogin='login' @LoginBack='changeStatus(0)' title="密码登录">
				<div @click="changeStatus(2)">验证码登录</div>
			</v-header>

			<p class="login_title">用户名：{{username}}</p>

			<div class="input vux-1px-b">
				<input type="password" v-model="password" class="vux-1px-b" placeholder="请输入您的登录密码" />
			</div>

			<router-link tag='p' to='/forget' class="forget_password">
				忘记密码?
			</router-link>

			<div class="btn_wrapper">
				<p class="btn" :class="{active:password!==''}" @click="Login">登录</p>
			</div>
		</div>

		<div class="code_login_box" v-if='loginStatus==2'>
			<v-header isLogin='login' @LoginBack='changeStatus(1)' title="验证码登录"></v-header>

			<p class="login_title">验证码已发送至手机号：{{username}}</p>

			<div class="input vux-1px-b">
				<input type="text" v-model='code' class="vux-1px-b" placeholder="请输入短信验证码" />
				<span @click='getCode' :class="{active:isGetCode}">{{awaitText}}</span>
			</div>

			<div class="btn_wrapper">
				<p class="btn" :class="{active:code!==''}" @click='codeLogin'>登录</p>
			</div>
		</div>

	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		name: 'nokeep',
		components: {
			'v-header': Header
		},
		data() {
			return {
				loginStatus: 0,
				username: '18297911147',
				password: '',
				code: '',
				awaitText: '获取验证码',
				isGetCode: true
			}
		},
		mounted() {
			let $this = this
			mui.init({
				beforeback: function() {
					if($this.loginStatus !== 0) {
						$this.loginStatus -= 1
						return false
					} else {
						return true
					}
				}
			})
		},
		methods: {
			toLogin() {
				if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.username))) {
					this.$http.post('api/user/isExist', {
						phone: this.username
					}).then(
						(res) => {
							if(res.data.result !== 0) {
								let $this = this
								this.$vux.confirm.show({
									title: '提示!',
									content: '用户不存在是否注册?',
									onConfirm() {
										$this.loginStatus = 2
									}
								})
							} else {
								this.loginStatus = 1
							}
						}
					)
				} else {
					this.$vux.toast.text('请输正确手机号!', 'middle')
				}
			},
			changeStatus(status) {
				this.loginStatus = status
			},
			autoLogin(val) {
				localStorage.setItem('autoLogin', val)
			},
			Login() {
				if(this.password !== '') {
					this.$http.post('api/user/login', {
						phone: this.username,
						version: localStorage.getItem('version'),
						password: this.password
					}).then(
						(res) => {
							if(res.data.result === 0) {
								sessionStorage.setItem('token', res.data.obj.token)
								this.setUserInfo(res.data.obj)
								this.autoLogin(res.data.obj.autoLogin)
								this.$http.defaults.headers.common['token'] = sessionStorage.getItem('token')
								this.$router.replace('/borrowMoney')
							}
						}
					)
				} else {
					this.$vux.toast.text('请输入密码!', 'middle')
				}
			},
			codeLogin() {
				if(this.code !== '') {
					this.$http.post('api/user/login', {
						phone: this.username,
						version: localStorage.getItem('version'),
						code: this.code
					}).then(
						(res) => {
							if(res.data.result === 0) {
								this.setUserInfo(res.data.obj)
								sessionStorage.setItem('token', res.data.obj.token)
								this.autoLogin(res.data.obj.autoLogin)
								this.$http.defaults.headers.common['token'] = sessionStorage.getItem('token')
								this.$router.replace('/borrowMoney')
							}
						}
					)
				} else {
					this.$vux.toast.text('请输入验证码!', 'middle')
				}
			},
			getCode() {
				if(!this.isGetCode) {
					this.$vux.toast.text('验证码已发送!', 'middle')
					return false
				}
				this.$http.post('api/user/send', {
					phone: this.username
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.code = res.data.obj
							this.isGetCode = false
							let $this = this
							let time = 59
							let timeOut = setInterval(() => {
								if(time >= 0) {
									$this.awaitText = time + 's'
									time--
								} else {
									$this.awaitText = '获取验证码'
									$this.isGetCode = true
									clearInterval(timeOut)
								}
							}, 1000)
						}
					}
				)
			},
			setUserInfo(val) {
				localStorage.setItem('userInfo', JSON.stringify(val))
			}
		},
		beforeRouteLeave(to, from, next) {
			mui.init({
				beforeback: function() {
					return true
				}
			})
			next()
		}
	}
</script>
<style lang="less">
	.login_box {
		min-height: 100vh;
		background-color: white;
		.logo {
			width: 100%;
			height: 371px;
			overflow: hidden;
			img {
				width: 92px;
				height: 92px;
				display: block;
				margin: 119px auto 160px;
			}
		}
		.input {
			height: 48px;
			margin: 0 36px;
			box-sizing: border-box;
			input {
				width: 100%;
				height: 100%;
				outline: none;
				border: none;
				font-size: 12px;
				display: block;
			}
		}
		.btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 45px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #dbb76c;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: white;
			}
		}
	}
	
	.password_login_box {
		min-height: 100vh;
		padding-top: 48px;
		background-color: white;
		box-sizing: border-box;
		.login_title {
			padding: 0 30px;
			font-size: 14px;
			color: #4a4a4a;
			margin-top: 100px;
		}
		.input {
			height: 48px;
			margin: 20px 30px 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			input {
				width: 0;
				height: 100%;
				flex: 1;
				outline: none;
				border: none;
				font-size: 12px;
				display: block;
			}
		}
		.forget_password {
			text-align: right;
			font-size: 14px;
			padding: 10px 30px;
			color: #42cdfe;
			float: right;
		}
		.btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 81px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #e5e5e5;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: white;
			}
			.active {
				background: #dbb76c;
			}
		}
	}
	
	.code_login_box {
		min-height: 100vh;
		padding-top: 48px;
		background-color: white;
		box-sizing: border-box;
		.login_title {
			padding: 0 30px;
			font-size: 14px;
			color: #4a4a4a;
			margin-top: 100px;
		}
		.input {
			height: 48px;
			margin: 20px 30px 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			input {
				width: 0;
				height: 100%;
				flex: 1;
				outline: none;
				border: none;
				font-size: 12px;
				display: block;
			}
			span {
				flex: 0 0 auto;
				width: auto;
				min-width: 50px;
				padding: 0 10px;
				height: 30px;
				display: block;
				text-align: center;
				background-color: #e5e5e5;
				border-radius: 15px;
				color: #fff;
				font-size: 14px;
				line-height: 30px;
			}
			.active {
				background: #dbb76c;
			}
		}
		.btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 81px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #e5e5e5;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: #fff;
			}
			.active {
				background: #dbb76c;
			}
		}
	}
</style>