<template>
	<div class="share-shopping-detail-box">
		<div class="title">
			<span class="iconfont icon-fanhui" @click="back"></span>
			<span class="info" @click="showMaster">任务说明</span>
		</div>
		<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
			<div class="content">
				<p>
					1.热文打开后请阅读至少5秒钟；<br/>
					2.每增加一次阅读得0.05元，最高得2元；<br/>
					3.自己分享并阅读可得0.05元；<br/>
					4.分享到朋友圈时，写点分享语可以吸引阅读哦；<br/>
					5.分享到微信后，自己点击阅读也有收益；<br/>
					6.分享到微信群中，收益更多更快。
				</p>
			</div>
		</div>
		<div class="img">
			<img src="../../../static/shareshoppingdetail1.png" />
		</div>
		<div class="computed">
			<p class="computed-title">收益估算</p>
			<p class="computed-text">
				坚持 <span>{{date}}</span>天，就可以赚 <span>150</span>元零花钱
			</p>
			<range v-model="data1" :min="0" :max="4" :rangeBarHeight="6" 
				minHTML="<span></span>" maxHTML="<span></span>"></range>
			<!--<div class="fictitiousDate">
				<span @click="data1 = 0"></span>
				<span @click="data1 = 1"></span>
				<span @click="data1 = 2"></span>
				<span @click="data1 = 3"></span>
				<span @click="data1 = 4"></span>
			</div>-->
			<div class="date">
				<span @click="data1 = 0">7&nbsp;天</span>
				<span @click="data1 = 1">10天</span>
				<span @click="data1 = 2">15天</span>
				<span @click="data1 = 3">20天</span>
				<span @click="data1 = 4">30天</span>
			</div>
		</div>
		<div class="reward">
			<p class="reward-title">双重奖励</p>
			<div class="reward-content">
				<p>1.返佣奖励</p>
				<p class="text">分享爱蜂享给好友，好友成功注册，即可获得200个兑换币；</p>
				<p>2.额外奖励</p>
				<p class="text">参与收益排名前三可获得丰厚大奖，具体详情<a>点击查看></a></p>
			</div>
		</div>
		<div class="btn">
			立即提现
		</div>
	</div>
</template>

<script>
	let datearr = ['7', '10', '15', '20', '30']
	import { Range } from 'vux'
	export default {
		methods: {
			back() {
				this.$router.back(-1)
			},
			showMaster() {
				this.masterShow = true
			}
		},
		components: {
			Range
		},
		data() {
			return {
				data1: 2,
				masterShow: false
			}
		},
		computed: {
			date() {
				return datearr[this.data1]
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.share-shopping-detail-box {
		padding-bottom: 49px;
		.title {
			width: 100%;
			height: 44px;
			line-height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			left: 0;
			top: 0;
			.icon-fanhui {
				width: 34px;
				height: 34px;
				line-height: 34px;
				color: #e60012;
				font-size: 22px;
				font-weight: bolder;
				text-align: center;
				margin-left: 18px;
				background-color: white;
				border-radius: 50%;
				box-sizing: border-box;
				padding-left: 6px;
			}
			.info {
				font-size: 12px;
				color: #e60012;
				background-color: white;
				display: inline-block;
				width: 64px;
				height: 19px;
				line-height: 19px;
				text-align: center;
				margin-right: 18px;
				border-radius: 6px;
			}
		}
		.img {
			position: relative;
			color: white;
			z-index: -1;
			box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
			img {
				width: 100%;
			}
		}
		.computed {
			width: 702/@rem;
			height: 214/@rem;
			background-color: white;
			border-radius: 8px;
			margin: -40/@rem auto 0;
			.computed-title {
				font-size: 16px;
				padding: 14/@rem 44/@rem;
				font-weight: 500;
			}
			.computed-text {
				font-size: 14px;
				color: #afafaf;
				text-align: center;
				span {
					font-size: 16px;
					color: #e60012;
				}
			}
			.vux-range-input-box {
				margin-left: 30px !important;
				margin-top: 26/@rem;
				.range-bar {
					background: linear-gradient(to right, #f49900, #fdcf00);
					.range-handle{
						width: 24px;
						height: 24px;
						border: 1px solid #f8b700;
					}
					.range-quantity {
						background: linear-gradient(to right, #ff6200, #ff2b00);
					}
				}
			}
			.date {
				margin: 0 30px;
				display: flex;
				justify-content: space-between;
				span {
					text-align: center;
					font-size: 12px;
					color: #e60012;
					padding-top: 16/@rem;
				}
			}
		}
		.reward {
			width: 702/@rem;
			margin: 20/@rem auto;
			background-color: white;
			border-radius: 8px;
			padding-bottom: 14/@rem;
			.reward-title {
				font-size: 16px;
				padding: 14/@rem 44/@rem;
				font-weight: 500;
			}
			.reward-content {
				font-size: 12px;
				color: #333333;
				line-height: 16px;
				padding: 0 22px;
				.text {
					text-indent: 1em;
					a {
						color: #1d4de8;
						text-decoration: underline;
					}
				}
			}
		}
		.btn {
			background-color: #e60012;
			width: 100%;
			height: 49px;
			color: white;
			font-size: 18px;
			text-align: center;
			line-height: 49px;
			position: fixed;
			left: 0;
			bottom: 0;
		}
		.master {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 3;
			left: 0;
			top: 0;
			background-color: rgba(0,0,0,0.4);
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