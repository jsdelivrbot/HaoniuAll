<template>
	<div class="header-box">
		<div class="back" @click="back">
			<span class="iconfont icon-back"></span>
			<span class="text-back">返回</span>
		</div>
		<div class="header-title">
			{{title}}
		</div>
		<div class="header-right-icon" @click="history">
			<span class="iconfont icon-shizhong-copy" v-show="iconShow"></span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			iconShow: Boolean
		},
		created() {
			this.$setgoindex()
		},
		methods: {
			back() {
				if(this.$route.query.goindex === 'true') {
//					this.$router.push('/')
					window.android.close()
				} else {
					this.$router.back(-1)
				}
			},
			history() {
				this.$emit('history')
			}
		}
	}
</script>

<style lang="less">
	.header-box {
		width: 100%;
		height: 45px;
		background-color: #63bffe;
		display: flex;
		color: white;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		.back {
			width: 94px;
			flex: 0 0 94px;
			font-size: 0;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-back {
				font-size: 22px;
				line-height: 0;
			}
			.text-back {
				font-size: 15px;
			}
		}
		.header-title {
			width: 0;
			flex: 1;
			line-height: 45px;
			text-align: center;
			font-size: 16px;
		}
		.header-right-icon {
			width: 94px;
			flex: 0 0 94px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			span {
				padding-right: 24px;
				font-size: 20px;
			}
		}
	}
</style>