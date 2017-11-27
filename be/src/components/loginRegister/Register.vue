<template>
	<div class="register-box">
		<div class="title">
			<div class="back" @click="back">
				<span class="iconfont icon-fanhui"></span>
			</div>
		</div>
		<div class="content">
			<div class="input-group">
				<div class="item">
					<div class="input first-input">
						<span class="label">手机号：</span>
						<input type="text" placeholder="请输入手机号获取验证码" v-model="phone" />
					</div>
				</div>
				<div class="item">
					<div class="input">
						<span class="label">验证码：</span>
						<input type="text" placeholder="请填写验证码" v-model="code" />
						<span class="getcode" @click="getCode">
							发送验证码
							<span v-show="count > 0">({{count}})</span>
						</span>
					</div>
				</div>
				<div class="item">
					<div class="input">
						<span class="label">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
						<input type="password" placeholder="6-16位，字母区分大小写" v-model="psw" />
					</div>
				</div>
				<div class="item">
					<div class="input">
						<span class="label">确&nbsp;&nbsp;&nbsp;&nbsp;认：</span>
						<input type="password" placeholder="再输入一次密码" v-model="pswAgin" />
					</div>
				</div>
				<div class="agree">
					<input class="checked" type="checkbox" v-model="checked" />
					<span>
						我已阅读并同意遵守
						<router-link to="/agreement" href="#">《爱蜂享服务协议》</router-link>
					</span>
				</div>
			</div>
		</div>
		<div class="btn">
			<p @click="reg">注&nbsp;&nbsp;&nbsp;&nbsp;册</p>
		</div>
		<!--<div class="slider">
			<p>第三方注册</p>
		</div>
		<div class="otherway">
			<img src="../../../static/login4.png" />
			<img src="../../../static/login5.png" />
		</div>-->
		<div class="bg_img">
			<img src="../../../static/usercenter/loginbg.png" />
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$router.back(-1)
			},
			countChange() {
				this.count = this.count - 1
			},
			getCode() {
				if(this.count > 0) {
					this.$vux.toast.show({
						text: '请60秒以后再试',
						type: 'text',
						time: 1000
					})
					return
				}
				if(String.trim(this.phone).length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '手机号码输入错误'
					})
					return
				}
				this.$http.get('getData/home/Form/usercenter_SCCode').then((res) => {
					let sccode = res.data.data.sccode
					sccode = sccode * 3 / 2 + 4
					this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_SendCode', {
						params: {
							seachdata: {
								'username': String.trim(this.phone),
								'sccode': sccode
							}
						}
					}).then((res) => {
						if(res.data.result === 1) {
							this.count = 60
							this.$vux.toast.show({
								text: '发送成功',
								type: 'success',
								time: 1000
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.message
							})
						}
					})
				})
			},
			reg() {
				if(String.trim(this.phone).length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '手机号码输入错误'
					})
					return false
				}
				if(this.code === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入验证码'
					})
					return false
				}
				if(this.psw.length < 6 || this.psw.length > 16) {
					this.$vux.alert.show({
						title: '提示',
						content: '密码需要在6-16位之间'
					})
					return false
				}
				if(this.pswAgin === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入确认密码'
					})
					return false
				}
				if(this.pswAgin !== this.psw) {
					this.$vux.alert.show({
						title: '提示',
						content: '两次密码输入不一致'
					})
					return false
				}
				if(!this.checked) {
					this.$vux.alert.show({
						title: '提示',
						content: '请同意爱蜂享服务协议'
					})
					return false
				}
				console.log('test')
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_Regist', {
						params: {
							seachdata: {
								'username': this.phone,
								'sendcode': this.code,
								'password': this.psw
							}
						}
					})
					.then((res) => {
						let $this = this
						if(res.data.result === 1 && !res.data.data && res.data.datastatus === 1) {
							this.$vux.alert.show({
								title: '提示',
								content: '注册成功',
								time: 1000,
								onHide() {
									$this.$router.replace('/login')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.message
							})
						}
						console.log(res)
					})
			}
		},
		data() {
			return {
				phone: '',
				code: '',
				psw: '',
				pswAgin: '',
				checked: true,
				count: -1
			}
		},
		watch: {
			//			checked() {
			//				console.log(this.checked)
			//			},
			count: function() {
				if(this.count === 60) {
					var timer = setInterval(this.countChange, 1000)
				}
				if(this.count < 0) {
					clearInterval(this.timer)
				}
			}

		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.register-box {
		width: 100%;
		min-height: 100vh;
		/*background: linear-gradient(#f39500, #e60112);*/
		/*background: url(../../../static/usercenter/loginbg.png) center no-repeat;
		background-size: cover;*/
		.bg_img {
			width: 100%;
			min-height: 100vh;
			overflow: hidden;
			position: fixed;
			left: 0;
			top: 0;
			z-index: -1;
			img {
				width: 100%;
			}
		}
		.title {
			.back {
				width: 88/@rem;
				height: 88/@rem;
				text-align: center;
				color: white;
				line-height: 88/@rem;
				padding-left: 12px;
				span {
					font-size: 44/@rem;
					font-weight: bolder;
				}
			}
		}
		.content {
			margin-top: 180/@rem;
			display: flex;
			justify-content: center;
			.input-group {
				width: 550/@rem;
				.item {
					overflow: hidden;
					height: 100/@rem;
					box-sizing: border-box;
					border-bottom: 2px solid white;
					.input {
						height: 48/@rem;
						margin-top: 36/@rem;
						display: flex;
						.label {
							font-size: 28/@rem;
							color: white;
							display: inline-block;
							flex: 0 0 auto;
						}
						input {
							border: none;
							background: none;
							outline: none;
							font-size: 28/@rem;
							color: white;
							height: 48/@rem;
							margin-left: 20/@rem;
							flex: 1;
							width: 0;
							&::placeholder {
								color: white;
							}
							/*text-align: center;*/
						}
						.getcode {
							font-size: 12px;
							color: white;
							flex: 0 0 auto;
							box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);
							border-radius: 48/@rem;
							width: 180/@rem;
							height: 48/@rem;
							line-height: 48/@rem;
							text-align: center;
						}
					}
				}
				.agree {
					margin-top: 20/@rem;
					font-size: 22/@rem;
					color: white;
					.checked {
						vertical-align: middle;
						width: 36/@rem;
						height: 36/@rem;
					}
					a {
						color: #00ff00;
					}
				}
			}
		}
		.btn {
			width: 550/@rem;
			height: 88/@rem;
			border-radius: 48/@rem;
			margin: 100/@rem auto 0;
			/*box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);*/
			background-color: #E60012;
			p {
				text-align: center;
				color: white;
				line-height: 88/@rem;
				font-size: 32/@rem;
			}
		}
		.slider {
			width: 550/@rem;
			height: 42/@rem;
			margin: 0 auto;
			text-align: center;
			background: url(../../../static/usercenter/login6.png) left center no-repeat;
			background-size: contain;
			p {
				font-size: 24/@rem;
				color: white;
				margin-top: 90/@rem;
			}
		}
		.otherway {
			width: 550/@rem;
			height: 188/@rem;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 114/@rem;
				height: 114/@rem;
				+img {
					margin-left: 58/@rem;
				}
			}
		}
	}
</style>