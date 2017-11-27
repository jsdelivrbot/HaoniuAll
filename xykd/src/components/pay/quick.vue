<template>
	<section class="quick-box">
		<v-header title='快速审核直通车'></v-header>
		<h2 class="show_money">
			快速审核费:<em>¥45.00</em>
		</h2>
		<div class="pay_select_list vux-1px-tb">
			<div class="item vux-1px-b" @click="current = 0">
				<img src="./img/weicinzhifu@3x.png" class="icon icon0" />
				<p class="text">微信支付</p>
				<div class="label" :class="{current: current === 0}"></div>
			</div>
			<div class="item vux-1px-b" @click="current = 1">
				<img src="./img/yinghangkazhufu@3x.png" class="icon icon1" />
				<p class="text">Apple Pay</p>
				<div class="label" :class="{current: current === 1}"></div>
			</div>
			<div class="item" @click="current = 2">
				<img src="./img/zhifubao@3x.png" class="icon icon2" />
				<p class="text">支付宝支付</p>
				<div class="label" :class="{current: current === 2}"></div>
			</div>
		</div>
		
		<div class="tips">
			快速直通车说明:快速直通车说明快速直通车说明快速直通车说明快速直通车说明快速直通车说明
		</div>

		<div class="global_btn_wrapper">
			<p class="btn">确认支付</p>
		</div>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		data() {
			return {
				current: 0
			}
		},
		components: {
			'v-header': Header
		}
	}
</script>
<style lang="less">
	.quick-box {
		padding-top: 48px;
		height: auto;
		overflow: hidden;
		
		.tips{
			font-size: 12px;
			padding: 15px;
			color: #999;
		}
		
		.show_money {
			font-size: 18px;
			color: #282828;
			font-weight: normal;
			padding-top: 20px;
			padding-left: 15px;
			line-height: 60px;
			background: #fff;
			
			em{
				margin-left: 10px;
				font-style: normal;
			}
		}
	}
</style>