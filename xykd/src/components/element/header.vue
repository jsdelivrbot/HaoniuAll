<template>
	<div class="header_box">
		<div class="icon" @click="back" v-if='isLogin==""'>
			<img src="./img/youla@3x.png" />
		</div>
		<div class="icon" @click="loginEmit" v-if='isLogin!==""'>
			<img src="./img/youla@3x.png" />
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="right">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			isLogin: {
				default: ''
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			loginEmit() {
				this.$emit('LoginBack')
			}
		}
	}
</script>

<style lang="less">
	.header_box {
		width: 100%;
		height: 48px;
		background-color: white;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		.icon {
			position: absolute;
			text-align: center;
			height: 48px;
			width: 48px;
			img {
				margin: 17px auto;
				display: block;
				width: 9px;
				height: 14px;
			}
		}
		.title {
			width: 0;
			flex: 1;
			text-align: center;
			font-size: 16px;
			color: #282828;
			font-weight: 500;
		}
		.right {
			position: absolute;
			right: 0;
			line-height: 48px;
			padding-right: 10px;
			box-sizing: border-box;
			font-size: 13px;
		}
	}
</style>