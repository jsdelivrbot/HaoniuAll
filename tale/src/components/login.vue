<template>
	<div class="login-box">
		<goback title='登录' islink='/reg' linkname='注册'></goback>
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
			<button @click='login'>登录</button>
		</div>

		<div class="other">
			<divider>第三方登录</divider>
			<div class="box">
				<div class="icon" @click="otherlogin()">
					<img src="../../static/img/46.png" />
					<span>微信登录</span>
				</div>
				<div class="icon" @click="otherlogin2()">
					<img src="../../static/img/44.png" />
					<span>QQ登录</span>
				</div>
			</div>
			<!--<img src="../../static/img/43.png" />-->

			<!--<div class="icon">
				<img src="../../static/img/45.png" />
				<span>微博登录</span>
			</div>-->
		</div>

	</div>
</template>
<script>
	import goback from '../components/goback'
	import { XInput, Group, XButton, Cell, Divider } from 'vux'
	export default {
		components: {
			XInput,
			XButton,
			Group,
			Cell,
			goback,
			Divider
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				username: '',
				pwd: '',
				openid: '',
				nickname: '',
				headimgurl: ''
			}
		},
		beforeRouteEnter(to, from, next) {
			if(!sessionStorage.getItem('path')) {
				sessionStorage.setItem('path', from.path)
			}
			next()
		},
		methods: {
			otherlogin() {
				var auths = null
				let $this = this
				plus.oauth.getServices(function(services) {
					auths = services
					var s
					for(var i = 0; i < auths.length; i++) {
						if(auths[i].id === 'weixin') {
							s = auths[i]
							break
						}
					}
					if(!s.authResult) {
						s.login(function(e) {
							s.getUserInfo(function(e) {
								console.log(s.userInfo)
								$this.openid = s.userInfo.openid
								$this.nickname = s.userInfo.nickname
								$this.headimgurl = s.userInfo.headimgurl
								$this.logintwo()
							}, function(e) {})
						}, function(e) {
							mui.toast('登录认证失败')
						})
					} else {
						$this.openid = s.userInfo.openid
						$this.nickname = s.userInfo.nickname
						$this.headimgurl = s.userInfo.headimgurl
						$this.logintwo()
					}
				}, function(e) {
					mui.toast('登录认证失败')
				})
			},
			otherlogin2() {
				var auths = null
				let $this = this
				plus.oauth.getServices(function(services) {
					auths = services
					var s
					for(var i = 0; i < auths.length; i++) {
						if(auths[i].id === 'qq') {
							s = auths[i]
							break
						}
					}
					if(!s.authResult) {
						s.login(function(e) {
							s.getUserInfo(function(e) {
								console.log(JSON.stringify(s.authResult))
								console.log(JSON.stringify(s.userInfo))
								$this.openid = s.authResult.openid
								$this.nickname = s.userInfo.nickname
								$this.headimgurl = s.userInfo.figureurl_qq_2
								$this.logintwo()
							}, function(e) {})
						}, function(e) {
							mui.toast('登录认证失败')
						})
					} else {
						$this.openid = s.authResult.openid
						$this.nickname = s.userInfo.nickname
						$this.headimgurl = s.userInfo.figureurl_qq_2
						$this.logintwo()
					}
				}, function(e) {
					mui.toast('登录认证失败')
				})
			},
			logintwo() {
				this.$vux.loading.show({
					text: '登录中....'
				})
				console.log(this.openid)
				console.log(this.headimgurl)
				console.log(this.nickname)
				this.$http.get(this.lchttp + '/app/common/wxRegister', {
					params: {
						openid: this.openid,
						nickname: this.nickname,
						headimgurl: this.headimgurl
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.loading.hide()
							this.$vux.alert.show({
								title: '提示',
								content: '恭喜您,登录成功!',
								onHide() {
									let val = res.data.obj
									localStorage.setItem('token', val.token)
									$this.$http.defaults.headers.get['token'] = localStorage.getItem('token')
									$this.$router.replace(sessionStorage.getItem('path'))
									sessionStorage.removeItem('path')
								}
							})
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
			login() {
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
				this.$http.post(this.lchttp + '/app/common/login?phone=' + this.username + '&password=' + this.pwd).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '恭喜您,登录成功!',
								onHide() {
									let val = res.data.obj
									localStorage.setItem('token', val.token)
									$this.$http.defaults.headers.get['token'] = localStorage.getItem('token')
									$this.$router.replace(sessionStorage.getItem('path'))
									sessionStorage.removeItem('path')
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
	.login-box {
		background: #f3f3f3;
		min-height: 100vh;
		padding-top: 46px;
		box-sizing: border-box;
	}
	
	.forget {
		padding: 10px 20px;
		box-sizing: border-box;
		text-align: right;
		color: #666666;
	}
	
	.other {
		text-align: center;
		padding: 0 40px;
		box-sizing: border-box;
		/*display: flex;*/
		.box {
			display: flex;
		}
		.icon {
			flex: 1;
			img {
				width: 50px;
				margin: auto;
				margin-top: 10px;
			}
			span {
				font-size: 16px;
				color: #333;
			}
		}
	}
	
	.login-btn {
		padding: 20px;
		box-sizing: border-box;
		button {
			width: 100%;
			height: 44px;
			background: #ff5d5c;
			border-radius: 5px;
			border: none;
			font-size: 16px;
			letter-spacing: 2px;
			color: #fff;
		}
	}
</style>