<template>
	<div class="login-box">
		<div class="title">
			<div class="back" @click="back">
				<span class="iconfont icon-fanhui"></span>
			</div>
		</div>
		<div class="photo">
			<img src="../../../static/login1.png" />
		</div>
		<div class="content">
			<div class="input-group">
				<div class="item1 item">
					<div class="input">
						<span class="label">手机号</span>
						<input type="text" v-model="phone" />
					</div>
				</div>
				<div class="item2 item">
					<div class="input">
						<span class="label">密码</span>
						<input type="password" v-model="psw" />
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="login">
			<p>登&nbsp;&nbsp;&nbsp;&nbsp;录</p>
		</div>
		<div class="sub-btn">
			<router-link to="/findPsd" href="#">忘记密码？</router-link>
			<router-link to="/register" tag="span">立即注册</router-link>
		</div>
		<div class="slider">
			<p>第三方登录</p>
		</div>
		<div class="otherway">
			<img src="../../../static/login4.png" />
			<img src="../../../static/login5.png" @click="otherLogin('weixin')" />
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			otherLogin(selectLogin) {
				let $this = this
				this.$CotherLogin(selectLogin, function(res) {
					console.log(JSON.stringify(res.userInfo))
					let info = res.userInfo
					$this.$http.get('/getData/index.php?m=home&c=Form&a=wecat_Login', {
						params: {
							seachdata: {
								openid: info.openid,
								nickname: info.nickname,
								avatar: info.headimgurl,
								city: info.city,
								country: info.country
							}
						}
					}).then(
						(res) => {
							if(res.data.result === 1) {
								$this.$vux.alert.show({
									title: '提示',
									content: '登录成功',
									time: 1000,
									onHide() {
//										console.log(res.data.data[0].ali_pay_phone)
										localStorage.setItem('ali_pay_phone', res.data.data[0].ali_pay_phone)
										localStorage.setItem('sex_type', res.data.data[0].sex_type || '')
										localStorage.setItem('age_area', res.data.data[0].age_area || '')
										localStorage.setItem('hy_area', res.data.data[0].hy_area || '')
										localStorage.setItem('hbt_list', res.data.data[0].hbt_list || '')
										sessionStorage.setItem('token', res.data.data[0].token)
										$this.$http.defaults.headers.common['token'] = res.data.data[0].token
										localStorage.setItem('avatar', res.data.data[0].avatar)
										localStorage.setItem('mobile', res.data.data[0].mobile)
										localStorage.setItem('nickname', res.data.data[0].nickname)
										localStorage.setItem('openid', res.data.data[0].openid)
										if($this.$route.query.redirect) {
											$this.$router.replace($this.$route.query.redirect)
										} else {
											$this.$router.back(-1)
										}
									}
								})
							} else {
								$this.$vux.alert.show({
									title: '提示',
									content: '登录失败'
								})
							}
						}
					)
				})
			},
			back() {
				this.$router.back(-1)
			},
			login() {
//				alert(123)
				if(String.trim(this.phone).length !== 11) {
					this.$vux.alert.show({
						title: '提示',
						content: '手机号码输入错误'
					})
					return
				}
				if(this.psw === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入密码'
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=usercenter_Login', {
						params: {
							seachdata: {
								'username': this.phone,
								'password': this.psw
							}
						}
					})
					.then((res) => {
						let $this = this
						if(res.data.result === 1) {
							this.$vux.alert.show({
								title: '提示',
								content: '登录成功',
								time: 1000,
								onHide() {
									console.log(res.data.data[0].ali_pay_phone)
									localStorage.setItem('ali_pay_phone', res.data.data[0].ali_pay_phone)
									localStorage.setItem('sex_type', res.data.data[0].sex_type || '')
									localStorage.setItem('age_area', res.data.data[0].age_area || '')
									localStorage.setItem('hy_area', res.data.data[0].hy_area || '')
									localStorage.setItem('hbt_list', res.data.data[0].hbt_list || '')
									localStorage.setItem('phone', String.trim($this.phone))
									localStorage.setItem('psw', $this.psw)
									sessionStorage.setItem('token', res.data.data[0].token)
									localStorage.setItem('avatar', res.data.data[0].avatar)
									localStorage.setItem('mobile', res.data.data[0].mobile)
									localStorage.setItem('nickname', res.data.data[0].nickname)
									localStorage.setItem('openid', res.data.data[0].openid)
									if($this.$route.query.redirect) {
										$this.$router.replace($this.$route.query.redirect)
									} else {
										$this.$router.back(-1)
									}
									$this.$http.defaults.headers.get['token'] = sessionStorage.getItem('token')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '登录失败'
							})
						}
						console.log(res)
					})
			}
		},
		data() {
			return {
				phone: '',
				psw: ''
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.login-box {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(#f39500, #e60112);
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
		.photo {
			height: 414/@rem;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 240/@rem;
				height: 240/@rem;
			}
		}
		.content {
			height: 200/@rem;
			display: flex;
			justify-content: center;
			.input-group {
				width: 550/@rem;
				height: 200/@rem;
				.item1 {
					background: url(../../../static/login2.png) left 36/@rem no-repeat;
				}
				.item2 {
					background: url(../../../static/login3.png) left 36/@rem no-repeat;
				}
				.item {
					overflow: hidden;
					height: 100/@rem;
					box-sizing: border-box;
					border-bottom: 2px solid white;
					background-size: 48/@rem 48/@rem;
					.input {
						height: 48/@rem;
						padding-left: 68/@rem;
						margin-top: 36/@rem;
						display: flex;
						line-height: 48/@rem;
						.label {
							font-size: 28/@rem;
							color: white;
							display: inline-block;
							width: 100/@rem;
							flex: 0 0 100/@rem;
						}
						input {
							border: none;
							background: none;
							outline: none;
							font-size: 34/@rem;
							color: white;
							height: 48/@rem;
							margin-left: 20/@rem;
							flex: 1;
							width: 0;
							/*text-align: center;*/
						}
					}
				}
			}
		}
		.btn {
			width: 550/@rem;
			height: 88/@rem;
			border-radius: 48/@rem;
			margin: 100/@rem auto 0;
			box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);
			p {
				text-align: center;
				color: white;
				line-height: 88/@rem;
				font-size: 32/@rem;
			}
		}
		.sub-btn {
			width: 550/@rem;
			height: 42/@rem;
			margin: 22/@rem auto 0;
			display: flex;
			justify-content: space-between;
			a {
				text-decoration: underline;
				color: white;
				font-size: 24/@rem;
				display: flex;
				align-items: flex-end;
			}
			span {
				width: 160/@rem;
				font-size: 24/@rem;
				color: white;
				text-align: center;
				line-height: 42/@rem;
				box-shadow: 0 2px 2px white inset, 0 2px 2px rgba(0, 0, 0, 0.4);
				border-radius: 48/@rem;
			}
		}
		.slider {
			width: 550/@rem;
			height: 42/@rem;
			margin: 0 auto;
			text-align: center;
			background: url(../../../static/login6.png) left center no-repeat;
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