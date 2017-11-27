<template>
	<div class="all-task-box">
		<v-header title="全部任务"></v-header>
		<tab bar-active-color="#e8000f" active-color='#e8000f'>
			<tab-item selected @on-item-click="chooseAll">全部</tab-item>
			<tab-item @on-item-click="chooseInProgress">进行时</tab-item>
			<tab-item @on-item-click="chooseOverProgress">已结束</tab-item>
		</tab>
		<div ref="wrapper" class="wrapper">
			<usercenter-task-list :list="listData" :tip="tip" :loadingShow="loadingShow"></usercenter-task-list>
		</div>
	</div>

</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import UsercenterTaskList from '@/common/vue/UsercenterTaskList'
	import { Tab, TabItem } from 'vux'
	export default {
		data() {
			return {
				listData: [],
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false,
				status: '',
				flag: true
			}
		},
		components: {
			'v-header': Header,
			Tab,
			TabItem,
			UsercenterTaskList
		},
		created() {
			this.getData('')
		},
		methods: {
			judgeDate(value) {
				let timestamp = Date.parse(new Date()) / 1000
				if(timestamp >= value) {
					return 0
				} else {
					return 1
				}
			},
			getData(status) {
				this.$http.get('getData/index.php?m=home&c=Form&a=articleShareList', {
						params: {
							seachdata: {
								'limit': this.count + ',12',
								'action_status': status
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('全部任务')
							console.log(res)
							this.listData = res.data.data
							this.listData.map((item) => {
								let time = item.end_time
								if(this.judgeDate(time) === 0) {
									item.date = 0
								}
								if(this.judgeDate(time) === 1) {
									item.date = 1
								}
							})
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this._initScroll()
							})
						} else {
							this.listData = []
							this.$nextTick(() => {
								this.scroll.refresh()
							})
							this.tip = '暂无任务'
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
						this.tip = '上拉加载更多'
						this.loadingShow = true
						this.getListData()
						console.log(pos)
					}
				})
			},
			getListData() {
				if(!this.flag) {
					return
				}
				this.flag = false
				this.$http.get('getData/index.php?m=home&c=Form&a=articleShareList', {
						params: {
							seachdata: {
								'limit': this.count + ',1',
								'action_status': this.status
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('我的优惠券')
							console.log(res)
							this.listData.push.apply(this.listData, res.data.data)
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
			chooseAll() {
				this.count = 0
				this.status = ''
				this.tip = '上拉加载更多'
				this.getData()
			},
			chooseInProgress() {
				this.count = 0
				this.status = 2
				this.tip = '上拉加载更多'
				this.getData(2)
			},
			chooseOverProgress() {
				this.count = 0
				this.status = 3
				this.tip = '上拉加载更多'
				this.getData(3)
			}
		}
	}
</script>

<style lang="less">
	.all-task-box {
		padding-top: 54px;
		padding-bottom: 34px;
		.wrapper {
			position: fixed;
			top: 98px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
	}
</style>