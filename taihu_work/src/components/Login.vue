<template>
	<div>
		<div class="login_box">
			<div class="logo">
				<img src="../../static/img/logo.png" />
				<p>文明太湖工作端</p>
			</div>
			<div class="form">
				<input type="text" placeholder="请输入账号" v-model="phone" />
				<input type="password" placeholder="请输入您的密码" v-model="password" />
				<button class="pub_button" @click="login">登录</button>
			</div>
		</div>
		<div class="select_sf" @click="closeme">
			请选择身份登录
		</div>
	</div>

</template>
<script>
	export default {
		name: 'Login',
		data() {
			return {
				phone: '',
				password: '',
				cilentype: '',
				clientid: ''
			}
		},
		created() {
			this.$CgetCID((res) => {
				this.clientid = res
				//				alert(res)
			})
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			if(isAndroid) {
				this.cilentype = '0'
			}
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				this.cilentype = '1'
			}
		},
		methods: {
			closeme() {
				var ws = plus.webview.currentWebview()
				plus.webview.close(ws)
			},
			toReg() {
				this.$router.push('/reg')
			},
			login() {
				if(this.phone === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入账号'
					})
					return
				}
				if(this.password === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请输入密码'
					})
					return
				}
				this.$vux.loading.show({
					text: '正在登录'
				})
				this.$http.get('/api/frontBase/user/loginWork', {
					params: {
						phone: this.phone,
						password: this.password,
						cilentype: this.cilentype,
						clientid: this.clientid
					}
				}).then((res) => {
					console.log(res)
					if(res.data.result === 0) {
						//储存用户信息
						let userInfo = JSON.stringify(res.data.obj)
						sessionStorage.setItem('userInfo', userInfo)
						//储存账号密码
						localStorage.setItem('work_phone', this.phone)
						localStorage.setItem('work_password', this.password)
						//设置token
						sessionStorage.setItem('token', res.data.obj.token)
						this.$http.defaults.headers.common['token'] = res.data.obj.token
						//弹框
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '登录成功'
						})
						//跳转路由
						if(this.$route.query.redirect) {
							this.$router.replace(this.$route.query.redirect)
						} else {
							this.$router.replace('/home')
						}
						this.$http.get('/api/frontBase/user/findUserDetail')
							.then((res) => {
								if(res.data.result === 0) {
									let departmentName = res.data.obj.departmentName
									sessionStorage.setItem('departmentName', departmentName)
								}
							})
					} else {
						this.$vux.loading.hide()
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.select_sf {
		height: 60px;
		font-size: 15px;
		color: #0C81E0;
		text-align: center;
		line-height: 60px;
		border-top: 1px solid #eee;
		position: relative;
		margin-top: -60px;
	}
	
	.login_box {
		min-height: 100vh;
		background-color: white;
		overflow: hidden;
		padding-bottom: 100px;
		box-sizing: border-box;
		position: relative;
		.logo {
			display: block;
			width: 100%;
			text-align: center;
			margin-top: 80px;
			img {
				margin: auto;
				width: 80px;
			}
			p {
				font-size: 14px;
				margin: 6px 0 60px;
			}
		}
		.forget {
			text-align: right;
			padding: 0 40px;
			margin-top: 15px;
			color: #282828;
			font-size: 13px;
			text-decoration: underline;
		}
		.form {
			padding: 0 40px;
			box-sizing: border-box;
			input {
				display: block;
				width: 100%;
				height: 40px;
				border: 1px solid #cccccc;
				border-radius: 5px;
				text-indent: 15px;
				margin-bottom: 20px;
				box-sizing: border-box;
				outline: none;
			}
			.pub_button {
				width: 100%;
				height: 40px;
				border-radius: 5px;
				background-color: #0c81e0;
				color: white;
				border: none;
			}
		}
		.to_reg {
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;
			text-align: center;
			position: absolute;
			bottom: 0;
			button {
				width: 125px;
				height: 40px;
				border: 1px solid #0c81e0;
				border-radius: 3px;
				background: #ffffff;
				color: #0c81e0;
				margin: 25px auto;
			}
		}
	}
</style>