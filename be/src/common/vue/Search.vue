<template>
	<div class="search-box">
		<div class="search-header border-1px">
			<span class="iconfont icon-fanhui" @click="back"></span>
			<input class="search" type="text" placeholder="徽州太太" v-focus 
				v-model="searchText"/>
			<span class="search-map">搜索</span>
		</div>
		<div class="search-content">
			<div class="item">
				<div class="title">热门搜索</div>
				<div class="list">
					<span class="list-item" @click="searchText='徽州太太'">徽州太太</span>
					<span class="list-item" @click="searchText='恒大中央城'">恒大中央城</span>
				</div>
			</div>
			<div class="item">
				<div class="title">历史搜索</div>
				<div class="list">
					<span class="list-item" @click="searchText='徽州太太'">徽州太太</span>
					<span class="list-item" @click="searchText='恒大中央城'">恒大中央城</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$emit('closeSearchHandle')
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
				searchText: ''
			}
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
	}
</style>