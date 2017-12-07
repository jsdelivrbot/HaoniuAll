<template>
	<section class="invite-box">
		<v-header title="修改昵称"></v-header>
		<div class="invite_detail">
			<img src="./img/rightaway.png"/>
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
	.invite-box {
		height: auto;
		box-sizing: border-box;
		overflow: hidden;
		.invite_detail {
			height: 100vh;
			position: relative;
			background: url(./img/invite.png) center;
			background-size: 100%;
			
			img{
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				bottom: 80px;
				height: 42px;
			}
		}
	}
</style>