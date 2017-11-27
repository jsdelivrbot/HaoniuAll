<template>
	<div class="sam_up_box">
		<return title="维护总结"></return>
		<x-textarea :height="176" class="text" placeholder="请输入..."></x-textarea>
		<div class="submit">
			<button class="pub_button">提交总结</button>
		</div>
	</div>
</template>

<script>
	import Return from '@/components/Return'
	import { XTextarea } from 'vux'
	export default {
		components: {
			Return,
			XTextarea
		}
	}
</script>

<style lang="less">
	.sam_up_box {
		padding-top: 44px;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: white;
		.text {
			border: 1px #cccccc solid;
			border-radius: 4px;
			margin: 16px;
			font-size: 14px;
			color: #282828;
		}
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