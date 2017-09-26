<template>
	<div class="search-box">
		<div class="search-header border-1px">
			<span class="iconfont icon-fanhui" @click="back"></span>
			<input class="search" type="text" v-focus placeholder="请输入关键词" v-model="searchText" />
			<span class="search-map" @click="goSearch">搜索</span>
		</div>
		<div class="search-content">
			<!--<div class="item">
				<div class="title">热门搜索</div>
				<div class="list">
					<span class="list-item" @click="searchText='徽州太太'">徽州太太</span>
					<span class="list-item" @click="searchText='恒大中央城'">恒大中央城</span>
				</div>
			</div>-->
			<!--<div class="item">
				<div class="title">历史搜索</div>
				<div class="list">
					<span class="list-item" @click="searchText='徽州太太'">徽州太太</span>
					<span class="list-item" @click="searchText='恒大中央城'">恒大中央城</span>
				</div>
			</div>-->
		</div>
		<div ref="wrapper" class="wrapper">
			<task-list :data="listData" :tip="tip" :loadingShow="loadingShow" v-show="listData.length !== 0"></task-list>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import TaskList from '@/common/vue/TaskList'
	export default {
		methods: {
			back() {
				this.$emit('closeSearchHandle')
			},
			goSearch() {
				this.$http.get('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 0,
							seachdata: {
								page_type: 0,
								city: sessionStorage.getItem('city'),
								'limit': this.count + ',12',
								'seach_value': this.searchText
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('搜索列表')
							console.log(res)
							this.listData = res.data.data
							this.loadingShow = false
							this.count = this.count + 12
							this.$nextTick(() => {
								this._initScroll()
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: '没有搜索结果'
							})
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
			getData() {
				this.$http('getData/index.php?m=home&c=Form&a=articleList', {
						params: {
							type: 0,
							seachdata: {
								page_type: 0,
								city: sessionStorage.getItem('city'),
								'limit': this.count + ',12',
								'seach_value': this.searchText
							}
						}
					})
					.then((res) => {
						if(res.data.datastatus === 1) {
							console.log('搜索结果')
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
			}
		},
		directives: {
			focus: {
				inserted: function(el) {
					// 聚焦元素
					el.focus()
				}
			}
		},
		data() {
			return {
				searchText: '',
				listData: [],
				count: 0,
				tip: '上拉加载更多',
				loadingShow: false
			}
		},
		components: {
			TaskList
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.search-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		background-color: white;
		min-height: 100vh;
		z-index: 4;
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.search-header {
			color: #1e1e1e;
			width: 100%;
			height: 44px;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			.border-1px(#ebebeb);
			.icon-fanhui {
				font-size: 20px;
				font-weight: 700;
				flex: 0 0 66px;
				text-align: center;
				color: black;
			}
			.search {
				border: none;
				outline: none;
				height: 32px;
				display: block;
				border-radius: 24px;
				flex: 1;
				background: url(../../../static/search.png) 12px center no-repeat;
				background-size: 17px 17px;
				background-color: #e2e2e2;
				font-size: 14px;
				padding-left: 36px;
				box-sizing: border-box;
			}
			.search-map {
				flex: 0 0 66px;
				font-size: 16px;
				padding-left: 9px;
				box-sizing: border-box;
			}
		}
		.search-content {
			padding: 0 12px;
			position: absolute;
			z-index: 999;
			.item {
				.title {
					height: 44px;
					line-height: 44px;
					color: #646464;
					font-size: 14px;
				}
				.list {
					.list-item {
						color: #646464;
						font-size: 14px;
						padding: 13px 20px;
						background-color: #f0f0f0;
						margin: 2px 10px 2px 0;
						display: inline-block;
					}
				}
			}
		}
		.weui-loadmore__tips {
			background-color: white !important;
		}
	}
</style>