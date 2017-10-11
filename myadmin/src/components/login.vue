<template>
	<div class="login-box">
		<div class="login-form-box">
			<div class="logo">
				<img src="../assets/logo.png" />
			</div>

			<el-form>
				<el-form-item>
					<el-input v-model='username' placeholder='用户名'></el-input>
				</el-form-item>
				<el-form-item>
					<el-input type='password' v-model='password' placeholder='密码'></el-input>
				</el-form-item>
				<el-button @click='toLogin' :loading='loading' type="primary" size='medium' style='width: 100%;height: 42px;'>LOGIN</el-button>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: false,
				username: 'admin',
				password: 'admin'
			}
		},
		methods: {
			toLogin() {
				this.loading = true
				this.$http.get('/admin_pub/login', {
					params: {
						username: this.username,
						password: this.password
					}
				}).then(
					(res) => {
						this.loading = false
						if(res.data.errno === 0) {
							this.$notify({
								title: '成功',
								message: '登录成功!',
								type: 'success'
							})
							sessionStorage.setItem('token', res.data.data.token)
							this.$http.defaults.headers.common['token'] = res.data.data.token
							this.$router.push('/index')
						} else {
							this.$notify.error({
								title: '错误',
								message: JSON.stringify(res.data.errmsg)
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
		height: 100vh;
		width: 100vw;
		background: #42B983;
		/*background: url(../../static/img/20669.jpg) no-repeat center /100% 100%;*/
		position: relative;
		.login-form-box {
			width: 28vw;
			height: 20vw;
			min-width: 560px;
			min-height: 400px;
			position: absolute;
			background: #fff;
			border-radius: 5px;
			padding: 30px 60px;
			box-sizing: border-box;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			.logo {
				margin: auto;
				width: 120px;
				height: 120px;
				position: relative;
				top: -90px;
				background: #fff;
				border-radius: 50%;
				overflow: hidden;
				padding: 10px;
				box-sizing: border-box;
				img {
					margin: auto;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>