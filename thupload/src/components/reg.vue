<template>
	<div class="reg_box">
		<goback title='注册账号'></goback>

		<div class="form_box vux-1px-b">
			<x-input placeholder="请输入11位手机号码"></x-input>
			<x-input placeholder="请输入密码"></x-input>
			<x-input placeholder="请确认密码"></x-input>
			<x-input placeholder="请输入验证码">
				<x-button slot="right" style='background: #0c81e0;' type="primary" mini>发送验证码</x-button>
			</x-input>
		</div>

		<div class="agreement_line">
			注册即视为统一
			<a href="#">《用户注册协议》</a>
		</div>
		<div class="submit">
			<button class="pub_button">提交</button>

		</div>
	</div>
</template>
<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	import goback from '@/components/return'
	export default {
		components: {
			goback,
			XInput,
			Group,
			XButton,
			Cell
		}
	}
</script>
<style lang="less">
	.pub_button {
		height: 40px;
		border-radius: 3px;
		width: 100%;
		border: none;
		color: #fff;
		background: #0c81e0;
	}
	
	.reg_box {
		.form_box {
			margin-top: 20px;
		}
		.agreement_line {
			text-indent: 15px;
			margin: 15px 0;
			font-size: 14px;
			color: #999999;
			a {
				color: #0c81e0;
			}
		}
		.submit {
			margin-top: 30px;
			padding: 0 50px;
			box-sizing: border-box;
		}
	}
</style>