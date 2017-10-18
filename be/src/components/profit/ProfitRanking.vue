<template>
	<div class="profit-ranking-box">
		<v-header title="收益排行榜" map="活动规则" @edit="showMaster"></v-header>
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
		<div class="ranking-content">
			<div class="ranking-title">
				<div>
					<span>{{memberdata.user_credit1}}</span>元
				</div>
				<div class="img">
					<img :src="avatar" />
				</div>
				<div>
					第<span>{{memberdata.user_rank}}</span>名
				</div>
			</div>
			<tab active-color="#e60012" defaultColor="#707070">
				<tab-item selected @on-item-click="getList('1')">区域排名</tab-item>
				<tab-item @on-item-click="getList('2')">全省排名</tab-item>
			</tab>
			<profit-ranking-list :list="listData"></profit-ranking-list>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Tab, TabItem } from 'vux'
	import ProfitRankingList from '@/common/vue/ProfitRankingList'
	export default {
		components: {
			'v-header': Header,
			Tab,
			TabItem,
			ProfitRankingList
		},
		data() {
			return {
				masterShow: false,
				listData: [],
				memberdata: {}
			}
		},
		computed: {
			avatar() {
				let avatar = localStorage.getItem('avatar')
				if(avatar.substring(0, 4) === 'http') {
					return avatar
				} else {
					return localStorage.getItem('httpUrl') + avatar
				}
			}
		},
		created() {
			this.getList('1')
		},
		methods: {
			showMaster() {
				this.masterShow = true
			},
			getList(type) {
				this.$http.get('getData/index.php?m=home&c=Form&a=areaRanking', {
					params: {
						seachdata: {
							rank_type: type
						}
					}
				}).then((res) => {
					console.log(res)
					this.listData = res.data.data
					this.memberdata = res.data.memberdata
				})
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.profit-ranking-box {
		padding-top: 107px;
		.header-box {
			height: 107px;
			align-items: flex-start;
			.map {
				padding-right: 16px;
			}
		}
		.master {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 8;
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
		.ranking-content {
			margin: -64px 12px 0;
			height: 200px;
			position: relative;
			z-index: 7;
			.ranking-title {
				width: 100%;
				height: 128px;
				background-color: white;
				border-top-left-radius: 9px;
				border-top-right-radius: 9px;
				display: flex;
				align-items: center;
				div {
					flex: 1;
					text-align: center;
					font-size: 12px;
					display: flex;
					justify-content: center;
					align-items: center;
					&.img {
						width: 96px;
						height: 96px;
						border-radius: 50%;
						overflow: hidden;
						flex: 0 0 96px;
						img {
							width: 100%;
						}
					}
					span {
						font-size: 16px;
					}
				}
			}
			.vux-tab {
				height: 48px;
				background-color: #f5f7fb;
				.vux-tab-item {
					font-size: 16px;
				}
			}
		}
	}
</style>