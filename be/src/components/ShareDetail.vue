<template>
	<div class="share-detail-box">
		<div class="guide" v-show="guideShow">
			<p>
				1、阅读到最后“点击赚取”获得佣金！<br /> 2、分享到社交圈中，收益更快更多！
				<br /> 3、分享到社交圈时,写点分享语可以吸引阅读哦！
				<br />
				<!--1、分享到社交圈时,写点分享语可以吸引阅读哦!<br /> 2、分享到社交圈之后，自己点击阅读也有收益！
				<br /> 3、分享到社交圈中，收益更快更多！ <br />-->
			</p>
			<div class="close" @click.stop="guideShow=false">
				<img src="../../static/usercenter/hot-article-colose.png" />
			</div>
		</div>
		<div class="top-adv" v-if='topAdvList.length !== 0'>
			<swiper auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true" class="banner">
				<swiper-item v-for="(item, index) in topAdvList" :key="index" @click.native="goLink(item.url, item.link_type)">
					<img :src="item.img" class="swiper-img" />
				</swiper-item>
			</swiper>
		</div>
		<div class="content" v-html="content">
		</div>
		<div class="go-img" @click="goImg" v-if="infos.btn_img">
			<img :src="httpUrl + infos.btn_img" />
		</div>
		<share-btn :title='infos.article_title' :id='infos.id' :articleId="articleId" :article_rule_money="article_rule_money" :isChecked="isChecked" :isCollected="isCollected" v-if="isChecked && isCollected" :shareImg="infos.resp_img2"></share-btn>
		<div class="footer-adv" v-if="footerAdvList.length !== 0">
			<!--<div class="footer-adv-title">
				<span>广告</span>
			</div>-->
			<div class="adv">
				<!--<img src="../../../static/hot-article2.png" />-->
				<swiper auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true" class="banner">
					<swiper-item v-for="(item, index) in footerAdvList" :key="index" @click.native="goLink(item.url, item.link_type)">
						<img :src="item.img" class="swiper-img" />
					</swiper-item>
				</swiper>
			</div>
		</div>
		<div class="fix-adv" v-show="fixAdvShow" v-if="fixedAdvList.length !== 0">
			<div class="fix-close" @click="cancelFixAdv">
				&times;
			</div>
			<swiper :list="fixedAdvList" auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true">
				<swiper-item v-for="(item, index) in fixedAdvList" :key="index" @click.native="goLink(item.url, item.link_type)">
					<img :src="item.img" class="swiper-img" />
				</swiper-item>
			</swiper>
		</div>
	</div>
</template>

<script>
	import ShareBtn from '@/common/vue/ShareBtn'
	import { Swiper, SwiperItem } from 'vux'
	export default {
		name: 'ShareDetail',
		components: {
			ShareBtn,
			Swiper,
			SwiperItem
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
				article_rule_money: '',
				infos: {},
				isChecked: '',
				isCollected: '',
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
			goLink(link, type) {
				let fullUrl = this.$route.fullPath
				let taskUrl = '/task/detail'
				let articleUrl = '/hotArticle/detail'
				if(type === '1') {
					plus.runtime.openURL(link)
				} else if(type === '2' && fullUrl.indexOf(taskUrl) !== -1) {
					this.$router.replace(link)
					this.init()
					window.scroll(0, 0)
				} else if(type === '3' && fullUrl.indexOf(articleUrl) !== -1) {
					this.$router.replace(link)
					this.init()
					window.scroll(0, 0)
				} else {
					this.$router.push(link)
				}
			},
			init() {
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
						this.infos = res.data.data[0]
						this.content = res.data.data[0].article_content
						this.page_type = res.data.data[0].page_type
						this.article_rule_money = res.data.data[0].article_rule_money
						this.isChecked = res.data.data[0].is_checked
						this.isCollected = res.data.data[0].is_collect
						console.log(this.isChecked)
						//顶部
						this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
								params: {
									type: 2,
									seachdata: {
										position: 1,
										page_type: this.page_type,
										city: sessionStorage.getItem('city'),
										country: sessionStorage.getItem('counties'),
										province: sessionStorage.getItem('province'),
										aid: this.$route.params.id
									}
								}
							})
							.then((res) => {
								console.log('详情页轮播图顶部')
								console.log(res)
								this.topAdvList = []
								let imgarr = res.data.data
								for(let i = 0; i < imgarr.length; i++) {
									let link
									if(imgarr[i].link_type === '5') {
										let src = encodeURIComponent(imgarr[i].link.substring(2))
										link = '/shopping-mall?url=' + src
									} else {
										link = imgarr[i].link
									}
									this.topAdvList.push({
										url: link,
										img: this.httpUrl + imgarr[i].banner_img,
										title: imgarr[i].banner_title,
										link_type: imgarr[i].link_type
									})
								}
							})
						//底部浮动图片
						this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
								params: {
									type: 2,
									seachdata: {
										position: 2,
										page_type: this.page_type,
										city: sessionStorage.getItem('city'),
										country: sessionStorage.getItem('counties'),
										province: sessionStorage.getItem('province'),
										aid: this.$route.params.id
									}
								}
							})
							.then((res) => {
								console.log('详情页轮播图浮动')
								console.log(res)
								this.fixedAdvList = []
								let imgarr = res.data.data
								for(let i = 0; i < imgarr.length; i++) {
									let link
									if(imgarr[i].link_type === '5') {
										let src = encodeURIComponent(imgarr[i].link.substring(2))
										link = '/shopping-mall?url=' + src
									} else {
										link = imgarr[i].link
									}
									this.fixedAdvList.push({
										url: link,
										img: this.httpUrl + imgarr[i].banner_img,
										title: imgarr[i].banner_title,
										link_type: imgarr[i].link_type
									})
								}
							})
						//脚步图片
						this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
								params: {
									type: 2,
									seachdata: {
										position: 3,
										page_type: this.page_type,
										city: sessionStorage.getItem('city'),
										country: sessionStorage.getItem('counties'),
										province: sessionStorage.getItem('province'),
										aid: this.$route.params.id
									}
								}
							})
							.then((res) => {
								console.log('详情页轮播图脚步')
								console.log(res)
								this.footerAdvList = []
								let imgarr = res.data.data
								for(let i = 0; i < imgarr.length; i++) {
									let link
									if(imgarr[i].link_type === '5') {
										let src = encodeURIComponent(imgarr[i].link.substring(2))
										link = '/shopping-mall?url=' + src
									} else {
										link = imgarr[i].link
									}
									this.footerAdvList.push({
										url: link,
										img: this.httpUrl + imgarr[i].banner_img,
										title: imgarr[i].banner_title,
										link_type: imgarr[i].link_type
									})
								}
							})
					})
			},
			handleScroll() {
				this.fixAdvShow = window.scrollY <= document.documentElement.scrollHeight -
					document.documentElement.clientHeight - 200 &&
					window.scrollY >= 50
			},
			cancelFixAdv() {
				window.removeEventListener('scroll', this.handleScroll)
				this.fixAdvShow = false
			},
			goImg() {
				let fullUrl = this.$route.fullPath
				let taskUrl = '/task/detail'
				let articleUrl = '/hotArticle/detail'
				//				if(this.infos.link_type === '4') {
				//					let src = encodeURIComponent(this.infos.link.substring(2))
				//					let link = '/fxgshop?url=' + src
				//					this.$router.push(link)
				//				} else
				if(this.infos.link_type === '5') {
					let src = encodeURIComponent(this.infos.link.substring(2))
					let link = '/shopping-mall?url=' + src
					this.$router.push(link)
				} else if(this.infos.link_type === '1') {
					plus.runtime.openURL(this.infos.link)
				} else if(this.infos.link_type === '2' && fullUrl.indexOf(taskUrl) !== -1) {
					this.$router.replace(this.infos.link)
					this.init()
					window.scroll(0, 0)
				} else if(this.infos.link_type === '3' && fullUrl.indexOf(articleUrl) !== -1) {
					this.$router.replace(this.infos.link)
					this.init()
					//					this.$router.go(0)
					window.scroll(0, 0)
				} else {
					this.$router.push(this.infos.link)
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		created() {
			this.init()
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.share-detail-box {
		width: 100%;
		overflow: hidden;
		img {
			max-width: 100%;
		}
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
			padding: 24px 6px;
			background-color: white;
			overflow: hidden;
		}
		.go-img {
			max-width: 100%;
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
			/*.adv {
				padding: 12px 0 0;
			}*/
		}
		.fix-adv {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 150/@rem;
			z-index: 3;
			.vux-slider,
			.vux-swiper {
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