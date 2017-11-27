<template>
	<div>
		<div tag="div" class="coupon-list-box" v-for="(item, index) in list" @click="mask(item.coupon)" :key="index">
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
		</div>
		<load-more :show-loading="loadingShow" :tip="tip" background-color="#f0f0f0"></load-more>
		<div v-transfer-dom>
			<x-dialog v-model="show" class="dialog-demo">
				<div class="img-box">
					<img :src="imgurl" style="max-width:100%">
				</div>
				<div @click="show=false" class="vux-1px-t">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import { LoadMore, XDialog, TransferDomDirective as TransferDom } from 'vux'
	export default {
		name: 'CouponList',
		props: {
			list: Array,
			tip: String,
			loadingShow: Boolean
		},
		data() {
			return {
				show: false,
				imgurl: '',
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		directives: {
			TransferDom
		},
		components: {
			LoadMore,
			XDialog
		},
		methods: {
			mask(url) {
				this.imgurl = this.httpUrl + url
				this.show = true
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/close';
	.dialog-demo {
		.weui-dialog {
			border-radius: 8px;
			padding-bottom: 8px;
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		.img-box {
			height: 300px;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
	
	.coupon-list-box {
		padding: 0 12px;
		.item {
			height: 81px;
			margin-top: 10px;
			display: flex;
			.top {
				background: url(../../../static/usercenter/coupon1.png) left top no-repeat;
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
				background: url(../../../static/usercenter/coupon3.png) left top no-repeat;
				background-size: 81px 81px;
				font-size: 18px;
				line-height: 81px;
				color: white;
				padding-left: 10px;
			}
		}
	}
</style>