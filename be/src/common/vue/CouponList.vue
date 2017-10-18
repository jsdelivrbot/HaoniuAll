<template>
	<div>
		<router-link :to="'/coupon/detail/' + item.id" tag="div" class="coupon-list-box"
			v-for="(item, index) in list" :key="index">
			<div class="item">
				<div class="top"></div>
				<div class="content">
					<div class="img">
						<img :src="httpUrl + item.img">
					</div>
					<div class="text">
						<p class="first">{{item.title}}</p>
						<p class="second">{{item.subtitle}}</p>
						<p class="third">有效期至{{item.action_end_time | formDate}}</p>
					</div>
				</div>
				<div class="label">
					{{item.original_price}}{{item.company}}
				</div>
			</div>
		</router-link>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		name: 'CouponList',
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
	.coupon-list-box {
		padding: 0 12px;
		.item {
			height: 81px;
			margin-top: 10px;
			display: flex;
			.top {
				background: url(../../../static/coupon1.png) left top no-repeat;
				background-size: 16px 81px;
				flex: 0 0 16px;
				width: 16px;
			}
			.content {
				flex: 1;
				width: 0;
				background-color: white;
				display: flex;
				align-items: center;
				.img {
					flex: 0 0 57px;
					width: 57px;
					margin-left: 16px;
					img {
						width: 100%;
					}
				}
				.text {
					margin-left: 19px;
					flex: 1;
					width: 0;
					p {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.first {
						font-size: 12px;
						color: #707070;
					}
					.second {
						font-size: 14px;
					}
					.third {
						font-size: 10px;
						color: #707070;
					}
				}
			}
			.label {
				flex: 0 0 81px;
				width: 81px;
				height: 81px;
				background: url(../../../static/coupon3.png) left top no-repeat;
				background-size: 81px 81px;
				font-size: 18px;
				line-height: 81px;
				color: white;
				padding-left: 10px;
			}
		}
	}
</style>