<template>
	<div class="home-property-new-box">
		<v-header :search="true" map="搜索" @getSearchData="getSearchData"></v-header>
		<!--<div class="tab">
			<div class="tab-item">全城</div>
			<div class="tab-item">户型</div>
			<div class="tab-item">价格</div>
			<div class="tab-item">面积</div>
		</div>-->
		<tab :data="tabList" :type_id="listId" @getData="getData"></tab>
		<div ref="wrapper" class="wrapper">
			<home-property-new-list :list="listData" :tip="tip" :loadingShow="loadingShow"></home-property-new-list>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import Tab from '@/common/vue/Tab'
	import BScroll from 'better-scroll'
	import HomePropertyNewList from '@/common/vue/HomePropertyNewList'
	export default {
		components: {
			'v-header': Header,
			Tab,
			HomePropertyNewList
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
						console.log('新房列表')
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
							'type_id': this.listId
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
				listId: this.$route.params.id,
				searchData: [],
				count: 0,
				tip: '加载中',
				loadingShow: true,
				searchData2: ''
			}
		},
		methods: {
			//选项结果
			getData(res, searchData) {
				console.log('选项结果')
				console.log(res, searchData)
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
				console.log('搜索结果')
				console.log(res, searchData)
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
							console.log('房产家居列表')
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
	.home-property-new-box {
		padding-top: 88px;
		box-sizing: border-box;
		.wrapper {
			position: fixed;
			top: 88px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
	}
</style>