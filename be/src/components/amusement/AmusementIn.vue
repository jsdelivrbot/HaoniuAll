<template>
	<div class="amusement-in-box">
		<v-header :search="true" map="搜索" @getSearchData="getSearchData"></v-header>
		<tab :data="tabList" :type_id="listId" @getData="getData"></tab>
		<div ref="wrapper" class="wrapper">
			<amusement-list :list="listData" :tip="tip" :loadingShow="loadingShow"></amusement-list>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import Tab from '@/common/vue/Tab'
	import BScroll from 'better-scroll'
	import AmusementList from '@/common/vue/AmusementList'
	export default {
		components: {
			'v-header': Header,
			AmusementList,
			Tab
		},
		data() {
			return {
				listId: this.$route.params.id,
				listData: [],
				tabList: [],
				searchData: [],
				count: 0,
				tip: '加载中',
				loadingShow: true,
				searchData2: ''
			}
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': this.listId,
								'city': sessionStorage.getItem('city'),
								'option_data': this.searchData,
								'limit': this.count + ',12'
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('吃喝玩乐列表')
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
							'type_id': this.listId,
							'city': sessionStorage.getItem('city')
						}
					}
				})
				.then((res) => {
//					console.log('选项列表')
//					console.log(res)
					this.tabList = res.data.data
				})
		},
		methods: {
			//选项结果
			getData(res, searchData) {
//				console.log('选项结果')
//				console.log(res, searchData)
				this.searchData = searchData
				this.searchData2 = ''
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
			getSearchData(res, searchData) {
//				console.log('搜索结果')
//				console.log(res, searchData)
				this.searchData = []
				this.searchData2 = searchData
				let $this = this
				this.count = 12
				if(res.data.datastatus === 0) {
					this.listData = []
					setTimeout(() => {
						$this.scroll.refresh()
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
								'type_id': this.listId,
								'city': sessionStorage.getItem('city'),
								'option_data': this.searchData,
								'limit': this.count + ',12',
								'searchData2': this.searchData2
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('吃喝玩乐列表')
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
	.amusement-in-box {
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