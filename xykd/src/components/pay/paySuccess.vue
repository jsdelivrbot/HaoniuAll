<template>
	<section class="paySuccess-box">
		<v-header title="支付成功"></v-header>
		<img src="./img/success.png" />
		<h2>恭喜您,支付成功!</h2>
		<div class="global_btn_wrapper">
			<p class="btn active">返回首页</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>
<style lang="less">
	.paySuccess-box {
		height: auto;
		overflow: hidden;
		padding-top: 200px;
		text-align: center;
		min-height: 100vh;
		background: #fff;
		img {
			width: 80px;
			margin-bottom: 20px;
		}
		h2 {
			color: #696969;
		}
	}
</style>