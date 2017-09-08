<template>
	<div class="login">
		<div class="logo">
			<img src="../../../static/img/loginlogo.png" />
		</div>

		<div class="input vux-1px-tb">
			<span>手机号</span>
			<input type="text" v-model='iphone' placeholder="请输入手机号" />
		</div>

		<div class="input vux-1px-tb">
			<span>密码</span>
			<input type="password" v-model='pwd' placeholder="请输入密码" />
		</div>

		<router-link to='/forget' class='forget'>
			忘记密码?
		</router-link>

		<div class="button">
			<button class="btn-login" @click="login()"> 
				登录
			</button>
			<button class="btn-reg" @click="toreg()">
				注册
			</button>
		</div>

	</div>
</template>
<script>
	import { querystring } from 'vux'
	export default {
		data() {
			return {
				iphone: '',
				pwd: '',
				openid: ''
			}
		},
		beforeRouteEnter(to, from, next) {
			if(!sessionStorage.getItem('path')) {
				sessionStorage.setItem('path', from.path)
			}
			next()
		},
		methods: {
			login() {
				this.$http.get('/login', {
					params: {
						phone: this.iphone,
						password: this.pwd
					}
				}).then(
					(res) => {
						let $this = this
						console.log(JSON.stringify(res))
						if(res.data.result === 0) {
							sessionStorage.setItem('token', res.data.obj.token)
							this.$http.defaults.headers.post['token'] = sessionStorage.getItem('token')
							this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
							localStorage.setItem('loginname', this.iphone)
							localStorage.setItem('loginpwd', this.pwd)
							localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
							if(sessionStorage.getItem('path')) {
								this.$router.replace(sessionStorage.getItem('path'))
								sessionStorage.removeItem('path')
							} else {
								this.$router.push('/pub/home')
							}
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
						console.log(res.data)
					}
				)
			},
			toreg() {
				this.$router.push('/reg')
			}
		}
	}
</script>
<style lang="less">
	@import '~vux/src/styles/1px.less';
	body {
		background: #f0eff5;
	}
	
	.login {
		min-height: 100vh;
		.forget {
			display: block;
			padding: 0 15px;
			box-sizing: border-box;
			font-size: 12px;
			color: #84BEF3;
			text-align: right;
		}
		.logo {
			height: 150px;
			overflow: hidden;
			text-align: center;
			img {
				display: block;
				margin: auto;
				width: 76px;
				margin-top: 37px;
			}
		}
		.input {
			display: flex;
			height: 44px;
			background: #fff;
			margin-bottom: 10px;
			span {
				width: 60px;
				margin: 0 15px;
				line-height: 44px;
				text-align: center;
				font-size: 17px;
				color: #333;
				text-align: left;
			}
			input {
				flex: 1;
				border: none;
				line-height: 44px;
				font-size: 17px;
				outline: none;
				color: #333;
			}
		}
		.button {
			height: auto;
			overflow: hidden;
			padding: 0 15px;
			margin-top: 20px;
			box-sizing: border-box;
			button {
				height: 44px;
				width: 100%;
				font-size: 18px;
				margin-bottom: 15px;
				border-radius: 5px;
				border: none;
				background: #84BEF3;
				color: #fff;
			}
			.btn-reg {
				background: #fff;
				color: #000;
				position: relative;
			}
			.btn-reg:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				width: 200%;
				height: 1px;
				border: 1px solid #C7C7C7;
				color: #C7C7C7;
				border-radius: 10px;
				height: 200%;
				-webkit-transform-origin: left top;
				transform-origin: left top;
				-webkit-transform: scale(0.5);
				transform: scale(0.5);
			}
		}
	}
</style>