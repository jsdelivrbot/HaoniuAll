<template>
	<div class="free-list-box">
		<router-link :to="'/free/detail/' + item.id" tag="div" class="item vux-1px-b"
			v-for="(item, index) in list" :key="index">
			<div class="img">
				<img :src="httpUrl + item.img" />
			</div>
			<div class="content">
				<div class="title">
					<p class="text">{{item.title}}</p>
					<p class="btn">抢</p>
				</div>
				<div class="detail">
					<p class="address">{{item.address}}</p>
					<p class="count">{{item.virtual_part_num}}人关注</p>
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
	.free-list-box {
		.item {
			height: 104px;
			background-color: white;
			display: flex;
			align-items: center;
			padding: 0 12px;
			.img {
				flex: 0 0 120px;
				width: 120px;
				height: 90px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				flex: 1;
				width: 0;
				.title {
					display: flex;
					align-items: center;
					margin-left: 12px;
					justify-content: space-between;
					.text {
						flex: 0 0 125px;
						width: 125px;
						font-size: 16px;
						width: 200px;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
					.btn {
						font-size: 12px;
						color: white;
						width: 38px;
						height: 22px;
						line-height: 22px;
						text-align: center;
						background-color: #e60012;
					}
				}
				.detail {
					font-size: 12px;
					color: #707070;
					display: flex;
					justify-content: space-between;
					margin-left: 12px;
					margin-top: 12px;
					.address {
						flex: 1;
						width: 0;
						margin-right: 12px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>