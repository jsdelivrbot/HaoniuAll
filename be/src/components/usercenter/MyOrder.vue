<template>
	<div class="my-order">
		<v-header title="订单管理"></v-header>
		<!--<iframe src="http://afx.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=order" class="iframeContent" frameborder="0">
		</iframe>-->
		<iframe :src="httpUrl + 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=order'" class="iframeContent" frameborder="0">
		</iframe>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		}
	}
</script>

<style lang="less">
	.my-order {
		width: 100%;
		height: 100vh;
		.iframeContent {
			width: 100%;
			height: 100%;
			padding-top: 44px;
			box-sizing: border-box;
		}
	}
</style>