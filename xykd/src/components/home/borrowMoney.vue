<template>
	<section class="borrowMoney-box">
		<div class="top_box">
			<span>小鱼快贷</span>
			<div class="bg"></div>
			<swiper class='index_swiper' v-if='swiperImg!==""' :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for='(item,index) in swiperImg' :key='index'>
					<img :src="item.imgUrl" />
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<router-link class="message" tag='div' to='/Message'>
				<img src="./img/xiaoxi@3x.png" />
			</router-link>
		</div>

		<div class="notice-bar vux-1px-tb">
			<span>平台公告:</span>
			<marquee behavior="" direction="">
				{{tips}}
			</marquee>
		</div>

		<div class="shenhe_box">
			<div class="status_one">
				<img src="./img/dengdai@3x.png" />
			</div>
			<div class="button_no_radius">
				额度评审中
			</div>
			<div class="tips">
				审核太慢?&nbsp;试试
				<router-link to='/Quick' class='a'>
					快速审核直通车
				</router-link>
			</div>

			<div class="status_two">
				<p>可借款额度</p>
				<h2>¥50000</h2>
			</div>
			<router-link to='/Authentication' tag='div' class='button_no_radius'>
				立即借款
			</router-link>

			<!--<div class="button_no_radius">
				立即借款
			</div>-->

			<div class="status_three">
				<div>
					<p>待还款</p>
					<h2>¥50000</h2>
				</div>
				<div>
					<p>还款日</p>
					<h2>24个月</h2>
				</div>
			</div>
			<router-link to='/repayment' tag='div' class='button_no_radius'>
				立即还款
			</router-link>
			<div class="tips">
				资金周转困难?
				<router-link to='/xqPay' class='a'>
					申请续贷
				</router-link>
			</div>
		</div>

	</section>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
				notNextTick: true,
				swiperOption: {
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					slidesPerView: 'auto',
					spaceBetween: 80,
					grabCursor: true,
					loop: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
					effect: 'coverflow',
					coverflow: {
						rotate: 0,
						stretch: 0,
						depth: 40,
						modifier: 10,
						slideShadows: false
					},
					debugger: true,
					onTransitionStart(swiper) {
						console.log(swiper)
					}
				},
				swiperImg: '',
				tips: ''
			}
		},
		mounted() {
			this.$http.get('api/banner/list').then(
				(res) => {
					this.swiperImg = res.data.obj
					console.log(res)
				}
			)
			this.$http.get('api/notice/list').then(
				(res) => {
					this.tips = res.data.obj.content
					console.log(res)
				}
			)
		}
	}
</script>
<style lang="less">
	.borrowMoney-box {
		height: auto;
		overflow: hidden;
		padding-bottom: 52px;
		box-sizing: border-box;
		.top_box {
			position: relative;
			width: 100%;
			background: no-repeat;
			height: auto;
			.message {
				position: absolute;
				top: 14px;
				right: 22px;
				img {
					width: 20px;
				}
			}
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				width: 100%;
				height: 160px;
				background: #dbb76c;
			}
			>span {
				display: block;
				line-height: 50px;
				text-align: center;
				font-size: 18px;
				color: #fff;
			}
		}
		.index_swiper {
			margin-top: 10px;
			.swiper-slide {
				position: relative;
				left: 10vw;
				width: 80vw;
				img {
					display: block;
					border-radius: 5px;
					width: 100%;
				}
			}
		}
		.notice-bar {
			width: 100%;
			margin: 32px 0;
			height: 45px;
			background: #f2f2f2;
			color: #666666;
			line-height: 45px;
			padding-left: 15px;
			font-size: 15px;
			box-sizing: border-box;
			position: relative;
			span {
				position: absolute;
				top: 3px;
				height: 39px;
				line-height: 39px;
				left: 15px;
				z-index: 11;
				background: #f2f2f2;
				width: 80px;
				text-align: center;
			}
			marquee {
				display: block;
				width: 100%;
			}
		}
		.shenhe_box {
			padding: 0 21px;
			box-sizing: border-box;
			.button_no_radius {
				height: 55px;
				line-height: 55px;
				color: #fff;
				background: #DBB76C;
				font-size: 18px;
				text-align: center;
				border-radius: 0 0 5px 5px;
			}
		}
		.status_one {
			width: 100%;
			background: #fff;
			height: 135px;
			line-height: 135px;
			text-align: center;
			padding: 35px 0;
			box-sizing: border-box;
			img {
				display: block;
				height: 65px;
				margin: auto;
				animation: spin 1400ms infinite linear;
			}
			@keyframes spin {
				0% {
					transform: rotate(360deg) scale(0.8);
				}
				50% {
					transform: rotate(180deg) scale(1.1);
				}
				100% {
					transform: rotate(0deg) scale(0.8);
				}
			}
		}
		.status_two {
			width: 100%;
			background: #fff;
			height: 135px;
			padding: 35px 0;
			box-sizing: border-box;
			text-align: center;
			p {
				color: #a0a0a0;
				font-size: 12px;
				line-height: 20px;
			}
			h2 {
				font-size: 30px;
				color: #DBB76C;
				line-height: 45px;
			}
		}
		.status_three {
			width: 100%;
			background: #fff;
			height: 135px;
			padding: 35px 0;
			box-sizing: border-box;
			text-align: center;
			display: flex;
			div:first-child {
				border-right: 1px solid #DBB76C;
			}
			div {
				flex: 1;
				p {
					color: #a0a0a0;
					font-size: 12px;
					line-height: 20px;
				}
				h2 {
					font-size: 30px;
					color: #DBB76C;
					line-height: 45px;
				}
			}
		}
		.tips {
			line-height: 60px;
			font-size: 14px;
			color: #696969;
			a {
				color: #DBB76C;
				text-decoration: underline;
			}
		}
	}
</style>