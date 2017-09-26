<template>
	<div class="task-index-box">
		<div ref="wrapper" class="wrapper">
			<task-list :data="taskList" :tip="tip" :loadingShow="loadingShow"></task-list>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import TaskList from '@/common/vue/TaskList'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		components: {
			'task-list': TaskList,
			'index-footer': IndexFooter
		},
		created() {
			this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 1,
							seachdata: {
								page_type: 1,
								city: sessionStorage.getItem('city'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('任务大厅')
							console.log(res)
							this.taskList.push.apply(this.taskList, res.data.data)
							this.count = this.count + 12
							this.$nextTick(() => {
								this._initScroll()
								this.loadingShow = false
								this.tip = '上拉加载更多'
							})
						}else {
							this.tip = '没有数据了'
							this.loadingShow = false
						}
					})
		},
		//		mounted() {
		//			setTimeout(() => {
		//				this._initScroll()
		//			}, 200)
		//		},
		data() {
			return {
				taskList: [],
				count: 0,
				tip: '加载中',
				loadingShow: true
			}
		},
		methods: {
			getData() {
				this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 1,
							seachdata: {
								page_type: 1,
								city: sessionStorage.getItem('city'),
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('任务大厅')
							console.log(res)
							this.taskList.push.apply(this.taskList, res.data.data)
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this.scroll.refresh()
							})
						}else {
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
		}
	}
</script>

<style lang="less">
	.task-index-box {
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 49px;
			width: 100%;
			overflow: hidden;
		}
	}
</style>