<template>
	<div class="flea-market-index-box">
		<v-header title="跳蚤市场" map="发布" @edit="release"></v-header>
		<div ref="wrapper" class="wrapper">
			<div>
				<div class="tab">
					<router-link :to="'/fleaMarket/in/' + item.id" tag="div" class="item" v-for="(item, index) in list" :key="index">
						<img :src="httpUrl + item.img" />
						<p class="first">{{item.type_name}}</p>
						<!--<p class="second" >闲置好物品</p>-->
					</router-link>
					<!--<router-link to="/fleaMarket/in" tag="div" class="item">
				<img src="../../../static/flea-market2.png" />
				<p class="first">土特产</p>
				<p class="second">特色土特产</p>
			</router-link>
			<router-link to="/fleaMarket/in" tag="div" class="item">
				<img src="../../../static/flea-market2.png" />
				<p class="first">农产品</p>
				<p class="second">无害农产品</p>
			</router-link>-->
				</div>
				<div class="list border-1px">
					<div class="list-title">
						热门推荐
					</div>
					<flea-market-list :list="listData" :tip="tip" :loadingShow="loadingShow"></flea-market-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import { Swiper, SwiperItem } from 'vux'
	import FleaMarketList from '@/common/vue/FleaMarketList'
	export default {
		components: {
			'v-header': Header,
			Swiper,
			SwiperItem,
			FleaMarketList
		},
		created() {
			//跳蚤市场
			this.$http.get('getData/index.php?m=home&c=Form&a=infoTypeList', {
					params: {
						seachdata: {
							'parent_id': 38
						}
					}
				})
				.then((res) => {
					console.log('跳蚤市场')
					console.log(res)
					this.list = res.data.data
				})
			//跳蚤市场列表
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
					params: {
						seachdata: {
							'type_id': 38,
							'city': sessionStorage.getItem('city'),
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('跳蚤市场列表')
						console.log(res)
						this.listData.push.apply(this.listData, res.data.data)
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll()
							this.loadingShow = false
							this.tip = '上拉加载更多'
						})
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
					}
				})
		},
		data() {
			return {
				list: [],
				listData: [],
				httpUrl: localStorage.getItem('httpUrl'),
				count: 0,
				tip: '加载中',
				loadingShow: true
			}
		},
		methods: {
			release() {
				this.$router.push('/fleaMarket/release')
			},
			getListData() {
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 38,
								'city': sessionStorage.getItem('city'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('跳蚤市场列表')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this.scroll.refresh()
							})
						} else {
							this.tip = '没有数据了'
							this.loadingShow = false
						}
					})
			},
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: 2,
					click: true
				})
				this.scroll.on('touchend', (pos) => {
					//					console.log(pos)
					if(pos.y <= this.scroll.maxScrollY + 20) {
						this.tip = '上拉加载更多'
						this.loadingShow = true
						this.getListData()
						console.log(pos)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	@import url("../../../static/less/mixin.less");
	.flea-market-index-box {
		padding-top: 44px;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.tab {
			padding: 10px 12px;
			background-color: white;
			display: flex;
			height: 109px;
			width: 100%;
			box-sizing: border-box;
			.item {
				flex: 1;
				width: 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-top: 10px;
				img {
					width: 45px;
					height: 45px;
					margin: 0 auto;
					display: block;
				}
				p {
					text-align: center;
					font-size: 14px;
					line-height: 14px;
					&.first {
						margin-top: 12px;
					}
					&.second {
						font-size: 12px;
						color: #707070;
					}
				}
			}
		}
		.list {
			margin-top: 10px;
			.list-title {
				height: 49px;
				line-height: 49px;
				font-size: 14px;
				padding-left: 30px;
				background: url(../../../static/property-hot-icon.png) 12px center no-repeat;
				background-size: 9px 15px;
				.border-1px(#ececec);
				background-color: white;
			}
		}
	}
</style>