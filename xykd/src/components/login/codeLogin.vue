<template>
	<div class="code_login_box">
		<v-header title="验证码登录"></v-header>

		<p class="login_title">验证码已发送至手机号：159 2138 2084</p>

		<div class="input vux-1px-b">
			<input type="text" class="vux-1px-b" placeholder="请输入短信验证码" />
			<span>56秒</span>
		</div>

		<div class="btn_wrapper">
			<p class="btn" @click='login'>登录</p>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		methods: {
			login() {
				this.$router.replace('/borrowMoney')
			}
		}
	}
</script>
<style lang="less">
	.code_login_box {
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
			span {
				flex: 0 0 auto;
				width: 70px;
				height: 30px;
				display: block;
				text-align: center;
				background-color: #e5e5e5;
				border-radius: 15px;
				color: white;
				font-size: 14px;
				line-height: 30px;
			}
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