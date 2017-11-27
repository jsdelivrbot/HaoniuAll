<template>
	<div class="forget_box">
		<goback title='忘记密码'></goback>

		<div class="form_box vux-1px-b">
			<x-input placeholder="请输入11位手机号码"></x-input>
			<x-input placeholder="请输入密码"></x-input>
			<x-input placeholder="请确认密码"></x-input>
			<x-input placeholder="请输入验证码">
				<x-button slot="right" style='background: #0c81e0;' type="primary" mini>发送验证码</x-button>
			</x-input>
		</div>

		<div class="submit">
			<button class="pub_button">提交</button>
		</div>
	</div>
</template>
<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	import goback from '@/components/Return'
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
	.forget_box {
		padding-top: 44px;
		min-height: 100vh;
		background-color: white;
		.submit {
			margin-top: 30px;
			padding: 0 50px;
			box-sizing: border-box;
			.pub_button {
				height: 40px;
				border-radius: 3px;
				width: 100%;
				border: none;
				color: #fff;
				background: #0c81e0;
			}
		}
	}
</style>