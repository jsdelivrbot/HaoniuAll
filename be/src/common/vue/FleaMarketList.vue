<template>
	<div class="flea-market-list-box">
		<router-link :to="'/fleaMarket/detail/' + item.id" tag="div" class="item border-1px"
			v-for="(item, index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img">
			</div>
			<div class="detail-content">
				<div class="item-title">
					<span>{{item.title}}</span>
				</div>
				<p class="price">￥{{item.price}}</p>
				<p class="address">{{item.address}}</p>
			</div>
		</router-link>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		props: {
			list: Array,
			tip: String,
			loadingShow: Boolean
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		components: {
			LoadMore
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.flea-market-list-box {
		.item {
			height: 104px;
			padding: 10px 12px;
			box-sizing: border-box;
			display: flex;
			background-color: white;
			.border-1px(#e2e2e2);
			.img {
				flex: 0 0 120px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.detail-content {
				flex: 1;
				width: 0;
				margin-left: 16px;
				.item-title {
					span {
						font-size: 14px;
						display: block;
						line-height: 18px;
						word-break: break-all;
                 		display: -webkit-box;
                 		-webkit-line-clamp: 2;
                		-webkit-box-orient: vertical;
                		overflow: hidden;
                		color: #343434;
					}
				}
				.price {
					font-size: 18px;
					color: #e60012;
					line-height: 30px;
				}
				.address {
					font-size: 12px;
					color: #707070;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					
				}
			}
		}
	}
</style>