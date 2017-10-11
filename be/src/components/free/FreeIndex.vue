<template>
	<div class="free-index-box">
		<v-header title="今日免单"></v-header>
		<tab :data="tabList" type_id="5" @getData="getData"></tab>
		<div ref="wrapper" class="wrapper">
			<free-list :list="listData" :tip="tip" :loadingShow="loadingShow"></free-list>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import Tab from '@/common/vue/Tab'
	import BScroll from 'better-scroll'
	import FreeList from '@/common/vue/FreeList'
	export default {
		components: {
			'v-header': Header,
			Tab,
			FreeList
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
					params: {
						seachdata: {
							'type_id': 5,
							'city': sessionStorage.getItem('city'),
							'option_data': this.searchData,
							'limit': this.count + ',12'
						}
					}
				})
				.then((res) => {
					if(res.data.datastatus === 1) {
						console.log('今日免单列表')
						console.log(res)
						this.listData.push.apply(this.listData, res.data.data)
						this.count = this.count + 12
						this.$nextTick(() => {
							this._initScroll()
							this.loadingShow = false
							this.tip = '上拉加载更多'
						})
					} else {
						this.tip = '没有数据了'
						this.loadingShow = false
					}
				})
			//选项列表
			this.$http.get('getData/index.php?m=home&c=Form&a=optionList', {
					params: {
						seachdata: {
							'type_id': 5,
							'city': sessionStorage.getItem('city')
						}
					}
				})
				.then((res) => {
					console.log('选项列表')
					console.log(res)
					this.tabList = res.data.data
				})
		},
		data() {
			return {
				listData: [],
				tabList: [],
				searchData: [],
				count: 0,
				tip: '加载中',
				loadingShow: true
			}
		},
		methods: {
			//选项结果
			getData(res, searchData) {
				console.log('选项结果')
				console.log(res, searchData)
				this.searchData = searchData
				let $this = this
				this.count = 12
				if(res.data.datastatus === 0) {
					this.listData = []
					setTimeout(() => {
						$this.scroll.refresh()
						this.tip = '暂无此类信息'
					}, 20)
					return
				}
				this.listData = res.data.data
				setTimeout(() => {
					$this.scroll.refresh()
				}, 20)
			},
			getListData() {
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': 5,
								'city': sessionStorage.getItem('city'),
								'option_data': this.searchData,
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('今日免单列表')
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
						this.tip = '上拉加载更多'
						this.loadingShow = true
						this.getListData()
						console.log(pos)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.free-index-box {
		padding-top: 98px;
		.wrapper {
			position: fixed;
			top: 98px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
	}
</style>