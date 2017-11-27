<template>
	<div class="sure_shopping_box">
		<v-header title="确认购买"></v-header>
		<iframe :src="GainNode"></iframe>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		data() {
			return {
				token: sessionStorage.getItem('token')
			}
		},
		computed: {
			GainNode() {
				let src = 'http://aifengxiang.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=order.create&total=1'
				src = src + '&id=' + this.$route.query.id + '&optionid=' + this.$route.query.optionid + '&token=' + this.token
				return src
			}
		},
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.sure_shopping_box {
		iframe {
			width: 100%;
			height: 100vh;
			/*padding-top: 44px;*/
			box-sizing: border-box;
			border: none;
		}
	}
</style>