<template>
	<div class="shopping_detail_box">
		<v-header title="任务详情"></v-header>
		
		<swiper :list="baseList" auto :aspect-ratio="1/1" :show-desc-mask="false" :loop="true"></swiper>
		
		<p class="title vux-1px-b">
			{{info.title}}
		</p>
		
		<div class="detail current vux-1px-b" v-if="info.hasoption === '0'">
			<div class="count">
				<!--<p class="first">5斤装</p>-->
				<p class="second">好友收货后佣金立即到账！</p>
			</div>
			<div class="price">
				<p class="first">返佣：￥{{info.sendmoney}}元/单</p>
				<p class="second">售价： {{info.marketprice}}元</p>
			</div>
		</div>
		
		<div class="detail vux-1px-b" v-if="info.hasoption === '1'" 
			v-for="(item, index) in info.specoption" :key="index" 
			@click="currentOption = index" >
			<div class="count">
				<p class="first">{{item.title}}</p>
				<p class="second">好友收货后佣金立即到账！</p>
			</div>
			<div class="price">
				<p class="first">返佣：￥{{info.sendmoney}}元/单</p>
				<p class="second">售价： {{item.marketprice}}元</p>
			</div>
			<div class="checked">
				<img src="../../../static/usercenter/weigouxuan@2x.png" v-show="currentOption !== index" />
				<img src="../../../static/usercenter/gouxuan@2x.png" v-show="currentOption === index" />
			</div>
		</div>
		
		<div class="text" v-html="info.content"></div>
		
		<div class="footer vux-1px-t">
			<p class="item item1">
				分享次数：{{info.share_num}}
			</p>
			<p class="item item2" @click="masterShow = true">立即分享</p>
			<p class="item item3" @click="buy">立即购买</p>
		</div>
		
		<transition name="all">
			<div class="share-master" v-show="masterShow" @touchmove.prevent @click="masterShow=false">
				<transition name="up">
					<div class="category" @click.stop v-show="masterShow">
						<div class="row row1">
							<div class="icon"  @click="share('tm')">
								<img src="../../../static/usercenter/hot-article-category5.png" width="38px" />
								<p>微信朋友圈</p>
							</div>
							<div class="icon" @click="share('wx')">
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
	import { Swiper } from 'vux'
	export default {
		data() {
			return {
				baseList: [],
				id: this.$route.params.id,
				info: {},
				masterShow: false,
				currentOption: 0,
				uid: localStorage.getItem('id')
			}
		},
		computed: {
			optionid() {
				if(this.info.hasoption === '0') {
					return ''
				}else {
					return this.info.specoption[this.currentOption].id
				}
			}
		},
		components: {
			'v-header': Header,
			Swiper
		},
		created() {
			this.$http.get('getData/home/index/goodsdetail', {
				params: {
					goodsid: this.id
				}
			}).then((res) => {
				console.log(res)
				if(res.data.status === 1) {
					this.info = res.data.data
					for (let i = 0; i < this.info.thumb_url.length; i++) {
						this.baseList.push({
							url: 'javascript:',
							img: this.info.thumb_url[i]
						})
					}
				}
			})
		},
		methods: {
			buy() {
				this.$router.push({
					path: '/SureShopping',
					query: {
						id: this.info.id,
						optionid: this.optionid
					}
				})
			},
			share(selects) {
				this.$http.get('getData/home/index/addsharenum', {
					params: {
						goodsid: this.id
					}
				})
				let opts = {
					url: 'http://aifengxiang.hfrjkf.cn/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods.detail&id=' + this.id + '&uid=' + this.uid,
					title: this.info.title.substring(0, 10) + '...',
					content: this.info.title,
					img: this.info.thumb2
				}
				this.$CwxShare(selects, opts, function(res) {
					if(res) {
						mui.toast('分享成功!')
					} else {
						mui.toast('分享失败,请重试!')
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.shopping_detail_box {
		min-height: 100vh;
		background-color: white;
		padding: 44px 0 50px;
		box-sizing: border-box;
		.title {
			/*height: 42px;*/
			/*line-height: 42px;*/
			/*overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;*/
			padding: 12px;
			font-size: 14px;
		}
		.detail {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 68px;
			padding: 0 12px;
			.count {
				font-size: 14px;
				line-height: 24px;
				.first {
					color: #090909;
				}
				.second {
					color: #005d00;
					background: url(../../../static/usercenter/shopping_complete.png) left center no-repeat;
					background-size: 15px;
					padding-left: 20px;
				}
			}
			.price {
				line-height: 18px;
				.first {
					color: #e12a38;
					font-size: 14px;
					
				}
				.second {
					color: #bdbdbd;
					font-size: 12px;
					text-align: right;
				}
			}
			.checked {
				width: 20px;
				img {
					width: 100%;
				}
			}
		}
		.text {
			padding: 12px;
			overflow: hidden;
		}
		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			display: flex;
			.item {
				height: 100%;
				flex: 1;
				font-size: 14px;
				text-align: center;
				line-height: 50px;
			}
			.item1 {
				background-color: white;
				color: #999999;
				
			}
			.item2 {
				background-color: #ff5221;
				color: white;
			}
			.item3 {
				background-color: #e70012;
				color: white;
			}
		}
		.share-master {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 8;
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