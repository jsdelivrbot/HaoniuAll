<template>
	<div class="interaction-index-box">
		<v-header title="线下互动"></v-header>
		<tab active-color="#e60012" defaultColor="#707070" custom-bar-width="118px">
			<tab-item selected @on-item-click="cut(1)">正在进行</tab-item>
			<tab-item @on-item-click="cut(2)">已结束</tab-item>
		</tab>
		<div ref="wrapper" class="wrapper">
			<interaction-list :list="listData" :tip="tip" :loadingShow="loadingShow"></interaction-list>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Tab, TabItem } from 'vux'
	import BScroll from 'better-scroll'
	import InteractionList from '@/common/vue/InteractionList'
	export default {
		components: {
			'v-header': Header,
			Tab,
			TabItem,
			InteractionList
		},
		created() {
			this.cut(1)
		},
		methods: {
			cut(id) {
				this.listData = []
				this.count = 0
				this.currentId = id
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
					params: {
						seachdata: {
							'type_id': 6,
							'action_status': id,
							'city': sessionStorage.getItem('city'),
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('线下互动列表' + id)
						console.log(res)
						this.listData.push.apply(this.listData, res.data.data)
						this.loadingShow = false
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll(id)
						})
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
						this.scroll.refresh()
					}
				})
			},
			getListData(id) {
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 6,
								'action_status': id,
								'city': sessionStorage.getItem('city'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('线下互动列表')
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
			_initScroll(id) {
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
						this.getListData(this.currentId)
						console.log(pos)
					}
				})
			}
		},
		data() {
			return {
				listData: [],
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false,
				currentId: 1
			}
		}
	}
</script>

<style lang="less">
	.interaction-index-box {
		padding-top: 94px;
		.wrapper {
			position: fixed;
			top: 94px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.vux-tab {
			width: 100%;
			height: 50px;
			line-height: 50px;
			position: fixed;
			left: 0;
			top: 44px;
			.vux-tab-item {
				font-size: 16px;
			}
		}
	}
</style>