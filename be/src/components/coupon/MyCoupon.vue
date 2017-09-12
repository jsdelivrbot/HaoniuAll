<template>
	<div class="my-coupon-box">
		<v-header title="优惠券" map="使用规则" @edit="showMaster"></v-header>
		<div class="tab-box">
			<tab bar-active-color="#e60012" active-color="#e60012">
				<tab-item selected>全部</tab-item>
				<tab-item>未使用</tab-item>
				<tab-item>已使用</tab-item>
				<tab-item>已过期</tab-item>
			</tab>
		</div>
		<div class="list">
			<div class="item">
				<div class="item-title vux-1px-b">
					<p class="number">订单编号：24256542515</p>
					<p class="label">未使用</p>
				</div>
				<div class="item-content-unused">
					<div class="price-box">
						￥50元
					</div>
					<div class="text">
						<p class="first">徽州太太专用</p>
						<p class="second">指定适用范围：安庆铜陵店用</p>
						<p class="third">有效期至：2017-12-12</p>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="item-title vux-1px-b">
					<p class="number">订单编号：24256542515</p>
					<p class="label">已使用</p>
				</div>
				<div class="item-content-used">
					<div class="price-box">
						￥50元
					</div>
					<div class="text">
						<p class="first">徽州太太专用</p>
						<p class="second">指定适用范围：安庆铜陵店用</p>
						<p class="third">有效期至：2017-12-12</p>
					</div>
					<div class="label">
						<img src="../../../static/coupon12.png" />
					</div>
				</div>
			</div>
			<div class="item">
				<div class="item-title vux-1px-b">
					<p class="number">订单编号：24256542515</p>
					<p class="label">已过期</p>
				</div>
				<div class="item-content-overdue">
					<div class="price-box">
						￥50元
					</div>
					<div class="text">
						<p class="first">徽州太太专用</p>
						<p class="second">指定适用范围：安庆铜陵店用</p>
						<p class="third">有效期至：2017-12-12</p>
					</div>
					<div class="label">
						<img src="../../../static/coupon13.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
			<div class="content">
				<p>
					1.热文打开后请阅读至少5秒钟；<br/> 2.每增加一次阅读得0.05元，最高得2元；
					<br/> 3.自己分享并阅读可得0.05元；
					<br/> 4.分享到朋友圈时，写点分享语可以吸引阅读哦；
					<br/> 5.分享到微信后，自己点击阅读也有收益；
					<br/> 6.分享到微信群中，收益更多更快。
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Tab, TabItem } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Tab,
			TabItem
		},
		data() {
			return {
				masterShow: false
			}
		},
		methods: {
			showMaster() {
				this.masterShow = true
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.my-coupon-box {
		padding-top: 98px;
		.header-box {
			.map {
				padding-right: 16px;
			}
		}
		.tab-box {
			width: 100%;
			position: fixed;
			top: 54px;
			z-index: 2;
			padding: 0 12px;
			box-sizing: border-box;
			background-color: white;
		}
		.list {
			.item {
				height: 128px;
				background-color: white;
				margin-top: 10px;
				.item-title {
					display: flex;
					font-size: 14px;
					height: 44px;
					line-height: 44px;
					padding: 0 12px;
					.number {
						flex: 1;
						color: #707070;
					}
					.label {
						flex: 0 0 auto;
						color: #e60012;
					}
				}
				.item-content-unused {
					height: 84px;
					padding: 0 12px;
					display: flex;
					align-items: center;
					.price-box {
						width: 79px;
						height: 64px;
						background: url(../../../static/coupon10.png) left center no-repeat;
						background-size: 79px 64px;
						flex: 0 0 79px;
						line-height: 64px;
						color: white;
						text-align: center;
						font-size: 18px;
					}
					.text {
						width: 0;
						height: 64px;
						flex: 1;
						background-color: #e6cfd0;
						line-height: 16px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						p {
							&.first {
								font-size: 16px;
								color: #333333;
								line-height: 26px;
							}
							&.second, &.third {
								font-size: 12px;
								color: #707070;
							}
						}
					}
				}
				.item-content-used {
					height: 84px;
					padding: 0 12px;
					display: flex;
					align-items: center;
					position: relative;
					.price-box {
						width: 79px;
						height: 64px;
						background: url(../../../static/coupon11.png) left center no-repeat;
						background-size: 79px 64px;
						flex: 0 0 79px;
						line-height: 64px;
						color: white;
						text-align: center;
						font-size: 18px;
					}
					.text {
						width: 0;
						height: 64px;
						flex: 1;
						background-color: #f0f0f0;
						line-height: 16px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						p {
							&.first {
								font-size: 16px;
								color: #afafaf;
								line-height: 26px;
							}
							&.second, &.third {
								font-size: 12px;
								color: #afafaf;
							}
						}
					}
					.label {
						position: absolute;
						right: 8px;
						top: 15px;
						img {
							width: 75px;
							height: 41px;
						}
					}
				}
				.item-content-overdue {
					height: 84px;
					padding: 0 12px;
					display: flex;
					align-items: center;
					position: relative;
					.price-box {
						width: 79px;
						height: 64px;
						background: url(../../../static/coupon11.png) left center no-repeat;
						background-size: 79px 64px;
						flex: 0 0 79px;
						line-height: 64px;
						color: white;
						text-align: center;
						font-size: 18px;
					}
					.text {
						width: 0;
						height: 64px;
						flex: 1;
						background-color: #f0f0f0;
						line-height: 16px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						p {
							&.first {
								font-size: 16px;
								color: #afafaf;
								line-height: 26px;
							}
							&.second, &.third {
								font-size: 12px;
								color: #afafaf;
							}
						}
					}
					.label {
						position: absolute;
						right: 8px;
						top: 15px;
						img {
							width: 75px;
							height: 41px;
						}
					}
				}
			}
		}
		.master {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 3;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.4);
			.content {
				width: 600/@rem;
				height: 300/@rem;
				background-color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -300/@rem;
				margin-top: -150/@rem;
				border-radius: 9px;
				overflow-y: auto;
				p {
					font-size: 24/@rem;
					margin: auto;
					line-height: 44/@rem;
					margin-top: 16/@rem;
					margin-bottom: 16/@rem;
					margin-left: 40/@rem;
				}
			}
		}
	}
</style>