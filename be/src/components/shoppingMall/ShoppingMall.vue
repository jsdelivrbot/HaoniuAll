<template>
	<div class="iframeBox">
		<v-header title="佣金商城"></v-header>
		<iframe :src="httpUrl + 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&token=' + token" class="iframeContent" frameborder="0">
		</iframe>
	</div>
</template>
<script>
	import Header from '@/common/vue/Header'

	export default {
		data() {
			return {
				token: sessionStorage.getItem('token'),
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
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