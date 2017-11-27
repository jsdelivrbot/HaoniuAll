<template>
	<div class="profit-index-box">
		<div class="title">
			<!--<span class="iconfont icon-fanhui" @click="back"></span>-->
			<span class="text">我的收益</span>
			<router-link to="/profit/ranking" tag="div" class="rank">
				<img src="../../../static/usercenter/rank.png" />
			</router-link>
		</div>
		<div class="img">
			<img src="../../../static/usercenter/profit.png" />
			<div class="today">
				<p class="first">今日收益（元）</p>
				<p class="second">{{today_money}}元</p>
				<!--<p class="first">11个任务四次点击</p>-->
			</div>
			<div class="all">
				<div class="all-profit">
					<p class="first">总收益（元）</p>
					<p class="second">{{all_money}}</p>
				</div>
				<div class="can-profit">
					<p class="first">可提现（元）</p>
					<p class="second">{{credit1}}</p>
				</div>
			</div>
		</div>
		<div class="computed">
			<p class="computed-title">收益估算</p>
			<p class="computed-text">
				坚持 <span>{{date}}</span>天，就可以赚 <span v-text="date*sy_yg"></span>元零花钱
			</p>
			<range v-model="data1" :min="0" :max="4" :rangeBarHeight="6" minHTML="<span></span>" maxHTML="<span></span>"></range>
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
				<span @click="data1 = 3">25天</span>
				<span @click="data1 = 4">30天</span>
			</div>
		</div>
		<div class="reward" style="display: none;">
			<p class="reward-title">双重奖励</p>
			<div class="reward-content">
				<p>1.返佣奖励</p>
				<p class="text">分享爱蜂享给好友，好友成功注册，即可获得200个兑换币；</p>
				<p>2.额外奖励</p>
				<p class="text">
					参与收益排名前三可获得丰厚大奖
					<!--，具体详情<a>点击查看></a>-->
				</p>
			</div>
		</div>
		<div class="btn" @click="getCash" style="margin-top: 80px;">
			立即提现
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import { Range } from 'vux'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		methods: {
			back() {
				this.$router.replace('/home')
			},
			getCash() {
				this.$router.push('/usercenter/getCash')
			}
			//			onChange() {
			//				console.log('test')
			//			}
		},
		components: {
			Range,
			IndexFooter
		},
		data() {
			return {
				data1: 2,
				datearr: ['7', '10', '15', '25', '30'],
				all_money: '',
				credit1: '',
				today_money: '',
				sy_yg: ''
			}
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=myShareMoney')
				.then((res) => {
					if(res.data.datastatus === 1) {
						this.all_money = res.data.data.all_money
						this.credit1 = res.data.data.credit1
						this.today_money = res.data.data.today_money
						this.sy_yg = res.data.data.sy_yg
					}
				})
		},
		computed: {
			date() {
				return this.datearr[this.data1]
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.profit-index-box {
		padding-top: 44px;
		padding-bottom: 64px;
		.title {
			width: 100%;
			height: 44px;
			background-color: #e60012;
			line-height: 44px;
			display: flex;
			align-items: center;
			position: fixed;
			left: 0;
			top: 0;
			.icon-fanhui {
				color: white;
				font-size: 20px;
				font-weight: 700;
				text-align: center;
				padding-left: 27px;
			}
			.text {
				color: white;
				font-size: 16px;
				vertical-align: top;
				margin-left: 26px;
			}
			.rank {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				img {
					width: 24px;
					height: 24px;
					margin-right: 26px;
				}
			}
		}
		.img {
			position: relative;
			color: white;
			z-index: -1;
			box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
			.today {
				position: absolute;
				top: 18/@rem;
				width: 100%;
				text-align: center;
				.first {
					font-size: 12px;
				}
				.second {
					font-size: 30px;
					line-height: 34px;
				}
			}
			.all {
				position: absolute;
				width: 100%;
				top: 186/@rem;
				display: flex;
				justify-content: center;
				.all-profit {
					margin-right: 144/@rem;
				}
				.all-profit,
				.can-profit {
					text-align: center;
					.first {
						font-size: 14px;
					}
					.second {
						font-size: 16px;
					}
				}
			}
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
					.range-handle {
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
			/*position: fixed;*/
			/*left: 0;*/
			/*bottom: 0;*/
		}
	}
</style>