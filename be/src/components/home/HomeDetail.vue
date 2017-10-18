<template>
	<div class="home-detail-box">
		<v-header title="任务大厅" map="任务说明" @edit="showMaster" v-if="infos.page_type === '1'"></v-header>
		<v-header title="热门文章" map="任务说明" @edit="showMaster" v-if="infos.page_type === '2'"></v-header>
		<div class="guide" v-show="guideShow">
			<p>
				1、分享到社交圈时,写点分享语可以吸引阅读哦!<br /> 2、分享到社交圈之后，自己点击阅读也有收益！
				<br /> 3、分享到社交圈中，收益更快更多！ <br />
			</p>
			<div class="close" @click.stop="guideShow=false">
				<img src="../../../static/hot-article-colose.png" />
			</div>
		</div>
		<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
			<div class="content">
				<p>
					1、打开任务阅读到最后领取佣金；<br/>
					2、分享到社交圈，好友查看同样有收益；<br/>
					3、任务打开后阅读至少6秒钟；<br/>
					4、每增加一次阅读可得0.05元以上收益，最高可得20元；<br/>
					5、自己分享并阅读也有相同收益；<br/>
					6、分享到社交圈时，写点分享语可以吸引阅读哦。<br/>
				</p>
			</div>
		</div>
		<div class="top-adv" v-if='topAdvList.length !== 0'>
			<swiper :list="topAdvList" auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true" class="banner"></swiper>
		</div>
		<div class="content-text" v-html="content">
		</div>
		<div class="go-img" @click="goImg" v-if="infos.btn_img">
			<img :src="httpUrl + infos.btn_img" />
		</div>
		<share-btn :title='infos.article_title' :id='infos.id' :articleId="articleId" :article_rule_money="article_rule_money" :isChecked="isChecked" v-if="isChecked" :shareImg="infos.resp_img2"></share-btn>
		<div class="footer-adv" v-if="footerAdvList.length !== 0">
			<!--<div class="footer-adv-title">
				<span>广告</span>
			</div>-->
			<div class="adv">
				<!--<img src="../../../static/hot-article2.png" />-->
				<swiper :list="footerAdvList" auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true" class="banner"></swiper>
			</div>
		</div>
		<div class="fix-adv" v-show="fixAdvShow" v-if="fixedAdvList.length !== 0">
			<div class="fix-close" @click="cancelFixAdv">
				&times;
			</div>
			<swiper :list="fixedAdvList" auto :aspect-ratio="1/5" :show-desc-mask="false" :loop="true"></swiper>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import ShareBtn from '@/common/vue/ShareBtn'
	import { Swiper } from 'vux'
	export default {
		name: 'ShareDetail',
		components: {
			ShareBtn,
			Swiper,
			'v-header': Header
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
				masterShow: false,
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
			handleScroll() {
				this.fixAdvShow = window.scrollY <= document.documentElement.scrollHeight -
					document.documentElement.clientHeight - 200 &&
					window.scrollY >= 50
			},
			cancelFixAdv() {
				window.removeEventListener('scroll', this.handleScroll)
				this.fixAdvShow = false
			},
			showMaster() {
				this.masterShow = true
			},
			goImg() {
				let fullUrl = this.$route.fullPath
				let taskUrl = '/task/detail'
				let articleUrl = '/hotArticle/detail'
				if(this.infos.link_type === '4') {
					let src = encodeURIComponent(this.infos.link.substring(2))
					let link = '/fxgshop?url=' + src
					this.$router.push(link)
				} else if(this.infos.link_type === '5') {
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
					console.log(this.isChecked)
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
							for(let i = 0; i < imgarr.length; i++) {
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
							for(let i = 0; i < imgarr.length; i++) {
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
									position: 3,
									page_type: this.page_type
								}
							}
						})
						.then((res) => {
							console.log('详情页轮播图脚步')
							console.log(res)
							let imgarr = res.data.data
							for(let i = 0; i < imgarr.length; i++) {
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
	.home-detail-box {
		width: 100%;
		overflow: hidden;
		padding-top: 44px;
		.header-box {
			.map {
				padding-right: 16px;
			}
		}
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
		.master {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 10;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.4);
			.content {
				width: 640/@rem;
				min-height: 340/@rem;
				background-color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -320/@rem;
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
					margin-right: 40/@rem;
				}
			}
		}
		.content-text {
			padding: 24px 6px;
			background-color: white;
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