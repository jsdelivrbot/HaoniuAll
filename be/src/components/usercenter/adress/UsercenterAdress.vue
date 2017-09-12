<template>
	<div class="usercenter-adress-box">
		<v-header title="修改地址" map="保存"></v-header>
		<usercenter-adress-list></usercenter-adress-list>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import UsercenterAdressList from '@/common/vue/UsercenterAdressList'
	export default {
		components: {
			'v-header': Header,
			UsercenterAdressList
		}
	}
</script>

<style lang="less">
	.usercenter-adress-box {
		padding-top: 54px;
		.weui-label {
			color: ;
		}
	}
</style>