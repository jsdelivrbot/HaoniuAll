<template>
	<div class="share-detail-box">
		<div class="guide" v-show="guideShow">
			<p>
				1.分享搭配朋友圈时，写点分享语可吸引阅读哦！<br/> 2.分享到微信之后，自己点击阅读也有收益！ <br/> 3.分享到微信群中，收益更多更快！
				<br/>
			</p>
			<div class="close" @click.stop="guideShow=false">
				<img src="../../static/hot-article-colose.png" />
			</div>
		</div>
		<div class="top-adv">
			<swiper :list="topAdvList" auto :aspect-ratio="1/4" 
				:show-desc-mask="false" :loop="true" class="banner"></swiper>
		</div>
		<div class="content" v-html="content">
		</div>
		<share-btn :articleId="articleId" :article_rule_money="article_rule_money"></share-btn>
		<div class="footer-adv">
			<!--<div class="footer-adv-title">
				<span>广告</span>
			</div>-->
			<div class="adv">
				<!--<img src="../../../static/hot-article2.png" />-->
				<swiper :list="footerAdvList" auto :aspect-ratio="130/679" 
					:show-desc-mask="false" :loop="true" class="banner"></swiper>
			</div>
		</div>
		<div class="fix-adv" v-show="fixAdvShow">
			<div class="fix-close" @click="cancelFixAdv">
				&times;
			</div>
			<swiper :list="fixedAdvList" auto :aspect-ratio="130/679" 
				:show-desc-mask="false" :loop="true"></swiper>
		</div>
	</div>
</template>

<script>
	import ShareBtn from '@/common/vue/ShareBtn'
	import { Swiper } from 'vux'
	export default {
		components: {
			ShareBtn,
			Swiper
		},
		computed: {
			articleId() {
				return this.$route.params.id
			}
		},
		data() {
			return {
				topAdvList: [],
				footerAdvList: [],
				fixedAdvList: [],
				guideShow: true,
				fixAdvShow: false,
				content: '',
				page_type: Number,
				article_rule_money: ''
			}
		},
		methods: {
			handleScroll () {
				this.fixAdvShow = window.scrollY <= document.documentElement.scrollHeight -
				document.documentElement.clientHeight - 200 &&
				window.scrollY >= 200
			},
			cancelFixAdv() {
				window.removeEventListener('scroll', this.handleScroll)
				this.fixAdvShow = false
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.handleScroll)
		},
		created() {
			let httpUrl = localStorage.getItem('httpUrl')
			//任务详情
			this.$http.get('getData/index.php?m=home&c=Form&a=articleList', {
				params: {
					type: 2,
					seachdata: {
						id: this.$route.params.id
					}
				}
			})
			.then((res) => {
				console.log('任务详情')
				console.log(res)
				this.content = res.data.data[0].article_content
				this.page_type = res.data.data[0].page_type
				this.article_rule_money = res.data.data[0].article_rule_money
				//顶部
				this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
					params: {
						type: 2,
						seachdata: {
							position: 1,
							page_type: this.page_type
						}
					}
				})
				.then((res) => {
					console.log('详情页轮播图顶部')
					console.log(res)
					let imgarr = res.data.data
					for (let i = 0; i < imgarr.length; i++) {
						this.topAdvList.push({
							url: 'javascript:',
							img: httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title
						})
					}
				})
				//底部浮动图片
				this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
					params: {
						type: 2,
						seachdata: {
							position: 2,
							page_type: this.page_type
						}
					}
				})
				.then((res) => {
					console.log('详情页轮播图浮动')
					console.log(res)
					let imgarr = res.data.data
					for (let i = 0; i < imgarr.length; i++) {
						this.fixedAdvList.push({
							url: 'javascript:',
							img: httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title
						})
					}
				})
				//脚步图片
				this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
					params: {
						type: 2,
						seachdata: {
							position: 2,
							page_type: this.page_type
						}
					}
				})
				.then((res) => {
					console.log('详情页轮播图脚步')
					console.log(res)
					let imgarr = res.data.data
					for (let i = 0; i < imgarr.length; i++) {
						this.footerAdvList.push({
							url: 'javascript:',
							img: httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title
						})
					}
				})
			})
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.share-detail-box {
		.guide {
				height: 82px;
				width: 100%;
				background-color: #8B8B8B;
				/*background-color: rgba(0, 0, 0, 0.4);*/
				/*position: absolute;*/
				/*top: 44px;*/
				padding: 0 12px;
				box-sizing: border-box;
				p {
					color: white;
					font-size: 12px;
					line-height: 24px;
					float: left;
				}
				.close {
					float: right;
					width: 17px;
					height: 17px;
					margin-top: 20px;
					padding: 12px;
					margin-right: -12px;
					img {
						width: 100%;
					}
				}
			}
		.content {
			padding: 24px 12px;
			background-color: white;
		}
		.footer-adv {
			.footer-adv-title {
				height: 13px;
				border-bottom: 1px dashed #e2e2e2;
				span {
					text-align: center;
					font-size: 14px;
					color: #707070;
					height: 26px;
					line-height: 26px;
					display: block;
					background-color: #F0F0F0;
					width: 60px;
					margin: auto;
				}
			}
			.adv {
				padding: 12px 0 0;
			}
		}
		.fix-adv {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 145/@rem;
			z-index: 3;
			.vux-slider,.vux-swiper {
				height: 100% !important;
			}
			.fix-close {
				position: absolute;
				width: 40/@rem;
				height: 40/@rem;
				border: 1px solid white;
				border-radius: 50%;
				z-index: 4;
				color: white;
				right: 24/@rem;
				top: 12/@rem;
				text-align: center;
				font-size: 40/@rem;
				line-height: 36/@rem;
			}
		}
	}
</style>