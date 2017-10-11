<template>
	<div class="preview-box">
		<v-header title="查看"></v-header>
		<img src="../../../static/image/preview.png" />
		<div class="btn">
			确认修改
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.preview-box {
		padding-top: 45px;
		img {
			width: 300px;
			height: 300px;
			margin: 64px auto;
			display: block;
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #ffce4e;
			margin: 50px auto 18px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
	}
</style>