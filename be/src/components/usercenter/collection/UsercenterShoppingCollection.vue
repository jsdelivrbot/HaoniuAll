<template>
	<div class="shopping-collection-box">
		<v-header title="商品收藏"></v-header>
		<iframe :src="httpUrl + 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=member.favorite&token=' + token"></iframe>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl'),
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.shopping-collection-box {
		iframe {
			width: 100%;
			height: 100vh;
			padding-top: 44px;
			box-sizing: border-box;
			border: none;
		}
	}
</style>