<template>
	<div class="login_box">
		<div class="static">
			<div class="logo">
				<img src="../../static/img/logo.png" />
				<p style="margin-bottom: 60px;margin-top: -60px;">文明太湖用户端</p>
			</div>

			<div class="form">
				<input type="text" placeholder="请输入账号" v-model="phone" />
				<input type="password" placeholder="请输入您的密码" v-model="password" />
				<button class="pub_button" @click="toUpdate">登录</button>
			</div>
			<ul class="line-text">
				<router-link to='/reg' tag="li">
					立即注册
				</router-link>
				<router-link to='/forget' tag="li">
					忘记密码?
				</router-link>
			</ul>

		</div>

		<div class="select_sf" @click="closeme">
			请选择身份登录
		</div>
		<!--<div class="to_reg">
			<div class="vux-1px-t"></div>
			<button @click="toReg">立即注册</button>
		</div>-->
	</div>
</template>
<script>
	export default {
		name: 'login',
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		methods: {
			toReg() {
				this.$router.push('/reg')
			},
			closeme() {
				var ws = plus.webview.currentWebview()
				plus.webview.close(ws)
			},
			toUpdate() {
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
				this.$http.get('/api/frontBase/user/login', {
					params: {
						phone: this.phone,
						password: this.password
					}
				}).then((res) => {
					if(res.data.result === 0) {
						//储存用户信息
						let userInfo = JSON.stringify(res.data.obj)
						sessionStorage.setItem('userInfo', userInfo)
						//储存账号密码
						localStorage.setItem('phone', this.phone)
						localStorage.setItem('password', this.password)
						//设置token
						this.$http.defaults.headers.common['token'] = res.data.obj.token
						console.log(res.data.obj.token)
						sessionStorage.setItem('token', res.data.obj.token)
						let token = sessionStorage.getItem('token')
						console.log(token)
						//弹框
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: '登录成功'
						})
						//跳转路由
						this.$router.replace('/update')
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
	.login_box {
		min-height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		.select_sf {
			height: 60px;
			font-size: 15px;
			color: #0C81E0;
			text-align: center;
			line-height: 60px;
			border-top: 1px solid #eee;
		}
		.static {
			/*position: absolute;*/
			top: 0;
			left: 0;
			z-index: 111;
			width: 100%;
			flex: 1;
			.logo {
				display: block;
				width: 100%;
				text-align: center;
				padding-top: 80px;
				img {
					margin: auto;
					width: 82px;
					margin-bottom: 60px;
				}
			}
			/*.reg {
				float: left;
			}
			.forget {
				float: right;
				margin-right: 40px;
				margin-top: 180px;
				color: #282828;
				font-size: 13px;
				box-sizing: border-box;
				text-decoration: underline;
			}*/
			.line-text {
				display: flex;
				color: #282828;
				font-size: 13px;
				padding: 0 40px;
				margin-top: 10px;
				box-sizing: border-box;
				list-style: none;
				li {
					flex: 1;
				}
				li:last-child {
					text-align: right;
				}
			}
			.form {
				padding: 0 40px;
				box-sizing: border-box;
				width: 100%;
				background: #fff;
				input {
					display: block;
					width: 100%;
					height: 40px;
					border: 1px solid #cccccc;
					border-radius: 5px;
					text-indent: 15px;
					margin-bottom: 20px;
					box-sizing: border-box;
				}
			}
		}
		.to_reg {
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;
			text-align: center;
			/*position: absolute;*/
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