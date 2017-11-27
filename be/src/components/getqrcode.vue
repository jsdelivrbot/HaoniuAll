<template>
	<div class="qrcode-box">
		<v-header title="我的二维码"></v-header>
		<iframe :src="'http://aifengxiang.hfrjkf.cn/getData/index.php?m=home&a=qrcode&userid='+userid" width="" height=""></iframe>
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
				userid: localStorage.getItem('id')
			}
		}
	}
</script>
<style lang="less">
	.qrcode-box {
		height: 100vh;
		overflow: hidden;
		iframe {
			width: 100%;
			height: 100vh;
			overflow: hidden;
			border: none;
		}
	}
</style>