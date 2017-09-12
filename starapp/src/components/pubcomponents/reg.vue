<template>
	<div class="reg">
		<topbar title='注册'></topbar>
		<div class="form">
			<div class="input vux-1px-tb">
				<input type="text" v-model='iphone' placeholder="请输入11位手机号" />
				<span @click="getCode">{{codetxt}}</span>
			</div>
			<div class="input vux-1px-tb">
				<input type="text" v-model='code' placeholder="请输入短信验证码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='pwd' placeholder="请输入6-18位密码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="password" v-model='repwd' placeholder="重复密码" />
			</div>
			<div class="input vux-1px-tb">
				<input type="text" v-model='nickname' placeholder="如何称呼您" />
			</div>
			<div class="check">
				<check-icon :value.sync="ischeck"></check-icon>
				<span>
					<em>已阅读并同意 </em>
					<router-link to='/compact'>
						星星点课用户注册协议
					</router-link>
				</span>
			</div>
		</div>

		<div class="button">
			<button @click="reg()">
				注册
			</button>
		</div>

	</div>
</template>
<script>
	import { CheckIcon } from 'vux'
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar,
			CheckIcon
		},
		data() {
			return {
				iphone: '',
				code: '',
				pwd: '',
				repwd: '',
				nickname: '',
				openid: '',
				headUrl: '',
				codetxt: ' 发送验证码  ',
				time: 0,
				ischeck: false
			}
		},
		//		mounted() {
		//			function GetQueryString(name) {
		//				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		//				var r = window.location.search.substr(1).match(reg)
		//				if(r != null) return unescape(r[2])
		//				return ''
		//			}
		//			this.openid = GetQueryString('openid')
		//			this.headUrl = GetQueryString('headimgurl')
		//		},
		methods: {
			getCode() {
				if(this.time > 0) {
					return false
				}
				if(!(/^1[1-9][0-9]\d{4,8}$/.test(this.iphone))) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号码!'
					})
					return false
				}
				let $this = this
				this.time = 60
				this.$http.get('/sendPhoneCode', {
					params: {
						phone: this.iphone,
						type: 0
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '获取成功,请注意查看!'
							})
							$this.codetime()
						} else {
							$this.time = 60
							this.$vux.alert.show({
								title: '提示',
								content: '获取失败,请重试!'
							})
						}
					}
				)
			},
			codetime() {
				let $this = this
				if(this.time >= 0) {
					setTimeout(function() {
						$this.codetxt = '(' + $this.time + 's)重新发送'
						$this.time--
						$this.codetime()
					}, 1000)
				} else {
					$this.codetxt = '发送验证码'
				}
			},
			reg() {
				if(!(/^1[1-9][0-9]\d{4,8}$/.test(this.iphone))) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确的手机号码!'
					})
					return false
				}

				if(this.pwd.length < 6) {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入6-18位密码!'
					})
					return false
				}

				if(this.repwd === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请再次输入密码!'
					})
					return false
				}

				if(this.repwd !== this.pwd) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次输入的密码不一致!'
					})
					return false
				}

				if(this.nickname === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入您的昵称!'
					})
					return false
				}

				if(!this.ischeck) {
					this.$vux.alert.show({
						title: '提示',
						content: '请同意用户协议!'
					})
					return false
				}

				this.$http.get('/register', {
					params: {
						phone: this.iphone,
						password: this.repwd,
						phoneCode: this.code,
						nickname: this.nickname
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							localStorage.removeItem('username')
							localStorage.setItem('loginname', this.iphone)
							localStorage.setItem('loginpwd', this.repwd)
							localStorage.setItem('loginopenid', this.openid)
							sessionStorage.setItem('regpath', 'regs')
							this.$vux.alert.show({
								title: '成功!',
								content: '恭喜您,注册成功!',
								onHide() {
									sessionStorage.setItem('token', res.data.obj)
									$this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
									$this.$router.push('/pub/home')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '失败',
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
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #999;
	}
	
	.button {
		height: auto;
		overflow: hidden;
		padding: 0 15px;
		/*margin-top: 20px;*/
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
	
	.reg {
		height: auto;
		overflow: hidden;
		.check {
			padding: 0 12px;
			box-sizing: border-box;
			font-size: 12px;
			color: #999;
			padding-top: 9px;
			height: 40px;
			/*background: #f50;*/
			.weui-icon-circle {
				font-size: 20px;
			}
			.weui-icon-success {
				font-size: 20px;
			}
			>span {
				>em {
					font-style: normal;
				}
				>a {
					color: #84BEF3;
				}
			}
		}
		.form {
			margin-top: 60px;
			.input {
				display: flex;
				height: 44px;
				background: #fff;
				margin-bottom: 5px;
				span {
					flex: 1;
					margin: 0 15px;
					line-height: 44px;
					text-align: center;
					font-size: 14px;
					color: #666;
					text-align: left;
					text-align: center;
				}
				input {
					flex: 1;
					border: none;
					line-height: 44px;
					font-size: 17px;
					outline: none;
					color: #333;
					text-indent: 15px;
				}
			}
		}
	}
</style>