<template>
	<div class="hot-article-index-box">
		<!--<v-header title="热门文章" map="任务说明" @edit="showMaster"></v-header>-->
		<div class="list-title border-1px">
			推荐文章
		</div>
		<div ref="wrapper" class="wrapper">
			<hot-article-list :data="articleList" :tip="tip" :loadingShow="loadingShow"></hot-article-list>
		</div>
		<index-footer></index-footer>
		<!--<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
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
		</div>-->
	</div>
</template>

<script>
	//	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import HotArticleList from '@/common/vue/HotArticleList'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		components: {
			//			'v-header': Header,
			HotArticleList,
			IndexFooter
		},
		created() {
			this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 1,
							seachdata: {
								page_type: 2,
								city: sessionStorage.getItem('city'),
								country: sessionStorage.getItem('counties'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('热门文章')
							console.log(res)
							this.articleList.push.apply(this.articleList, res.data.data)
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
				articleList: [],
				count: 0,
				tip: '加载中',
				loadingShow: true,
				flag: true
			}
		},
		methods: {
			getData() {
				if(!this.flag) {
					return
				}
				this.flag = false
				this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 1,
							seachdata: {
								page_type: 2,
								city: sessionStorage.getItem('city'),
								country: sessionStorage.getItem('counties'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('热门文章')
							console.log(res)
							this.articleList.push.apply(this.articleList, res.data.data)
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
						this.loadingShow = true
						this.getData()
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
	.hot-article-index-box {
		padding-bottom: 64px;
		/*.header-box{
			.map{
				padding-right: 16px;
			}
		}*/
		.list-title {
			height: 48px;
			line-height: 48px;
			font-size: 14px;
			color: #707070;
			padding-left: 12px;
			.border-1px(#e2e2e2);
		}
		.wrapper {
			position: fixed;
			top: 88px;
			bottom: 49px;
			width: 100%;
			overflow: hidden;
		}
		/*.master {
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
		}*/
	}
</style>