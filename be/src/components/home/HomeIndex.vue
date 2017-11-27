<template>
	<div class="index-box">
		<index-header :city="citys" v-if="showAll === '1'"></index-header>
		<div ref="wrapper" class="wrapper" v-if="showAll === '1'">
			<div>
				<swiper auto :aspect-ratio="2/5" :show-desc-mask="false" :loop="true" class="banner">
					<swiper-item v-for="(item, index) in baseList" :key="index" @click.native="goLink(item.url, item.link_type)">
						<img :src="item.img" class="swiper-img" />
					</swiper-item>
				</swiper>
				<div class="menu" v-if="showAll === '1'">
					<div class="row">
						<router-link to="/task" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon1.png" />
							<p>任务大厅</p>
						</router-link>
						<router-link to="/hotArticle" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon2.png" />
							<p>热门文章</p>
						</router-link>
						<router-link to="/shopping" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon3.png" />
							<p>分享购物</p>
						</router-link>
						<!--<div class="item" @click="loadingOpen">
							<img src="../../../static/indexicon3.png" />
							<p>分享购</p>
						</div>-->
						<router-link to="/coupon" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon4.png" />
							<p>折扣券</p>
						</router-link>
						<router-link to="/lifeService" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon5.png" />
							<p>生活服务</p>
						</router-link>
					</div>
					<div class="row">
						<router-link to="/amusement" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon6.png" />
							<p>吃喝玩乐</p>
						</router-link>
						<!--<router-link to="/homeProperty" tag="div" class="item">
							<img src="../../../static/indexicon7.png" />
							<p>房产家居</p>
						</router-link>-->
						<router-link to="/free" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon8.png" />
							<p>今日免单</p>
						</router-link>
						<router-link to="/fleaMarket" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon9.png" />
							<p>跳蚤市场</p>
						</router-link>
						<router-link to="/interaction" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon10.png" />
							<p>线下互动</p>
						</router-link>
						<div class="item" @click="loadingOpen">
							<img src="../../../static/usercenter/amusement-icon8.png" />
							<p>更多</p>
						</div>
					</div>
				</div>
				<div class="menu" v-if="showAll === '0'">
					<div class="row">
						<router-link to="/lifeService" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon5.png" />
							<p>生活服务</p>
						</router-link>
						<router-link to="/amusement" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon6.png" />
							<p>吃喝玩乐</p>
						</router-link>
						<router-link to="/free" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon8.png" />
							<p>今日免单</p>
						</router-link>
						<router-link to="/fleaMarket" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon9.png" />
							<p>跳蚤市场</p>
						</router-link>
						<router-link to="/interaction" tag="div" class="item">
							<img src="../../../static/usercenter/indexicon10.png" />
							<p>线下互动</p>
						</router-link>
					</div>
				</div>
				<task-list :data="taskList" :tip="tip" :loadingShow="loadingShow" :isIndex="true" v-if="showAll === '1'"></task-list>
				<div class="img_box" v-if="showAll === '0'">
					<img src="../../../static/usercenter/showimg1.jpg" />
					<img src="../../../static/usercenter/showimg2.jpg" />
				</div>
			</div>
		</div>
		<iframe :src="httpUrl + 'app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods&groupid=2'" v-if="showAll === '0'"></iframe>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import IndexHeader from '@/common/vue/IndexHeader'
	import { Swiper, SwiperItem } from 'vux'
	import BScroll from 'better-scroll'
	import TaskList from '@/common/vue/TaskList'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		name: 'HomeIndex',
		components: {
			'index-header': IndexHeader,
			Swiper,
			'task-list': TaskList,
			'index-footer': IndexFooter,
			SwiperItem
		},
		data() {
			return {
				baseList: [],
				taskList: [],
				httpUrl: localStorage.getItem('httpUrl'),
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false,
				gps: '',
				city: sessionStorage.getItem('city'),
				country: sessionStorage.getItem('counties'),
				showAll: sessionStorage.getItem('showAll'),
				flag: true
			}
		},
		activated() {
			mui.plusReady(function() {
				if(plus.webview.getWebviewById('news') === null) {
					plus.webview.getWebviewById('news').hide()
				}
				if(plus.webview.getWebviewById('fxg') === null) {
					plus.webview.getWebviewById('fxg').hide()
				}
			})
		},
		created() {
			mui.plusReady(function() {
				if(plus.webview.getWebviewById('news') === null) {
					plus.webview.getWebviewById('news').hide()
				}
				if(plus.webview.getWebviewById('fxg') === null) {
					plus.webview.getWebviewById('fxg').hide()
				}
			})
			//判断是否显示全部
			this.$http.get('getData/index.php?m=home&c=Form&a=showMenu', {
					params: {
						seachdata: {
							versions: '1.0101'
						}
					}
				})
				.then((res) => {
					if(res.data.result === 0) {
						sessionStorage.setItem('showAll', '0')
					} else {
						sessionStorage.setItem('showAll', '1')
					}
					this.showAll = sessionStorage.getItem('showAll')
				})
		},
		mounted() {
			let $this = this
			this.$CGPS(function(val) {
				$this.gps = val
				$this.getGps()
			})
		},
		methods: {
			init() {
				//轮播图
				this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
						params: {
							type: 0,
							seachdata: {
								province: sessionStorage.getItem('province'),
								city: sessionStorage.getItem('city'),
								country: sessionStorage.getItem('counties')
							}
						}
					})
					.then((res) => {
						let imgarr = res.data.data
						for(let i = 0; i < imgarr.length; i++) {
							let link
							//						if(imgarr[i].link_type === '4') {
							//							let src = encodeURIComponent(imgarr[i].link.substring(2))
							//							link = '/fxgshop?url=' + src
							//						} else
							if(imgarr[i].link_type === '5') {
								let src = encodeURIComponent(imgarr[i].link.substring(2))
								link = '/shopping-mall?url=' + src
							} else {
								link = imgarr[i].link
							}
							this.baseList.push({
								url: link,
								img: this.httpUrl + imgarr[i].banner_img,
								title: imgarr[i].banner_title,
								link_type: imgarr[i].link_type
							})
						}
					})
				//任务列表
				this.$http.get('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 0,
							seachdata: {
								page_type: 0,
								city: sessionStorage.getItem('city'),
								country: sessionStorage.getItem('counties'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							this.taskList.push.apply(this.taskList, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							setTimeout(() => {
								this.$nextTick(() => {
									this._initScroll()
								})
							}, 200)
						} else {
							this.tip = '没有数据了'
							this.loadingShow = false
						}
					})
			},
			loadingOpen() {
				this.$vux.alert.show({
					title: '提示',
					content: '敬请期待'
				})
			},
			getGps() {
				this.$http.get('/getData/index.php?m=home&c=Form&a=getCityName&seachdata={"x":"' + this.gps.lat + '","y":"' + this.gps.lng + '"}').then(
					(res) => {
						if(res) {
//							alert(res.data.data.province)
							if(this.city === '') {
								this.province = res.data.data.province
								this.city = res.data.data.city
								this.country = res.data.data.county
								sessionStorage.setItem('province', this.province)
								sessionStorage.setItem('city', this.city)
								sessionStorage.setItem('cityPosition', this.city)
								sessionStorage.setItem('counties', this.country)
							}
							this.init()
						} else {
							mui.toast('获取位置信息失败,请打开GPS!')
							this.init()
						}
					}
				)
			},
			getData() {
				if(!this.flag) {
					return
				}
				this.flag = false
				this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						type: 0,
						params: {
							seachdata: {
								'limit': this.count + ',12',
								city: sessionStorage.getItem('city'),
								country: sessionStorage.getItem('counties'),
								page_type: 0
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							this.taskList.push.apply(this.taskList, res.data.data)
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
					if(pos.y <= this.scroll.maxScrollY + 20) {
						this.loadingShow = true
						this.getData()
					}
				})
			},
			goLink(link, type) {
				if(type === '1') {
					plus.runtime.openURL(link)
				} else {
					this.$router.push(link)
				}
			}
		},
		computed: {
			citys() {
				if(!this.city) {
					return '全国'
				}
				if(this.country) {
					return this.country
				}
				return this.city
			}
		},
		beforeRouteEnter(to, from, next) {
			if(from.fullPath === '/home/position') {
				next(vm => {
					vm.city = sessionStorage.getItem('counties')
				})
			}
			next()
		}
	}
</script>

<style lang="less">
	.index-box {
		padding-top: 54px;
		iframe {
			margin-top: -54px;
			width: 100%;
			height: 100vh;
			box-sizing: border-box;
			border: none;
			padding-bottom: 44px;
		}
		.wrapper {
			position: fixed;
			top: 49px;
			bottom: 49px;
			width: 100%;
			overflow: hidden;
		}
		.menu {
			background-color: white;
			/*height: 144px;*/
			padding: 14px 12px;
			box-sizing: border-box;
			.row {
				display: flex;
				height: 56px;
				&:last-child {
					margin-top: 12px;
				}
				.item {
					flex: 1;
					img {
						height: 40px;
						margin: auto;
						display: block;
					}
					p {
						font-size: 12px;
						text-align: center;
					}
				}
			}
		}
		.swiper-img {
			width: 100%;
		}
		.img_box {
			width: 100%;
			img {
				width: 100%;
				margin-top: 10px;
			}
		}
	}
</style>