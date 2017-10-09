<template>
	<div class="index-box">
		<index-header :city="city"></index-header>
		<div ref="wrapper" class="wrapper">
			<div>
				<swiper :list="baseList" auto :aspect-ratio="2/5" :show-desc-mask="false" :loop="true" class="banner"></swiper>
				<div class="menu">
					<div class="row">
						<router-link to="/task" tag="div" class="item">
							<img src="../../../static/indexicon1.png" />
							<p>任务大厅</p>
						</router-link>
						<router-link to="/hotArticle" tag="div" class="item">
							<img src="../../../static/indexicon2.png" />
							<p>热门文章</p>
						</router-link>
						<router-link to="/fxgshop" tag="div" class="item">
							<img src="../../../static/indexicon3.png" />
							<p>分享购</p>
						</router-link>
						<!--<div class="item" @click="loadingOpen">
							<img src="../../../static/indexicon3.png" />
							<p>分享购</p>
						</div>-->
						<router-link to="/coupon" tag="div" class="item">
							<img src="../../../static/indexicon4.png" />
							<p>折扣券</p>
						</router-link>
						<router-link to="/lifeService" tag="div" class="item">
							<img src="../../../static/indexicon5.png" />
							<p>生活服务</p>
						</router-link>
					</div>
					<div class="row">
						<router-link to="/amusement" tag="div" class="item">
							<img src="../../../static/indexicon6.png" />
							<p>吃喝玩乐</p>
						</router-link>
						<!--<router-link to="/homeProperty" tag="div" class="item">
							<img src="../../../static/indexicon7.png" />
							<p>房产家居</p>
						</router-link>-->
						<router-link to="/free" tag="div" class="item">
							<img src="../../../static/indexicon8.png" />
							<p>今日免单</p>
						</router-link>
						<router-link to="/fleaMarket" tag="div" class="item">
							<img src="../../../static/indexicon9.png" />
							<p>跳蚤市场</p>
						</router-link>
						<router-link to="/interaction" tag="div" class="item">
							<img src="../../../static/indexicon10.png" />
							<p>线下互动</p>
						</router-link>
						<div class="item" @click="loadingOpen">
							<img src="../../../static/amusement-icon8.png" />
							<p>更多</p>
						</div>
					</div>
				</div>
				<task-list :data="taskList" :tip="tip" :loadingShow="loadingShow"></task-list>
			</div>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import IndexHeader from '@/common/vue/IndexHeader'
	import { Swiper } from 'vux'
	import BScroll from 'better-scroll'
	import TaskList from '@/common/vue/TaskList'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		components: {
			'index-header': IndexHeader,
			Swiper,
			'task-list': TaskList,
			'index-footer': IndexFooter
		},
		data() {
			return {
				baseList: [],
				taskList: [],
				httpUrl: localStorage.getItem('httpUrl'),
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		created() {
			//轮播图
			this.$http.get('getData/index.php?m=home&c=Form&a=bannerList', {
					params: {
						type: 0
					}
				})
				.then((res) => {
					console.log('首页轮播图')
					console.log(res)
					let imgarr = res.data.data
					for(let i = 0; i < imgarr.length; i++) {
						this.baseList.push({
							url: 'javascript:',
							img: this.httpUrl + imgarr[i].banner_img,
							title: imgarr[i].banner_title
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
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('全部任务')
						console.log(res)
						this.taskList.push.apply(this.taskList, res.data.data)
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
		},
		methods: {
			loadingOpen() {
				this.$vux.alert.show({
					title: '提示',
					content: '敬情期待'
				})
			},
			getData() {
				this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 0,
							page_type: 0,
							city: sessionStorage.getItem('city'),
							seachdata: {
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('全部任务')
							console.log(res)
							this.taskList.push.apply(this.taskList, res.data.data)
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
						this.loadingShow = true
						this.getData()
						console.log(pos)
					}
				})
			}
		},
		computed: {
			city() {
				const city = sessionStorage.getItem('city')
				if(city === '') {
					return '全国'
				}
				return city
			}
		}
	}
</script>

<style lang="less">
	.index-box {
		padding-top: 54px;
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
	}
</style>