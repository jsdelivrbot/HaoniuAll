<template>
	<div class="share-task-box">
		<v-header title="分享购任务"></v-header>
		<div ref="wrapper" class="wrapper">
			<usercenter-share-task-list :list="listData" :tip="tip" :loadingShow="loadingShow"></usercenter-share-task-list>
		</div>
	</div>

</template>

<script>
	import Header from '@/common/vue/Header'
	import BScroll from 'better-scroll'
	import UsercenterShareTaskList from '@/common/vue/UsercenterShareTaskList'
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
			UsercenterShareTaskList
		},
		created() {
			this.getData()
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
			getData() {
				this.$http.get('getData/index.php?m=home&c=Form&a=shopShareList', {
						params: {
							seachdata: {
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log(res)
							this.listData = res.data.data
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
							this.tip = '暂无分享购任务'
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
				this.$http.get('getData/index.php?m=home&c=Form&a=shopShareList', {
						params: {
							seachdata: {
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
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
			}
		}
	}
</script>

<style lang="less">
	.share-task-box {
		padding-top: 54px;
		padding-bottom: 34px;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
	}
</style>