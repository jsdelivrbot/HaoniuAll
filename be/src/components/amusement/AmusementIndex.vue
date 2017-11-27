<template>
	<div class="amusement-index-box">
		<v-header title="吃喝玩乐"></v-header>
		<!--<swiper height="194px" dots-position="center">
			<swiper-item>
				<div class="row">
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(1).png" />
						<p>酒吧</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(2).png" />
						<p>KTV</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(3).png" />
						<p>按摩/洗浴</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(4).png" />
						<p>网吧网咖</p>
					</router-link>
				</div>
				<div class="row">
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(5).png" />
						<p>农家乐</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(6).png" />
						<p>DIY手工</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(7).png" />
						<p>购物</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(8).png" />
						<p>全部</p>
					</router-link>
				</div>
			</swiper-item>
			<swiper-item>
				<div class="row">
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(9).png" />
						<p>火锅</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(10).png" />
						<p>小吃快餐</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(11).png" />
						<p>川菜</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(12).png" />
						<p>自助餐</p>
					</router-link>
				</div>
				<div class="row">
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(13).png" />
						<p>咖啡厅</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(14).png" />
						<p>饮料甜品</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(15).png" />
						<p>生日蛋糕</p>
					</router-link>
					<router-link to="/" tag="div" class="item">
						<img src="../../../static/amusement-icon(8).png" />
						<p>全部</p>
					</router-link>
				</div>
			</swiper-item>
		</swiper>-->
		<!--<div class="tab1 border-1px">
			<div class="tab11 border-1px-right">
				<p class="tab-title1">太平鸟男装</p>
				<p class="tab-title2">最高优惠8.8折</p>
				<img src="../../../static/amusement1.png">
			</div>
			<div class="tab12">
				<div class="row">
					<div class="col">
						<p class="tab-title1">雅丹奴</p>
						<p class="tab-title2">高档真皮皮鞋</p>
						<img src="../../../static/amusement2.png">
					</div>
					<div class="col">
						<p class="tab-title1">佳芸眼镜</p>
						<p class="tab-title2">告别近视</p>
						<img src="../../../static/amusement3.png">
					</div>
				</div>
				<div class="row border-1px">
					<div class="col border-1px-right">
						<p class="tab-title1">雅丹奴</p>
						<p class="tab-title2">高档真皮皮鞋</p>
						<img src="../../../static/amusement2.png">
					</div>
					<div class="col border-1px-right">
						<p class="tab-title1">佳芸眼镜</p>
						<p class="tab-title2">告别近视</p>
						<img src="../../../static/amusement3.png">
					</div>
				</div>
			</div>
		</div>
		<div class="tab2">
			<div class="in-tab2">
				<img src="../../../static/amusement4.png">
				<img src="../../../static/amusement5.png">
				<img src="../../../static/amusement4.png">
				<img src="../../../static/amusement5.png">
				<img src="../../../static/amusement4.png">
				<img src="../../../static/amusement5.png">
			</div>
		</div>-->
		<div ref="wrapper" class="wrapper">
			<div>
				<div class="tab">
					<div class="row">
						<router-link :to="'/amusement/in/' + item.id" tag="div" class="item" v-for="(item, index) in list" :key="index" v-if="index <= 4">
							<img :src="httpUrl +　item.img" />
							<p>{{item.type_name}}</p>
						</router-link>
						<!--<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon2.png" />
					<p>KTV</p>
				</router-link>
				<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon3.png" />
					<p>按摩/洗浴</p>
				</router-link>
				<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon4.png" />
					<p>网吧网咖</p>
				</router-link>
				<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon9.png" />
					<p>火锅</p>
				</router-link>-->
					</div>
					<div class="row">
						<router-link :to="'/amusement/in/' + item.id" tag="div" class="item" v-for="(item, index) in list" :key="index" v-if="index > 4&&index <= 8">
							<img :src="httpUrl +　item.img" />
							<p>{{item.type_name}}</p>
						</router-link>
						<!--<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon6.png" />
					<p>DIY手工</p>
				</router-link>
				<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon7.png" />
					<p>购物</p>
				</router-link>
				<router-link to="/amusement/in" tag="div" class="item">
					<img src="../../../static/amusement-icon10.png" />
					<p>小吃快餐</p>
				</router-link>-->
						<router-link to="/amusement/more" tag="div" class="item">
							<img src="../../../static/usercenter/amusement-icon8.png" />
							<p>全部</p>
						</router-link>
					</div>
				</div>
				<div class="list border-1px">
					<div class="list-title">
						热门推荐
					</div>
				</div>
				<amusement-list :list="listData" :tip="tip" :loadingShow="loadingShow"></amusement-list>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import { Swiper, SwiperItem } from 'vux'
	import AmusementList from '@/common/vue/AmusementList'
	export default {
		name: 'AmusementIndex',
		components: {
			'v-header': Header,
			Swiper,
			SwiperItem,
			AmusementList
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 3,
								'city': sessionStorage.getItem('city'),
								'country': sessionStorage.getItem('counties'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('吃喝玩乐列表')
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
			//吃喝玩乐列表
			this.$http.get('getData/index.php?m=home&c=Form&a=infoTypeList', {
					params: {
						seachdata: {
							'parent_id': 3
						}
					}
				})
				.then((res) => {
					console.log('吃喝玩乐')
					console.log(res)
					this.list = res.data.data
				})
		},
		data() {
			return {
				list: [],
				httpUrl: localStorage.getItem('httpUrl'),
				listData: [],
				count: 0,
				tip: '加载中',
				loadingShow: true,
				flag: true
			}
		},
		methods: {
			getListData() {
				//吃喝玩乐信息列表
				if(!this.flag) {
					return
				}
				this.flag = false
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 3,
								'city': sessionStorage.getItem('city'),
								'country': sessionStorage.getItem('counties'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('吃喝玩乐列表')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this.scroll.refresh()
							})
							this.flag = true
						} else {
							this.tip = '没有数据了'
							this.loadingShow = false
							this.flag = true
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
	.amusement-index-box {
		padding-top: 44px;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		/*.vux-swiper {
			background-color: white;
			.vux-swiper-item {
				padding: 20px 0;
				box-sizing: border-box;
				.row {
					display: flex;
					height: 77px;
					width: 100%;
					.item {
						flex: 1;
						width: 0;
						img {
							width: 45px;
							height: 45px;
							margin: auto;
							display: block;
						}
						p {
							text-align: center;
							font-size: 14px;
						}
					}
				}
			}
		}
		.vux-indicator {
			a {
				.vux-icon-dot {
					background-color: white;
					border: 1px solid #e60012;
					border-radius: 50%;
					&.active {
						background-color: #e60012;
					}
				}
			}
		}*/
		.tab {
			padding: 20px 0;
			background-color: white;
			.row {
				display: flex;
				height: 77px;
				width: 100%;
				.item {
					flex: 1;
					width: 0;
					img {
						width: 45px;
						height: 45px;
						margin: auto;
						display: block;
					}
					p {
						text-align: center;
						font-size: 14px;
					}
				}
			}
		}
		/*.tab1 {
			height: 520/@rem;
			background-color: white;
			margin-top: 10px;
			padding: 0 24/@rem;
			box-sizing: border-box;
			line-height: 16px;
			.border-1px(#ececec);
			.tab-title1 {
				font-size: 14px;
				margin-top: 6px;
			}
			.tab-title2 {
				font-size: 12px;
				color: #f39700;
			}
			.tab11 {
				width: 280/@rem;
				height: 100%;
				float: left;
				text-align: center;
				.border-1px-right(#ececec);
				img {
					width: 204/@rem;
					margin-top: 86/@rem;
				}
			}
			.tab12 {
				width: 422/@rem;
				height: 100%;
				float: left;
				text-align: center;
				.row {
					width: 100%;
					height: 50%;
					&:first-child {
						.border-1px(#ececec);
					}
					.col {
						width: 50%;
						height: 100%;
						float: left;
						&:first-child {
							.border-1px-right(#ececec);
						}
						img {
							width: 144/@rem;
							margin-top: 20/@rem;
						}
					}
				}
			}
		}
		.tab2 {
			padding: 0 24/@rem;
			background-color: white;
			.in-tab2 {
				height: 148/@rem;
				background-color: white;
				box-sizing: border-box;
				display: flex;
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
				img {
					width: 319/@rem;
					height: 108/@rem;
					flex: 0 0 319/@rem;
					margin-top: 20/@rem;
					display: block;
					&+img {
						margin-left: 24/@rem;	
					}
				}
			}
		}*/
		.list {
			margin-top: 10px;
			background-color: white;
			.list-title {
				height: 49px;
				line-height: 49px;
				font-size: 14px;
				padding-left: 30px;
				background: url(../../../static/usercenter/property-hot-icon.png) 12px center no-repeat;
				background-size: 9px 15px;
				.border-1px(#ececec);
			}
		}
	}
</style>