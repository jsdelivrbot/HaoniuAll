<template>
	<div class="top-out-bar">
		<div class="left" @click="goback()">
			<img v-show='isshow' src="../../static/img/outleft.png" />
		</div>
		<span class="title">
			{{title}}
		</span>
		<div class="save" v-if='issave' @click="topSave">
			保存
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			title: String,
			isshow: {
				default: true
			},
			issave: {
				default: false
			}
		},
		beforeRouteLeave(to, from, next) {
			alert(to.path)
			next('/reg')
		},
		methods: {
			topSave() {
				this.$emit('topSaves', '1111')
			},
			goback() {
				if(sessionStorage.getItem('goback')) {
					this.$router.back(-1)
				} else {
					this.$router.push('/pub/home')
				}
			}
		}
	}
</script>
<style lang="less">
	.top-out-bar {
		height: 45px;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background: #ffffff;
		display: flex;
		z-index: 999;
		.left {
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			height: 45px;
			img {
				margin: 13px auto;
				padding: 0 15px;
				display: block;
				height: 18px;
			}
		}
		span {
			flex: 1;
			text-align: center;
			line-height: 45px;
			/*text-indent: -53px;*/
			color: #000000;
			font-size: 18px;
		}
		.save {
			position: absolute;
			right: 15px;
			line-height: 45px;
			padding: 0 10px;
			box-sizing: border-box;
		}
	}
	
	.top-out-bar:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 200%;
		height: 1px;
		border-bottom: 1px solid #e1e1e1;
		color: #C7C7C7;
		height: 200%;
		transform-origin: left top;
		transform: scale(0.5);
		z-index: -1;
	}
</style>