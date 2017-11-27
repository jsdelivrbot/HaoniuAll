<template>
	<div class="return_box">
		<div class="left" @click="goback">
			<img src="../../static/img/Back-icon.png" />
		</div>
		<div class="title">
			{{title}}
		</div>
		<div class="right" v-if="right" @click="rightHandle">
			{{right}}
		</div>
	</div>
</template>
<script>
	export default {
		name: 'return',
		props: {
			title: {
				default: '默认标题'
			},
			right: {
				type: String
			}
		},
		methods: {
			goback() {
				this.$router.back()
			},
			rightHandle() {
				this.$emit('rightHandle')
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.return_box {
		height: 44px;
		background: #0c81e0;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 4;
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
		.right {
			width: 58px;
			height: 44px;
			position: absolute;
			right: 0;
			top: 0;
			text-align: center;
			font-size: 14px;
			line-height: 44px;
			color: white;
		}
		.title {
			text-align: center;
			line-height: 44px;
			color: #fff;
			font-size: 16px;
		}
	}
</style>