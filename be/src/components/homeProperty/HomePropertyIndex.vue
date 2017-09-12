<template>
	<div class="home-property-box">
		<v-header title="房产家居"></v-header>
		<div ref="wrapper" class="wrapper">
			<div>
				<div class="category">
					<router-link :to="'/homeProperty/In/' + item.id" tag="div" class="category-item" v-for="(item, index) in list" :key="index">
						<img :src="httpUrl + item.img">
						<span class="text">{{item.type_name}}</span>
					</router-link>
					<!--<router-link to="/homeProperty/second" tag="div" class="category-item">
				<img src="../../../static/propertyicon2.png">
				<span class="text">二手房</span>
			</router-link>
			<router-link to="/homeProperty/rental" tag="div" class="category-item">
				<img src="../../../static/propertyicon3.png">
				<span class="text">租房</span>
			</router-link>
			<router-link to="/homeProperty/storefront" tag="div" class="category-item">
				<img src="../../../static/propertyicon4.png">
				<span class="text">门面</span>
			</router-link>
			<router-link to="/homeProperty/decorate" tag="div" class="category-item">
				<img src="../../../static/propertyicon5.png">
				<span class="text">家居</span>
			</router-link>-->
				</div>
				<!--<div class="menu">
			<div class="row border-1px">
				<div class="menu-item border-right border-1px-right menu-first">
					<p class="menu-title">小藤匠</p>
					<p class="menu-content">小藤匠传承古老技艺</p>
				</div>
				<div class="menu-item menu-second">
					<p class="menu-title">全有家私</p>
					<p class="menu-content">满减优惠，豪华大礼</p>
				</div>
			</div>
			<div class="row">
				<div class="menu-item border-right border-1px-right menu-third">
					<p class="menu-title">一站购</p>
					<p class="menu-content">最牛的家居建材</p>
				</div>
				<div class="menu-item menu-fourth">
					<p class="menu-title">一号家居网装饰</p>
					<p class="menu-content">最大的线上体验馆</p>
				</div>
			</div>
		</div>-->
				<div class="hot-recommendation">
					<div class="hot-title">
						热门推荐
					</div>
				</div>
				<home-property-list :list="listData" :tip="tip" :loadingShow="loadingShow"></home-property-list>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import HomePropertyList from '@/common/vue/HomePropertyList'
	export default {
		components: {
			'v-header': Header,
			HomePropertyList
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
					params: {
						seachdata: {
							'type_id': 4,
							'city': sessionStorage.getItem('city'),
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('房产家居列表')
						console.log(res)
						this.listData.push.apply(this.listData, res.data.data)
						this.loadingShow = false
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll()
						})
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
					}
				})
			//房产家具
			this.$http.get('getData/index.php?m=home&c=Form&a=infoTypeList', {
					params: {
						seachdata: {
							'parent_id': 4
						}
					}
				})
				.then((res) => {
					console.log('房产家居')
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
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		methods: {
			//房产家居列表
			getListData() {
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 4,
								'city': sessionStorage.getItem('city'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('房产家居列表')
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
	@import url("../../../static/less/mixin.less");
	.home-property-box {
		padding: 44px 0 0;
		box-sizing: border-box;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.category {
			height: 109px;
			background-color: white;
			padding: 0 12px;
			box-sizing: border-box;
			display: flex;
			.category-item {
				flex: 1;
				align-items: center;
				margin-top: 20px;
				img {
					width: 44px;
					height: 44px;
					display: block;
					margin: auto;
				}
				.text {
					text-align: center;
					display: block;
					font-size: 14px;
					color: #070707;
					margin-top: 10px;
				}
			}
		}
		.menu {
			height: 120px;
			background-color: white;
			margin-top: 20px;
			.row {
				height: 60px;
				display: flex;
				&:last-child {
					.border-none
				}
				.border-1px(#e2e2e2);
				.menu-item {
					flex: 1;
					padding-left: 12px;
					box-sizing: border-box;
					background-repeat: no-repeat;
					background-position: right 12px top 50%;
					p {
						font-size: 12px;
						&.menu-title {
							color: #000000;
							margin-top: 10px;
						}
						&.menu-content {
							color: #707070;
						}
					}
				}
				.border-right {
					.border-1px-right(#e2e2e2);
				}
				.menu-first {
					background-image: url(../../../static/property-menu1.png);
					background-size: 31px 55px;
				}
				.menu-second {
					background-image: url(../../../static/property-menu2.png);
					background-size: 60px 46px;
				}
				.menu-third {
					background-image: url(../../../static/property-menu3.png);
					background-size: 72px 34px;
				}
				.menu-fourth {
					background-image: url(../../../static/property-menu4.png);
					background-size: 54px 41px;
				}
			}
		}
		.hot-recommendation {
			margin-top: 20px;
			background-color: white;
			.hot-title {
				height: 39px;
				line-height: 39px;
				font-size: 14px;
				background: url(../../../static/property-hot-icon.png) 12px center no-repeat;
				background-size: 9px 16px;
				padding-left: 31px;
			}
		}
	}
</style>