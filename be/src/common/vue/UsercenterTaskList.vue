<template>
	<div class="usercenter-task-list-box">
		<ul>
			<router-link :to="'/task/detail/' + item.article_detail.id" tag="li" class="border-1px" v-for="(item, index) in list"
				:key="index">
				<div class="icon">
					<img :src="httpUrl + item.article_detail.resp_img" />
				</div>
				<div class="content">
					<p class="firstrow">
						<span class="title">【{{judgeDateText(item.date)}}】</span>
						<span class="date-label">
							<span class="date">{{item.begin_time | formDate}}~{{item.end_time | formDate}}</span>
							<!--<span class="label">待推荐</span>-->
						</span>
					</p>
					<p class="secondrow">
						{{item.article_detail.article_title}}
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
			judgeDateText(value) {
				if(value === 0) {
					return '已过期'
				} else {
					return '进行中'
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-task-list-box {
		margin-top: 10px;
		ul {
			li {
				display: flex;
				align-items: center;
				height: 46px;
				padding: 0 12px;
				box-sizing: border-box;
				background-color: white;
				.border-1px(#e2e2e2);
				.icon {
					flex: 0 0 30px;
					height: 30px;
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
						line-height: 16px;
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
					}
				}
			}
		}
	}
</style>