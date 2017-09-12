<template>
	<div class="home-property-new-list">
		<router-link tag="div" :to="'/homeProperty/detail/' + item.id" class="item border-1px"
			v-for="(item, index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img">
			</div>
			<div class="detail-content">
				<div class="item-title">
					<span>{{item.title}}</span>
				</div>
				<p class="adress">{{item.address}}</p>
				<p>
					<span>{{item.subtitle}}</span>
				</p>
				<div class="price">
					<span>{{item.price}}{{item.company}}</span>
				</div>
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
	.home-property-new-list {
		width: 100%;
		margin-top: 10px;
		.item {
			height: 104px;
			padding: 10px 12px;
			box-sizing: border-box;
			display: flex;
			background-color: white;
			.border-1px(#e2e2e2);
			.img {
				flex: 0 0 120px;
				height: 100%;
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
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				p {
					color: #707070;
					font-size: 12px;
					line-height: 20px;
				}
				.price {
					color: #e60012;
					font-size: 18px;
					float: right;
				}
			}
		}
		/*.footer {
			width: 100%;
			height: 27px;
			line-height: 27px;
			background-color: #f0f0f0;
			text-align: center;
			font-size: 12px;
			color: #afafaf;
		}*/
	}
</style>