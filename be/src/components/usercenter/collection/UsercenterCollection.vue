<template>
	<div class="usercenter-collection-box">
		<v-header title="任务收藏" map="管理" @edit="edit"></v-header>
		<!--<tab bar-active-color="#e8000f" active-color='#e8000f' custom-bar-width="90px" v-model="index">
			<tab-item selected>任务商城</tab-item>
			<tab-item>佣金商城</tab-item>
		</tab>-->
		<div ref="wrapper" class="wrapper">
			<usercenter-collection-task-list :list="listData" :tip="tip" :loadingShow="loadingShow"
				@spliceList="spliceList"></usercenter-collection-task-list>
		</div>
		<!--<usercenter-collection-shopping-list v-show="index === 1"></usercenter-collection-shopping-list>-->
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import BScroll from 'better-scroll'
	import UsercenterCollectionTaskList from '@/common/vue/UsercenterCollectionTaskList'
	import UsercenterCollectionShoppingList from '@/common/vue/UsercenterCollectionShoppingList'
	export default {
		components: {
			'v-header': Header,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			UsercenterCollectionTaskList,
			UsercenterCollectionShoppingList
		},
		data() {
			return {
//				index: 0
				listData: [],
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		created() {
			this.$http('getData/index.php?m=home&c=Form&a=infoCollectList', {
						params: {
							seachdata: {
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('任务收藏')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this._initScroll()
							})
						} else {
							this.tip = '暂无收藏'
							this.loadingShow = false
						}
					})
		},
		methods: {
			edit() {
				this.$store.commit('edit')
			},
			getData() {
				this.$http('getData/index.php?m=home&c=Form&a=infoCollectList', {
						params: {
							seachdata: {
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('任务收藏')
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
						this.loadingShow = true
						this.getData()
						console.log(pos)
					}
				})
			},
			spliceList(index) {
				this.listData.splice(index, 1)
				this.scroll.refresh()
			}
		},
		beforeRouteLeave(to, from, next) {
			this.$store.commit('cancelEdit')
			next()
		}
	}
</script>

<style lang="less">
	.usercenter-collection-box {
		padding-top: 44px;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
	}
</style>