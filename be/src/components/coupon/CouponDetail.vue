<template>
	<div class="coupon-detail-box">
		<div class="title">
			<span class="iconfont icon-fanhui" @click="back"></span>
			<router-link to="/coupon/myCoupon" tag="span" class="info">我的优惠券</router-link>
		</div>
		<swiper :list="imgList" auto :aspect-ratio="763/750" :show-desc-mask="false" :loop="true" dots-position="center" class="img"></swiper>
		<div class="first-content">
			<div class="top vux-1px-b">
				<p class="price">￥{{content.price}}{{content.company}}</p>
				<p class="date">结束时间{{content.action_end_time | formDate}}</p>
			</div>
			<div class="text">
				<div class="text-content">
					<p class="text-title">{{content.title}}</p>
					<p class="text-position">{{content.address}}</p>
				</div>
				<a :href="'tel:' + content.phone" class="text-btn  vux-1px-l">
					<img src="../../../static/coupon9.png" />
				</a>
			</div>
		</div>
		<div class="second-content" v-for="(item, index) in detail" :key="index">
			<p class="second-content-title vux-1px-b">
				{{item.title}}
			</p>
			<div class="second-content-text" v-html="item.content">

			</div>
		</div>
		<footer-btn @detailHandle="detailHandle" :id="content.id">加入券包</footer-btn>
	</div>
</template>

<script>
	import { Swiper } from 'vux'
	import FooterBtn from '@/common/vue/FooterBtn'
	export default {
		methods: {
			back() {
				this.$router.back(-1)
			},
			detailHandle() {
				if(!sessionStorage.getItem('token')) {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=infoCoupon', {
					params: {
						seachdata: {
							'info_id': this.$route.params.id
						}
					}
				}).then((res) => {
					console.log(res)
					if(res.data.datastatus === 1) {
						this.$vux.alert.show({
							title: '提示',
							content: '加入成功'
						})
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: '加入失败'
						})
					}
				})
			}
		},
		components: {
			Swiper,
			FooterBtn
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
				params: {
					seachdata: {
						'id': this.$route.params.id
					}
				}
			}).then((res) => {
				console.log('详情页')
				console.log(res)
				this.content = res.data.data[0]
				this.detail = res.data.detail
				var imgData = res.data.img_data
				for(let i = 0; i < imgData.length; i++) {
					this.imgList.push({
						url: 'javascript:',
						img: this.httpUrl + imgData[i].content,
						title: imgData[i].title
					})
				}
			})
		},
		data() {
			return {
				content: {},
				detail: [],
				imgList: [],
				httpUrl: localStorage.getItem('httpUrl')
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.coupon-detail-box {
		padding-bottom: 50px;
		.title {
			width: 100%;
			height: 44px;
			line-height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2;
			.icon-fanhui {
				width: 34px;
				height: 34px;
				line-height: 34px;
				color: #e60012;
				font-size: 22px;
				font-weight: bolder;
				text-align: center;
				margin-left: 18px;
				background-color: white;
				border-radius: 50%;
				box-sizing: border-box;
				padding-left: 6px;
			}
			.info {
				font-size: 12px;
				color: #e60012;
				background-color: white;
				display: inline-block;
				width: 72px;
				height: 19px;
				line-height: 19px;
				text-align: center;
				margin-right: 18px;
				border-radius: 6px;
			}
		}
		.vux-slider {
			.vux-indicator {
				bottom: 30px;
			}
		}
		.first-content {
			height: 122px;
			background-color: white;
			border-radius: 8px;
			margin: -20px 12px 0;
			padding: 0 10px;
			box-sizing: border-box;
			box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
			position: relative;
			z-index: 2;
			.top {
				height: 58px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.price {
					font-size: 24px;
					color: #e60012;
				}
				.date {
					font-size: 12px;
					color: #afafaf;
					background: url(../../../static/coupon7.png) left center no-repeat;
					background-size: 13px 13px;
					padding-left: 19px;
				}
			}
			.text {
				height: 64px;
				display: flex;
				align-items: center;
				.text-content {
					flex: 1;
					width: 0;
					p {
						line-height: 30px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.text-title {
						font-size: 14px;
					}
					.text-position {
						font-size: 12px;
						color: #707070;
						background: url(../../../static/coupon8.png) left top no-repeat;
						background-size: 15px 20px;
						padding-left: 30px;
					}
				}
				.text-btn {
					width: 54px;
					height: 40px;
					flex: 0 0 54px;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 22px;
						height: 23px;
					}
				}
			}
		}
		.second-content {
			background-color: white;
			border-radius: 8px;
			margin: 10px 12px 0;
			padding: 0 10px;
			box-sizing: border-box;
			box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
			.second-content-title {
				height: 44px;
				line-height: 44px;
				font-size: 12px;
			}
		}
	}
</style>