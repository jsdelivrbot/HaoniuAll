<template>
	<div class="life-service-list-box">
		<router-link :to="'/lifeService/detail/' + item.id" tag="div" class="item border-1px"
			v-for="(item,index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img">
			</div>
			<div class="detail-content">
				<div class="item-title">
					<span>{{item.title}}</span>
				</div>
				<rater star="★" active-color="red" :value="toNumber(item.score)"
					:font-size="16" :margin="2" :disabled="true"></rater>
				<span class="score">{{toFixed(item.score)}}</span>
				<p class="detail">
					<span class="price">{{item.price}}{{item.company}}起</span>
					<span class="adress">{{item.address}}</span>
				</p>
				<!--<div class="decorate-label">
					<span>物美价廉</span>
					<span>服务好</span>
				</div>-->
			</div>
		</router-link >
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
		<!--<div class="footer">
			没有更多信息
		</div>-->
	</div>
</template>

<script>
	import { Rater, LoadMore } from 'vux'
	export default {
		name: 'LifeServiceList',
		components: {
			Rater,
			LoadMore
		},
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
		methods: {
			toNumber(numb) {
				return parseFloat(numb)
			},
			toFixed(numb) {
				var numb = parseFloat(numb)
				return numb.toFixed(1)
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.life-service-list-box {
		/*margin-top: 10px;*/
		.item {
			height: 104px;
			padding: 12px;
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
				font-size: 0;
				justify-content: space-between;
				.item-title {
					display: flex;
					justify-content: space-between;
					span {
						font-size: 14px;
						display: block;
						line-height: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.vux-rater {
					margin-top: 6px;
					/*input {
						line-height: 0 ;
						font-size: 0;
					}
					a{
						line-height: 0 ;
						font-size: 0 ;
					}
					.vux-rater-inner {
						line-height: 0;
					}*/
				}
				.score {
					font-size: 14px;
					color: #e60012;
				}
				.detail {
					overflow: hidden;
					line-height: 12px;
					display: flex;
					justify-content: space-between;
					span {
						font-size: 12px;
					}
					.price {
						color: #f29318;
						flex: 0 0 auto;
					}
					.adress {
						color: #afafaf;
						float: right;
						line-height: 26px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						flex: 1;
						width: 0;
						text-align: right;
						margin-left: 20px;
					}
				}
				.decorate-label {
					width: 100%;
					span {
						color: #afafaf;
						font-size: 12px;
						border: 1px solid #afafaf;
						border-radius: 6px;
						padding: 2px 8px;
						&+span {
							margin-left: 4px;
						}
					}
				}
			}
		}
		.footer {
			width: 100%;
			height: 27px;
			line-height: 27px;
			background-color: #f0f0f0;
			text-align: center;
			font-size: 12px;
			color: #afafaf;
		}
	}
</style>