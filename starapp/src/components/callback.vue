<template>
	<div class="top-out-bar">
		<div class="left" @click="goback()">
			<img v-show='isshow' src="../../static/img/lefticon.png" />
		</div>
		<span class="title">
			{{title}}
		</span>
		<div class="share-icon" v-if='isshare' @click="sharealert">
			<img src="../../static/img/shareicon.png" />
		</div>

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
			isshare: {
				default: false
			},
			issave: {
				default: false
			}
		},
		methods: {
			topSave() {
				this.$emit('topSaves', '1111')
			},
			sharealert(val) {
				this.$emit('sharealert', val)
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
		background: linear-gradient(to bottom, #92c1ed, #84bef3);
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
			color: #fff;
			font-size: 18px;
		}
		.save {
			position: absolute;
			right: 0px;
			line-height: 45px;
			padding: 0 15px;
			color: #fff;
			box-sizing: border-box;
			font-size: 17px;
		}
		.share-icon {
			position: absolute;
			right: 0;
			top: 0;
			width: 45px;
			height: 45px;
			img {
				width: 19px;
				height: 19px;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
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