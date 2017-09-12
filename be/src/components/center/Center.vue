<template>
	<div class="iframeBox">
		<v-header title="用户中心"></v-header>
		<iframe src="http://m.baidu.com/" class="iframeContent" frameborder="0">
		</iframe>
	</div>
</template>
<script>
	import Header from '@/common/vue/Header'

	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.iframeBox {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		.iframeContent {
			width: 100%;
			height: 100%;
			padding-top: 44px;
			box-sizing: border-box;
			border: none !important;
		}
	}
</style>