<template>
	<div class="interaction-list-box">
		<router-link :to="'/interaction/detail/' + item.id" tag="div" class="item"
			v-for="(item, index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img" />
			</div>
			<div class="content">
				<p class="title">{{item.title}}</p>
				<div class="detail">
					<div class="text">
						<p class="first">报名费：￥{{item.price}}{{item.company}}</p>
						<p class="second">活动时间：{{item.action_begin_time | formDate}}~{{item.action_end_time | formDate}}</p>
					</div>
					<p class="more">查看详情</p>
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
	.interaction-list-box {
		.item {
			margin-top: 10px;
			background-color: white;
			.img {
				width: 100%;
				img {
					width: 100%;
				}
			}
			.content {
				padding: 0 12px;
				.title {
					font-size: 14px;
					line-height: 30px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.detail {
					display: flex;
					justify-content: space-between;
					.text {
						.first {
							font-size: 14px;
							color: #e60012;
						}
						.second {
							font-size: 12px;
							color: #707070;
						}
					}
					.more {
						width: 72px;
						height: 22px;
						background-color: #f39800;
						font-size: 12px;
						line-height: 22px;
						text-align: center;
						color: white;
						border-radius: 2px;
					}
				}
			}
		}
	}
</style>