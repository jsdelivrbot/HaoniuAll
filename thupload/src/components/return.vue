<template>
	<div class="return_box">
		<div class="left" @click="goback">
			<img src="../../static/img/Back-icon.png" />
		</div>
		<div class="title">
			{{title}}
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			title: {
				default: '默认标题'
			}
		},
		methods: {
			goback() {
				this.$router.back()
			}
		}
	}
</script>
<style lang="less">
	.return_box {
		height: 44px;
		background: #0c81e0;
		position: relative;
		.left {
			width: 44px;
			height: 44px;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			img {
				margin: 13px auto;
				width: 10px;
			}
		}
		.title {
			text-align: center;
			line-height: 44px;
			color: #fff;
			font-size: 16px;
		}
	}
</style>