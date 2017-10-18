<template>
	<div class="login">
		<div class="logo">
			<img src="../../static/img/loginlogo.png" />
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
				localhttp: localStorage.getItem('localhttp'),
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
		created() {
			function GetQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return ''
			}
			let openid = GetQueryString('openid')
			this.openid = openid
			if(this.openid === '1') {
				window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd0b68ce5e6fa1e14&redirect_uri=http://wx.dianke8.com/xxdk/app/weChat/pay/wxOpenid&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			}
		},
		methods: {
			login() {
				this.$http.get('/login', {
					params: {
						phone: this.iphone,
						password: this.pwd,
						openId: this.openid
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							console.log(res.data)
							sessionStorage.setItem('token', res.data.obj.token)
							this.$http.defaults.headers.post['token'] = sessionStorage.getItem('token')
							this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
							localStorage.setItem('loginname', this.iphone)
							localStorage.setItem('loginpwd', this.pwd)
							localStorage.setItem('loginopenid', this.openid)
							localStorage.setItem('userinfos', querystring.stringify(res.data.obj))
							if(sessionStorage.getItem('path')) {
								this.$router.replace(sessionStorage.getItem('path'))
								sessionStorage.removeItem('path')
							} else {
								window.location.href = '/#/pub/home'
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
			/*background: #f50;*/
			overflow: hidden;
			/*padding-top: 28px;*/
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
			margin-top: 12px;
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