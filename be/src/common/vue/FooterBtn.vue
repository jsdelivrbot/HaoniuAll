<template>
	<div class="footer-btn-box">
		<div class="share border-1px">
			<div class="btn">
				<div class="go-collect" v-if="!collected" @click="collect">
					<span>点赞</span>
				</div>
				<div class="collected" v-if="collected">
					<span>已点赞</span>
				</div>
			</div>
			<div class="detail" @click="detailHandle">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collected: false,
				masterShow: false
			}
		},
		methods: {
//			goJoin() {
//				if(!sessionStorage.getItem('token')) {
//					this.$router.push({
//						path: '/login',
//						query: {
//							redirect: this.$route.fullPath
//						}
//					})
//					return
//				}
//				this.$vux.alert.show({
//					title: '提示',
//					content: '加入成功'
//				})
//			},
			collect() {
				if(!sessionStorage.getItem('token')) {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=infoThumbUp', {
					params: {
						seachdata: {
							'info_id': this.id
						}
					}
				}).then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						this.$vux.alert.show({
							title: '提示',
							content: '点赞成功'
						})
						this.collected = true
					}else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.message
						})
					}
				})
			},
			detailHandle() {
				this.$emit('detailHandle')
			}
		},
		props: ['id']
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	/*.all-enter-active,
	.all-leave-active {
		transition: all .2s;
	}
	
	.all-enter,
	.all-leave-to {
		opacity: 0;
	}
	
	.up-enter-active,
	.up-leave-active {
		transition: all .2s;
	}
	
	.up-enter,
	.up-leave-to {
		transform: translateY(100%);
	}*/
	/*.up-enter-active {
		animation: bounce-in .5s;
	}
	
	.up-leave-active {
		animation: bounce-in .5s reverse;
	}
	
	@keyframes bounce-in {
		0% {
			transform: translateY(100%);
		}
		50% {
			transform: translateY(-30%);
		}
		100% {
			transform: translateY(0);
		}
	}
	
	.up-enter,
	.up-leave-to
	{
		transform: translateY(-100%);
	}*/
	
	.footer-btn-box {
		width: 100%;
		position: fixed;
		z-index: 4;
		left: 0;
		bottom: 0;
		.share {
			display: flex;
			height: 50px;
			background-color: white;
			.btn {
				flex: 1;
				width: 0;
				background-color: #3d3d3d;
				display: flex;
				div {
					flex: 1;
					width: 0;
					&.go-collect {
						background: url(../../../static/home-icon1.png) center 6px no-repeat;
						background-size: 18px 18px;
					}
					&.collected {
						background: url(../../../static/isgood.png) center 6px no-repeat;
						background-size: 18px 18px;
					}
					span {
						color: white;
						text-align: center;
						display: block;
						font-size: 12px;
						margin-top: 26px;
					}
				}
			}
			.detail {
				flex: 2;
				width: 0;
				background-color: #e60012;
				color: white;
				font-size: 16px;
				text-align: center;
				line-height: 50px;
			}
		}
	}
</style>