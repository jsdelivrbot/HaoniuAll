<template>
	<div class="guide-box">
		<swiper height="100vh">
			<swiper-item class="black">
				<div class="swiper-item swiper-item1">
					<img src="../../static/guide1.png" />
				</div>
			</swiper-item>
			<swiper-item class="black">
				<div class="swiper-item swiper-item2">
					<img src="../../static/guide2.png" />
				</div>
			</swiper-item>
			<swiper-item class="black">
				<div class="swiper-item swiper-item3">
					<img src="../../static/guide3.png" />
				</div>
			</swiper-item>
			<swiper-item class="black">
				<div class="swiper-item swiper-item4">
					<img src="../../static/guide4.png" />
				</div>
			</swiper-item>
			<swiper-item class="black">
				<div class="swiper-item swiper-item5" @click="goIndex">
					<img src="../../static/guide5.png" />
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import { Swiper, SwiperItem } from 'vux'
	export default {
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			goIndex() {
				localStorage.setItem('newUser', 'notNew')
				this.$router.replace('/')
			}
		}
	}
</script>

<style lang="less">
	.guide-box {
		.swiper-item1 {
			width: 100%;
			height: 100vh;
		}
		
		.swiper-item2 {
			width: 100%;
			height: 100vh;
		}
		
		.swiper-item3 {
			width: 100%;
			height: 100vh;
		}
		
		.swiper-item4 {
			width: 100%;
			height: 100vh;
		}
		
		.swiper-item5 {
			width: 100%;
			height: 100vh;
		}
		.swiper-item {
			width: 100%;
			background-size: cover;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>