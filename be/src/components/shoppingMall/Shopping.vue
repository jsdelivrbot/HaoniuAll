<template>
	<div class="shopping_box">
		<v-header title="分享购物"></v-header>

		<div class="search_box">
			<!--<div class="empty"></div>-->
			<div class="input">
				<input type="text" placeholder="请输入关键词" v-model="text" />
				<span @click="search">搜索</span>
			</div>
			<!--<div class="icon"></div>-->
		</div>

		<div class="tab_box vux-1px-t vux-1px-b">
			<div class="item vux-1px-r" @click="zonghe" :class="{current: currentShow === 'zonghe'}">
				<span>综合</span>
			</div>
			<div class="item vux-1px-r" @click="xiaoliang" :class="{current: currentShow === 'xiaoliang'}">
				<span>销量</span>
			</div>
			<div class="item vux-1px-r price" @click="jiage" :class="{current: currentShow === 'jiage1' || currentShow === 'jiage2'}">
				<span>价格</span>
				<img src="../../../static/usercenter/shoppingisort1.png" v-show="currentShow === 'jiage1'" />
				<img src="../../../static/usercenter/shoppingisor2.png" v-show="currentShow === 'jiage2'" />
			</div>
			<!--<div class="item shaixuan">
				<span>筛选</span>
				<img src="../../../static/shaixuan.png" />
			</div>-->
		</div>

		<div class="list_wrapper" ref="wrapper">
			<div>
				<router-link :to="'/ShoppingDetail/' + item.id" tag="div" class="list_item" v-for="(item, index) in listData" :key="index">
					<div class="img">
						<img :src="item.thumb" />
					</div>
					<div class="content">
						<p class="title">{{item.title}}</p>
						<div class="footer">
							<div class="text">
								<p>
									<span>价格</span>
									<span class="current">￥{{item.marketprice}}</span>
									<span>返佣</span>
									<span>￥{{item.sendmoney}}/单</span>
								</p>
								<p>
									{{item.share_num}}人已分享
								</p>
							</div>
							<div class="go_share" @click.stop="showMaster(index)">
								<span>立即分享</span>
							</div>
						</div>
					</div>
				</router-link>
				<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
			</div>
		</div>

		<transition name="all">
			<div class="share-master" v-show="masterShow" @touchmove.prevent @click="masterShow=false">
				<transition name="up">
					<div class="category" @click.stop v-show="masterShow">
						<div class="row row1">
							<div class="icon" @click="share('tm', index)">
								<img src="../../../static/usercenter/hot-article-category5.png" width="38px" />
								<p>微信朋友圈</p>
							</div>
							<div class="icon" @click="share('wx', index)">
								<img src="../../../static/usercenter/hot-article-category4.png" width="40px" />
								<p>微信好友</p>
							</div>
							<div class="icon">
								<img src="../../../static/usercenter/hot-article-category6.png" width="40px" />
								<p>QQ好友</p>
							</div>
						</div>
						<div class="row row2">
							<div class="icon">
								<img src="../../../static/usercenter/hot-article-category3.png" width="38px" />
								<p>微博</p>
							</div>
							<div class="icon"></div>
							<div class="icon"></div>
						</div>
						<div class="btn" @click="masterShow=false">
							取消
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				listData: [],
				loadingShow: true,
				tip: '加载中',
				page: 1,
				order: '',
				currentShow: '',
				text: '',
				keywords: '',
				masterShow: false,
				uid: localStorage.getItem('id'),
				index: '',
				flag: true
			}
		},
		created() {
			this.currentShow = 'zonghe'
			this.init()
		},
		components: {
			'v-header': Header,
			LoadMore
		},
		methods: {
			share(selects, index) {
				this.$http.get('getData/home/index/addsharenum', {
					params: {
						goodsid: this.listData[index].id
					}
				})
				this.$http.get('getData/home/index/goodsdetail', {
					params: {
						goodsid: this.listData[index].id
					}
				}).then((res) => {
					let thumb2
					if(res.data.status === 1) {
						thumb2 = res.data.data.thumb2
					} else {
						thumb2 = ''
					}
					let opts = {
						url: 'http://aifengxiang.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods.detail&id=' + this.listData[index].id + '&uid=' + this.uid,
						title: this.listData[index].title.substring(0, 10) + '...',
						content: this.listData[index].title,
						img: thumb2
					}
					this.$CwxShare(selects, opts, function(res) {
						if(res) {
							mui.toast('分享成功!')
						} else {
							mui.toast('分享失败,请重试!')
						}
					})
				})
			},
			showMaster(index) {
				this.masterShow = true
				this.index = index
			},
			zonghe() {
				this.currentShow = 'zonghe'
				this.page = 1
				this.order = ''
				this.by = ''
				this.keywords = ''
				this.loadingShow = true
				this.tip = '加载中'
				this.init()
			},
			xiaoliang() {
				this.currentShow = 'xiaoliang'
				this.page = 1
				this.order = 'sales'
				this.by = 'desc'
				this.keywords = ''
				this.loadingShow = true
				this.tip = '加载中'
				this.init()
			},
			jiage() {
				if(this.currentShow === 'jiage2') {
					this.currentShow = 'jiage1'
					this.page = 1
					this.order = 'minprice'
					this.by = 'asc'
					this.keywords = ''
					this.loadingShow = true
					this.tip = '加载中'
					this.init()
				} else {
					this.currentShow = 'jiage2'
					this.page = 1
					this.order = 'minprice'
					this.by = 'desc'
					this.keywords = ''
					this.loadingShow = true
					this.tip = '加载中'
					this.init()
				}
			},
			search() {
				this.currentShow = 'zonghe'
				this.page = 1
				this.order = ''
				this.by = ''
				this.keywords = this.text
				this.loadingShow = true
				this.tip = '加载中'
				this.init()
			},
			init() {
				this.listData = []
				this.$http.get('getData/home/index/goodslist', {
					params: {
						page: this.page.toString(),
						order: this.order,
						by: this.by,
						keywords: this.keywords
					}
				}).then((res) => {
					console.log(res)
					if(res.data.status === 1) {
						if(res.data.result.list === '') {
							this.tip = '暂无商品'
							this.loadingShow = false
							return
						}
						this.listData = res.data.result.list
						this.loadingShow = false
						this.tip = '上拉加载更多'
						this.page = this.page + 1
						this.$nextTick(() => {
							this._initScroll()
						})
					} else {
						this.tip = '暂无商品'
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
					if(pos.y <= this.scroll.maxScrollY + 20) {
						this.loadingShow = true
						this.tip = '加载中'
						this.getData()
					}
				})
			},
			getData() {
				if(!this.flag) {
					return
				}
				this.flag = false
				this.$http('getData/home/index/goodslist', {
					params: {
						page: this.page.toString(),
						order: this.order,
						by: this.by,
						keywords: this.keywords
					}
				}).then((res) => {
					if(res.data.status === 1) {
						if(res.data.result.list === '') {
							this.tip = '没有数据了'
							this.loadingShow = false
							this.flag = true
							return
						}
						this.listData.push.apply(this.listData, res.data.result.list)
						this.loadingShow = false
						this.page = this.page + 1
						this.$nextTick(() => {
							this.scroll.refresh()
						})
						this.flag = true
						this.tip = '上拉加载更多'
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
						this.flag = true
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.shopping_box {
		padding-top: 124px;
		.search_box {
			width: 100%;
			height: 44px;
			padding: 0 12px;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: 44px;
			background-color: white;
			z-index: 2;
			display: flex;
			.empty {
				width: 46px;
				flex: 0 0 46px;
			}
			.input {
				width: 100%;
				display: flex;
				align-items: center;
				input {
					flex: 1;
					/*width: 100%;*/
					display: block;
					height: 28px;
					background: url(../../../static/usercenter/search.png) 10px center no-repeat;
					background-size: 16px 16px;
					background-color: #efefef;
					border: none;
					font-size: 14px;
					text-indent: 3em;
					outline: none;
				}
				span {
					flex: 0 0 auto;
					display: block;
					width: 60px;
					height: 44px;
					font-size: 16px;
					text-align: center;
					line-height: 44px;
				}
			}
			.icon {
				width: 46px;
				flex: 0 0 46px;
			}
		}
		.tab_box {
			width: 100%;
			height: 40px;
			background-color: white;
			position: fixed;
			left: 0;
			top: 88px;
			display: flex;
			align-items: center;
			z-index: 2;
			.item {
				width: 0;
				flex: 1;
				text-align: center;
				height: 24px;
				line-height: 24px;
				font-size: 14px;
				color: #666666;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.price {
				img {
					width: 14px;
					height: 14px;
					margin-left: 6px;
				}
			}
			.current {
				color: #fd5454;
			}
			.shaixuan {
				img {
					width: 16px;
					height: 16px;
					margin-left: 6px;
				}
			}
		}
		.list_wrapper {
			position: fixed;
			top: 124px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			.list_item {
				position: relative;
				padding: 0 12px;
				height: 94px;
				background-color: white;
				display: flex;
				align-items: center;
				margin-top: 10px;
				display: flex;
				.img {
					width: 64px;
					height: 64px;
					flex: 0 0 64px;
					overflow: hidden;
					border-radius: 4px;
					img {
						width: 100%;
					}
				}
				.content {
					width: 0;
					height: 64px;
					flex: 1;
					margin-left: 12px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						font-size: 14px;
						color: #040404;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						line-height: 16px;
					}
					.footer {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.text {
							p {
								font-size: 12px;
								color: #818181;
								line-height: 14px;
								span {
									&.current {
										color: #e82803;
									}
								}
							}
						}
						.go_share {
							width: 72px;
							height: 20px;
							border: 1px solid #e60012;
							border-radius: 10px;
							background: url(../../../static/usercenter/share.png) 6px center no-repeat;
							background-size: 12px;
							font-size: 10px;
							line-height: 20px;
							/*padding-left: 12px;*/
							/*box-sizing: border-box;*/
							color: #fd5454;
							span {
								margin-left: 24px;
							}
						}
					}
				}
			}
		}
		.share-master {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 3;
			.category {
				background-color: #f0f0f0;
				width: 100%;
				height: 224px;
				position: absolute;
				left: 0;
				bottom: 0;
				.row {
					display: flex;
					height: 60px;
					align-items: center;
					margin-top: 20px;
					.icon {
						flex: 1;
						width: 0;
						text-align: center;
						p {
							font-size: 12px;
							margin-top: 6px;
						}
					}
				}
				.row2 {
					margin-bottom: 20px;
				}
				.btn {
					height: 44px;
					line-height: 44px;
					background-color: #ffffff;
					text-align: center;
					font-size: 12px;
					color: #707070;
				}
			}
		}
	}
</style>