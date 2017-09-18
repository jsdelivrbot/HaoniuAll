<template>
	<div style="background: #fff;">
		<swiper height='100vh' :show-dots="true" v-model='index' dots-position='center'>
			<swiper-item class='guidance'>
				<img src="../../static/img/yd1.png" />
				<router-link tag='div' to='/pub/home' replace>
					跳过
				</router-link>
			</swiper-item>
			<swiper-item class='guidance'>
				<img src="../../static/img/yd2.png" />
				<router-link tag='div' to='/pub/home' replace>
					跳过
				</router-link>
			</swiper-item>
			<swiper-item class='guidance'>
				<img src="../../static/img/yd3.png" />
				<router-link tag='button' to='/pub/home' replace>
					立即体验
				</router-link>
			</swiper-item>
		</swiper>
	</div>
</template>
<script>
	import { Swiper, SwiperItem, Divider } from 'vux'
	export default {
		components: {
			Swiper,
			SwiperItem,
			Divider
		},
		data() {
			return {
				index: 0,
				once: localStorage.getItem('once')
			}
		},
		watch: {
			index() {
				if(this.index >= 2) {}
			}
		},
		mounted() {
			if(this.once > 0) {
				this.$router.replace('/pub/home')
			} else {
				localStorage.setItem('once', '1')
			}
		}
	}
</script>
<style lang="less">
	.guidance {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
		img {
			display: block;
			width: 70%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
		button {
			width: 175px;
			height: 45px;
			background: #fe9b14;
			border-radius: 3px;
			color: #fff;
			border: none;
			position: absolute;
			bottom: 70px;
			left: 0;
			right: 0;
			margin: auto;
		}
		div {
			width: 100px;
			text-align: right;
			color: #76d0ff;
			position: absolute;
			top: 15px;
			right: 15px;
		}
	}
</style>