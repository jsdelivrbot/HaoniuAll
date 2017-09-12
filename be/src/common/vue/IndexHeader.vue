<template>
	<div class="index-header-box">
		<!--<router-link to="/home/position" tag="div" class="city">
			合肥<span class="iconfont icon-moreunfold"></span>
		</router-link>-->
		<router-link to="/home/position" tag="div" class="city">
			{{city}}<span class="iconfont icon-moreunfold"></span>
		</router-link>
		<input class="search" type="text" @focus="search"
			placeholder="请输入关键词"/>
		<div class="service"></div>
		<search v-if="searchShow" @closeSearchHandle="closeSearch"></search>
	</div>
</template>

<script>
	import Search from '@/common/vue/Search'
	export default {
		data() {
			return {
				searchShow: false
			}
		},
		methods: {
			search() {
				this.searchShow = true
			},
			closeSearch() {
				this.searchShow = false
			}
		},
		components: {
			Search
		},
		props: {
			city: String
		}
	}
</script>

<style lang="less">
	.index-header-box {
		width: 100%;
		height: 44px;
		background-color: #e70012;
		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 0 4px 4px #ab9c9b;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		z-index: 3;
		.city {
			color: white;
			font-size: 16px;
			width: 96px;
			line-height: 44px;
			flex: 0 0 96px;
			text-align: center;
		}
		.search {
			border: none;
			height: 32px;
			display: block;
			border-radius: 6px;
			flex: 1;
			width: 0;
			font-size: 14px;
			text-indent: 1em;
			outline: none;
			background: url(../../../static/search.png) 12px center no-repeat;
			background-size: 17px 17px;
			background-color: white;
			padding-left: 36px;
		}
		.service {
			width: 59px;
			flex: 0 0 59px;
			height: 44px;
			font-size: 14px;
			color: white;
			text-align: center;
			background: url(../../../static/service.png) center no-repeat;
			background-position: 20px center;
			background-size: 22px;
		}
	}
</style>