<template>
	<div class="usercenter-share-task-list-box">
		<ul>
			<router-link :to="fullUrl(item.link)" tag="li" class="border-1px" v-for="(item, index) in list"
				:key="index">
				<div class="icon">
					<img :src="httpUrl + item.goods_detail.thumb" />
				</div>
				<div class="content">
					<p class="firstrow">
						<span class="title">{{item.goods_detail.title}}</span>
						<!--<span class="date-label">
							<span class="date">开始日期：{{item.begin_time | formDate}}</span>
						</span>-->
					</p>
					<!--<p class="secondrow">
						{{item.goods_detail.title}}
					</p>-->
					<p class="thirdrow">
						<span>分享人数：{{item.goods_share_num}}</span>
						<span>获得佣金：{{item.goods_share_money}}</span>
					</p>
				</div>
			</router-link>
		</ul>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		props: {
			list: Array,
			tip: String,
			loadingShow: Boolean
		},
		components: {
			LoadMore
		},
		methods: {
			fullUrl(src) {
				let link = encodeURIComponent(src)
				link = '/fxgshop?url=' + link
				return link
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-share-task-list-box {
		ul {
			li {
				display: flex;
				align-items: center;
				height: 64px;
				padding: 0 12px;
				box-sizing: border-box;
				background-color: white;
				.border-1px(#e2e2e2);
				.icon {
					flex: 0 0 60px;
					max-height: 48px;
					overflow: hidden;
					img {
						width: 100%;
					}
				}
				.content {
					flex: 1;
					width: 0;
					margin-left: 12px;
					p {
						font-size: 12px;
						line-height: 20px;
						&.firstrow {
							.title {
								color: #e60012;
							}
							.date-label {
								float: right;
								.date {
									color: #707070;
									margin-right: 18px;
								}
								.label {
									color: #e60012;
								}
							}
						}
						&.secondrow {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: #333333;
						}
						&.thirdrow {
							span+span {
								margin-left: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>