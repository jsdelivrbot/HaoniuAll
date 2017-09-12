<template>
	<div class="header-box">
		<span class="iconfont icon-fanhui" @click="back"></span>
		<h1 class="title" v-if="title">{{title}}</h1>
		<input class="search" type="text" v-if="search" placeholder="请输入关键词" v-model="text" />
		<span class="map" @click="mapfn">{{map}}</span>
		<search v-if="searchShow" @closeSearchHandle="closeSearch"></search>
	</div>
</template>

<script>
	import Search from '@/common/vue/Search'
	export default {
		props: {
			title: String,
			map: String,
			search: Boolean
		},
		methods: {
			back() {
				//				var scrollY = localStorage.getItem('scrollY')
				this.$router.back(-1)
				//				setTimeout(() => {
				//					window.scrollTo(0, scrollY)
				//				}, 200)
			},
			mapfn() {
				if(this.map === '搜索') {
//					if(this.text === '') {
//						this.$vux.alert.show({
//							title: '提示',
//							content: '请输入搜索内容'
//						})
//						return
//					}
					this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
							params: {
								seachdata: {
									'type_id': this.$route.params.id,
									'city': sessionStorage.getItem('city'),
									seach_value: this.text
								}
							}
						})
						.then((res) => {
//							console.log('搜索列表')
//							console.log(res)
							this.$emit('getSearchData', res)
						})
				}
				this.$emit('edit')
			},
			closeSearch() {
				this.searchShow = false
			}

		},
		data() {
			return {
				searchShow: false,
				text: ''
			}
		},
		components: {
			Search
		}
	}
</script>

<style lang="less" scoped="scoped">
	.header-box {
		width: 100%;
		height: 44px;
		background-color: #e70012;
		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		z-index: 2;
		.icon-fanhui {
			color: white;
			font-size: 20px;
			font-weight: 700;
			flex: 0 0 66px;
			text-align: center;
			height: 44px;
			line-height: 44px;
		}
		.title {
			text-align: center;
			font-size: 18px;
			font-weight: 400;
			color: white;
			line-height: 44px;
			flex: 1;
			width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.search {
			border: none;
			height: 32px;
			display: block;
			border-radius: 6px;
			flex: 1;
			width: 0;
			font-size: 14px;
			text-indent: 3em;
			outline: none;
			background: url(../../../static/search.png) 12px center no-repeat;
			background-color: white;
			background-size: 16px 16px;
		}
		.map {
			flex: 0 0 66px;
			font-size: 14px;
			color: white;
			text-align: center;
			height: 44px;
			line-height: 44px;
		}
	}
</style>