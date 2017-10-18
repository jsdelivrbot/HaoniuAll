<template>
	<div class="login_box">
		<div class="logo">
			<img src="../../static/img/logo.png" />
		</div>

		<div class="form">
			<input type="text" placeholder="请输入账号" />
			<input type="password" placeholder="请输入您的密码" />
			<button class="pub_button">登录</button>
		</div>
		
		<router-link tag='div' to='/forget' class="forget">
			忘记密码?
		</router-link>

		<div class="to_reg">
			<div class="vux-1px-t"></div>
			<button @click="toReg">立即注册</button>
		</div>

	</div>
</template>
<script>
	export default {
		methods: {
			toReg() {
				this.$router.push('/reg')
			}
		}
	}
</script>
<style lang="less">
	.login_box {
		height: 100vh;
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
				width: 62px;
				margin-bottom: 60px;
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