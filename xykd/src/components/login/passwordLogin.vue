<template>
	<div class="password_login_box">
		<v-header title="密码登录"></v-header>
		
		<p class="login_title">用户名：159 2138 2084</p>
		
		<div class="input vux-1px-b">
			<input type="password" class="vux-1px-b" placeholder="请输入您的登录密码" />
		</div>
		
		<p class="forget_password">忘记密码</p>
		
		<div class="btn_wrapper">
			<p class="btn">登录</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>
<style lang="less">
	.password_login_box {
		min-height: 100vh;
		padding-top: 48px;
		background-color: white;
		box-sizing: border-box;
		.login_title {
			padding: 0 30px;
			font-size: 14px;
			color: #4a4a4a;
			margin-top: 100px;
		}
		.input {
			height: 48px;
			margin: 20px 30px 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			input {
				width: 0;
				height: 100%;
				flex: 1;
				outline: none;
				border: none;
				font-size: 12px;
				display: block;
			}
		}
		.forget_password {
			text-align: right;
			font-size: 14px;
			padding: 10px 30px;
			float: right;
		}
		.btn_wrapper {
			width: 100%;
			height: 50px;
			margin: 81px auto 0;
			padding: 0 30px;
			box-sizing: border-box;
			.btn {
				width: 100%;
				height: 100%;
				border-radius: 25px;
				background-color: #e5e5e5;
				font-size: 18px;
				text-align: center;
				line-height: 50px;
				color: white;
			}
		}
	}
</style>